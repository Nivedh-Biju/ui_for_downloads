import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from "../components/modal";
import { ReactComponent as Icon } from './../svgs/folder-outline.svg';
import './../css/pages/home.css';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedDownloadLink, setSelectedDownloadLink] = useState('');
    const [items, setItems] = useState([]);

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

    return (
        <div className="App_inner">
            <li className='heading'>
                <span className='file_icon_heading'></span>
                <p className='file_name_heading'>File Name</p>
                <p className='download_button_span'>Download</p>
            </li>
            <ul className='display_items'>
                {items.map((application, index) => (
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
        </div>
    );
}

export default Home;
