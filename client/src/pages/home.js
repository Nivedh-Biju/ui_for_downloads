import React, { useState, useEffect, useCallback, } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ReactComponent as Icon } from './../svgs/folder-outline.svg';
import { ReactComponent as Icon1 } from './../svgs/search-outline.svg';
import './../css/pages/home.css';
import no_data from "./../svgs/7466073.png";
import { Table, Button, Image } from 'react-bootstrap';

const roles = ['All Files','Product Team Developers', 'Service Area Developers', 'DB Team','Testers','Business Analysts','Business Development','HR'];


const TabComponent = ({ selectedRole, setSelectedRole}) => {
    const handleRoleClick = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="admin_edit_files_tabs_outer_container">
        <div className="admin_edit_files_tab_container">
            {roles.map((role) => (
                <div
                    key={role}
                    className={`admin_edit_files_tab ${selectedRole === role ? 'admin_edit_files_active' : ''}`}
                    onClick={() => handleRoleClick(role)}
                >
                    <div className='admin_adit_files_tab_text'>
                    {role}
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};



function Home() {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);  
    const [selectedRole,setSelectedRole] = useState('All Files');
    const itemsPerPage = 5;
    const isAdmin = true;
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/files');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const searchHandler = async (query) => {
        try {
            const response = await axios.post('http://localhost:3001/api/files/search', {
                filename: query
            });
            setItems(response.data);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error searching files:', error);
        }
    };

    const debounce = (func, delay) => {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const debouncedSearchHandler = useCallback(debounce(searchHandler, 1000), []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearchHandler(query);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    const filteredItems = selectedRole === 'All Files' ? items : items.filter(application => {
        if (application.roles && application.roles.includes('all')) {
            return true; 
        }
        return application.roles && application.roles.includes(selectedRole);
    });
    

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedRole]);
    
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="App_inner">

            <div className='home_heading_section'>
                <p className='home_heading_text'>Attached Files</p>
                <p className='home_heading_text_p'>Attached files for each team with it's respective download link</p>
            </div>
            <div className="search_section">
                <div className="search_container">
                    <Icon1 className="search_icon_home" width={20} height={20} />
                    <input
                        type="text"
                        placeholder="Search by filename"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search_bar"
                    />
                </div>
            </div>


            <TabComponent selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
            <div className='table_view_files_container'>
            {paginatedItems.length > 0 ? (
        <Table hover style={{ marginTop: '3rem', flex: "0 0 85%" }}>
          <thead>
            <tr>
              <th style={{ width: '4%' }}></th>
              <th style={{ width: '', fontSize: '13px', fontWeight: 'bold', textAlign: 'left', color:'gray' }} >File Name</th>
              <th style={{ width: '5%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }}></th>
              <th style={{ width: '5%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((application, index) => (
              <tr key={index} style={{ height: '2rem' }}>
                <td style={{ verticalAlign: 'middle' }}>
                  <Image src={application.image} className="image_icon_home" alt="Image" thumbnail />
                </td>
                <td style={{fontWeight: 'bold', verticalAlign: 'middle'}}>{application.filename}</td>
                <td style={{ verticalAlign: 'middle' }}>
                  <a
                    href={application.link.startsWith('/api/addData/download/') ? `http://localhost:3001${application.link}` : application.link}
                    className='download_button_a'
                  >
                    <div className='download_button'>Click Here</div>
                  </a>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <div className='know_more_button' onClick={() => navigate('/description', { state: { application } })}>
                    Know More
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className='no_data_home_main'>
          <div className='no_data_home_main_image_section'>
            <img src={no_data} className='no_data_home_main_image' alt="No Data" />
          </div>
          <p className='no_data_home_main_description'>No Files Found!</p>
        </div>
      )}
      </div>


            <div className='pagination'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <div
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`pagination_button ${i + 1 === currentPage ? 'active' : ''}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
