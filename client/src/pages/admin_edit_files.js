import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Modal from '../components/modal';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Icon1 } from './../svgs/search-outline.svg';
import './../css/pages/admin_edit_files.css';
import no_data from "./../svgs/7466073.png";

const roles = [
    'All',
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
                    {role}
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
    const [selectedRole, setSelectedRole] = useState('All');
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
        if (selectedRole === 'All') {
            return true;
        }
        if (application.roles && application.roles.includes('all')) {
            return true;
        }
        return application.roles && application.roles.includes(selectedRole);
    });

    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return (
        <div className="admin_edit_files_App_inner">
            <div className='admin_edit_files_search_section'>
                <Icon1 className="admin_edit_files_search_icon_home" width={25} height={25}></Icon1>
                <input
                    type="text"
                    placeholder="Search by filename"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="admin_edit_files_search_bar"
                />
            </div>

            <TabComponent selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

            {paginatedItems.length > 0 ? (
                <ul className='admin_edit_files_display_items'>
                    <li className='admin_edit_files_heading'>
                        <span className='admin_edit_files_file_icon_heading'></span>
                        <p className='admin_edit_files_file_name_heading'>File Name</p>
                        <p className='admin_edit_files_download_button_span'>Download</p>
                        <p className='admin_edit_files_action_button_heading'>Actions</p>
                    </li>
                </ul>): (
                <div className='no_data_home_main'>
                    <div className='no_data_home_main_image_section'>
                    <img src = {no_data} className='no_data_home_main_image'></img>
                    </div>
                    <p className='no_data_home_main_description'>No Files Found!</p>
                </div>
            
            )}

            <ul className='admin_edit_files_display_items'>
                {
                    paginatedItems.map((application, index) => (
                        <li
                            key={index}
                            className='admin_edit_files_individual_item'
                            onClick={() => navigate('/description', { state: { application } })}
                        >
                            <img src={application.image} className="admin_edit_files_image_icon_home" alt="Image" />
                            <p className='admin_edit_files_individual_item_name'>{application.filename}</p>
                            
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
                                    <div
                                        className='admin_edit_files_delete_button'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(application._id);
                                        }}
                                    >
                                        Delete
                                    </div>
                            
                        </li>
                    ))
               }
            </ul>

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
