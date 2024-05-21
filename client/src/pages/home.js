import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Modal from "../components/modal";
import { ReactComponent as Icon } from './../svgs/folder-outline.svg';
import { ReactComponent as Icon1 } from './../svgs/search-outline.svg';
import './../css/pages/home.css';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedDownloadLink, setSelectedDownloadLink] = useState('');
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

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
            setCurrentPage(1); // Reset to the first page on new search
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

    const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(items.length / itemsPerPage);

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
            <li className='heading'>
                <span className='file_icon_heading'></span>
                <p className='file_name_heading'>File Name</p>
                <p className='download_button_span'>Download</p>
            </li>
            <ul className='display_items'>
                {paginatedItems.map((application, index) => (
                    <li
                        key={index}
                        className='individual_item'
                        onClick={() => handleItemClick(application.description, application.link)}
                    >
                        <Icon className="file_icon" width={20} height={20} fill="currentColor" />
                        <p className='individual_item_name'>{application.filename}</p>
                        <a href={application.link} className='download_button_a'>
                            <div className='download_button'>Download</div>
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
