import React, {useState} from "react";
import Modal from "../components/modal";
import { ReactComponent as Icon } from './../svgs/folder-outline.svg';
import './../css/pages/home.css';


function Home(){

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


    return(
        <div className="App_inner">
        <li className='heading'>
          <span className='file_icon_heading'></span>
          <p className='file_name_heading'>File Name</p>
          <p className='download_button_span'>Download</p>
        </li>
            <ul className='display_items'>
                        {arr_of_items.map((application, index) => (
              <li
                key={index}
                className='individual_item'
                onClick={() => handleItemClick(application.description, application.link)}
              >
                <Icon className="file_icon" width={20} height={20} fill="currentColor" />
                <p className='individual_item_name'>{application.name}</p>
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