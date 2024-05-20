import React, { useState } from 'react';
import { ReactComponent as Icon } from './folder-outline.svg';
import { ReactComponent as Icon1 } from './home-outline.svg';
import { ReactComponent as Icon2 } from './people-outline.svg';
import { ReactComponent as Icon3 } from './search-outline.svg';
import './App.css';
import logo from "./logo.png";
import profile from "./profile.png";
import CloseIcon from './closeIcon';


function SideNav(){
  return(
    <div className='side_nav'>
      <div className='side_bar_icons'>
        <Icon1 className = "icons" width={25} height={25}></Icon1>
        <Icon2 className = "icons" width={25} height={25}></Icon2>
        <Icon3 className = "icons" width={25} height={25}></Icon3>
      </div>
    </div>
  );
}



function Modal({ show, onClose, description, download_link }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal_description" onClick={onClose}>
      <div className="modal_content_description" onClick={(e) => e.stopPropagation()}>
        <span className="close_description" onClick={onClose}>
          <CloseIcon width={24} height={24} />
        </span>
        <p className='modal_content_description_text'>{description}</p>
        <a  href={download_link}>
          <p className='download_link_modal'>
            Download
          </p>
        </a>
      </div>
    </div>
  );
}


function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedDownloadLink, setSelectedDownloadLink] = useState('');

  const arr_of_items = [
    { name: "item one", link: "https://github.com/Nivedh-Biju/ui_for_downloads", description:"description11111111111111111111111111111111111111111111111111111111111111111111111111111111"},
    { name: "item two", link: "https://github.com/Nivedh-Biju/ui_for_downloads", description:"description2"},
    { name: "item three", link: "https://github.com/Nivedh-Biju/ui_for_downloads", description:"description3"},
  ];


  const handleItemClick = (description,link) => {
    setSelectedDescription(description);
    setSelectedDownloadLink(link)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <SideNav />
      <div className='header_section'>
        <img className= "header_logo" src={logo} alt = "logo"/>
        <div className='header_title'>Sample Heading</div>
        <img className='user_image_header' src = {profile}></img>
        <div className='user_info_header'>
          <p className='user_name_header'>User 1</p>
          <p className='user_post_header'>Admin</p>
        </div>
      </div>
      <div className="App_inner">
            <ul className='display_items'>
                        {arr_of_items.map((application, index) => (
              <li
                key={index}
                className='individual_item'
                onClick={() => handleItemClick(application.description, application.link)} // Invoke handleItemClick with description and link
              >
                <Icon className="file_icon" width={24} height={24} fill="currentColor" />
                <p className='individual_item_name'>{application.name}</p>
                <a href={application.link} className='download_button_a'>
                  <div className='download_button'>Download</div>
                </a>
              </li>
            ))}

          </ul>
          <Modal show={showModal} onClose={handleCloseModal} description={selectedDescription} download_link={selectedDownloadLink} />
      </div>
    </div>
  );
}

export default App;