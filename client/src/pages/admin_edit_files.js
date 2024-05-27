import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Modal from '../components/modal';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Icon1 } from './../svgs/search-outline.svg';
import './../css/pages/admin_edit_files.css';
import no_data from "./../svgs/7466073.png";
import { Table, Image } from 'react-bootstrap';
import profile from "./../profile.png";

const roles = [
    'All Files',
    'Product Team Developers',
    'Service Area Developers',
    'DB Team',
    'Testers',
    'Business Analysts',
    'Business Development',
    'HR'
];

const TabComponent = ({ selectedRole, setSelectedRole }) => {
    const handleRoleClick = (role) => {
        setSelectedRole(role);
    };

    return (
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
    );
};

function AdminEditFiles() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedDownloadLink, setSelectedDownloadLink] = useState('');
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRole, setSelectedRole] = useState('All Files');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    

    const itemsPerPage = 5;
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

    const handleItemClick = (description, link) => {
        setSelectedDescription(description);
        setSelectedDownloadLink(link);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = async (fileId) => {
        try {
            await axios.delete(`http://localhost:3001/api/files/delete/${fileId}`);
            setItems(items.filter(item => item._id !== fileId));
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

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
        return function (...args) {
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

    const filteredItems = items.filter(application => {
        const isRoleMatch = selectedRole === 'All Files' ||
            (application.roles && (application.roles.includes('all') || application.roles.includes(selectedRole)));
        const uploadedDate = new Date(application.uploadedDate);
        const endOfDay = endDate ? new Date(new Date(endDate).setHours(23, 59, 59, 999)) : null;
        const isDateMatch = (!startDate || uploadedDate >= new Date(startDate)) &&
            (!endDate || uploadedDate <= endOfDay);
        return isRoleMatch && isDateMatch;
    });
    
    
    

    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="admin_edit_files_App_inner">


            <div className="admin_edit_file_search_section">
                <div className="admin_edit_file_search_container">
                    <Icon1 className="admin_edit_file_search_icon_home" width={20} height={20} />
                    <input
                        type="text"
                        placeholder="Search by filename"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search_bar"
                    />
                </div>
            </div>

            <div className="admin_edit_files_date_filter">
                <label className='admin_edit_files_date_label'>
                    Start Date :
                </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="admin_edit_files_date_input"
                />
                <label className='admin_edit_files_date_label'>
                      End Date :
                </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="admin_edit_files_date_input"
                />
            </div>



            <TabComponent selectedRole={selectedRole} setSelectedRole={setSelectedRole} />
        <div className='table_edit_files_container'>
            {paginatedItems.length > 0 ? (
        <Table hover style={{ marginTop: '3rem', flex: "0 0 85%", width: "100%"}}>
          <thead>
            <tr>
              <th style={{ width: '4%' }}></th>
              <th style={{ width: '', fontSize: '13px', fontWeight: 'bold', textAlign: 'left', color:'gray' }}>File Name</th>
              <th style={{ width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left', color:'gray' }}>Uploaded Date</th>
              <th style={{ width: '10%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left', color:'gray' }}>Updated Date</th>
              <th style={{ width: '15%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left', color:'gray' }}>Uploaded By</th>
              <th style={{ width: '5%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }}></th>
              <th style={{ width: '5%', fontSize: '13px', fontWeight: 'bold', textAlign: 'left' }}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((application, index) => (
              <tr
                key={index}
                onClick={() => navigate('/description', { state: { application } })}
                style={{ height: '6rem', padding: '100px' }}
              >
                <td style={{verticalAlign: 'middle'}}><img src={application.image} className="admin_edit_files_image_icon_home" alt="Image" /></td>
                <td style={{fontWeight: 'bold', verticalAlign: 'middle'}}>{application.filename}</td>
                <td style={{ color : 'gray',verticalAlign: 'middle'}}>{new Date(application.uploadedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td style={{ color : 'gray', verticalAlign: 'middle'}}>{new Date(application.updatedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>

                <td style={{ color : 'gray', verticalAlign: 'middle'}}>
                    <div className='uploaded_by_container'>
                        <img src = {profile} className='uploaded_by_image'></img>
                        <div className='uploaded_by_details'>
                            <label className='uploaded_by_name'>Admin 1</label>
                            <label className='uploaded_by_email'>example@gmail.com</label>
                        </div>
                    </div>
                </td>

                <td style={{ verticalAlign: 'middle' }}>
                  <div
                    className='admin_edit_files_edit_button'
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(application._id);
                      navigate('/edit_file',{state : {application}});
                    }}
                  >
                    Edit
                  </div>
                </td>
                <td style={{ verticalAlign: 'middle' }}>
                  <div
                    className='admin_edit_files_delete_button'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(application._id);
                    }}
                  >
                    Delete
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

            <Modal show={showModal} onClose={handleCloseModal} description={selectedDescription} download_link={selectedDownloadLink} />
            <div className='admin_edit_files_pagination'>
                {Array.from({ length: totalPages }, (_, i) => (
                    <div
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`admin_edit_files_pagination_button ${i + 1 === currentPage ? 'admin_edit_files_active' : ''}`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminEditFiles;
