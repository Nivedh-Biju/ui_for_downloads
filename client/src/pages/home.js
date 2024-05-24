import React, { useState, useEffect, useCallback, } from 'react';
import axios from 'axios';
import Modal from "../components/modal";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Icon } from './../svgs/folder-outline.svg';
import { ReactComponent as Icon1 } from './../svgs/search-outline.svg';
import './../css/pages/home.css';
import no_data from "./../svgs/7466073.png";


const roles = ['All Files','Product Team Develpers', 'Service Area Developers', 'DB Team','Testers','Business Analysts','Business Development','HR'];


const TabComponent = ({ selectedRole, setSelectedRole}) => {
    const handleRoleClick = (role) => {
        setSelectedRole(role);
    };

    return (
        <div className="tab-container">
            {roles.map((role) => (
                <div
                    key={role}
                    className={`tab ${selectedRole === role ? 'active' : ''}`}
                    onClick={() => handleRoleClick(role)}
                >
                    {role}
                </div>
            ))}
        </div>
    );
};



function Home() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedDownloadLink, setSelectedDownloadLink] = useState('');
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

    const handleItemClick = (description, link) => {
        setSelectedDescription(description);
        setSelectedDownloadLink(link);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
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


            <div className='search_section'>
                <Icon1 className="search_icon_home" width={25} height={25}></Icon1>
                <input
                    type="text"
                    placeholder="Search by filename"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="search_bar"
                />
            </div>

            <TabComponent selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

            {paginatedItems.length > 0 ? (
            <ul className='display_items'>
            <li className='heading'>
                <span className='file_icon_heading'></span>
                <p className='file_name_heading'>File Name</p>
                <p className='download_button_span'>Download</p>
            </li>
            </ul>): (
                <div className='no_data_home_main'>
                    <div className='no_data_home_main_image_section'>
                    <img src = {no_data} className='no_data_home_main_image'></img>
                    </div>
                    <p className='no_data_home_main_description'>No Files Found!</p>
                </div>
            )}
            <ul className='display_items'>
                {paginatedItems.map((application, index) => (
                    <li
                        key={index} 
                        className='individual_item'
                        // onClick={() => handleItemClick(application.description, application.link)}
                        onClick={() => navigate('/description', { state: { application } })}
                    >
                        {/* Display image from base64 data */}
                        <img src={application.image} className="image_icon_home" alt="Image" />
                        <p className='individual_item_name'>{application.filename}</p>
                        <a
                            href={application.link.startsWith('/api/addData/download/') ? `http://localhost:3001${application.link}` : application.link}
                            className='download_button_a'
                        >
                            <div className='download_button'>Click Here</div>
                        </a>
                    </li>
                ))}
            </ul>


            <Modal show={showModal} onClose={handleCloseModal} description={selectedDescription} download_link={selectedDownloadLink} />
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
