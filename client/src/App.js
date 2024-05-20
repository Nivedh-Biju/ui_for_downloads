import React, { useState } from 'react';
import { ReactComponent as Icon } from './folder-outline.svg';
import './App.css';


function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const arr_of_items = [
    { name: "item one", link: "https://github.com/Nivedh-Biju/ui_for_downloads", icon:"#"},
    { name: "item two", link: "https://github.com/Nivedh-Biju/ui_for_downloads", icon:"#"},
    { name: "item three", link: "#link3#", icon:"#"},
  ];




  return (
    <div className="App">
      <div className="App_inner">
        {arr_of_items && (
          <ul className='display_items'>
            <li className='heading'>
              <span className='file_icon_heading'></span>
              <p className='file_name_heading'>File Name</p>
              <p className='download_button_span'>Download</p>
            </li>
            {arr_of_items.map((application, index) => (
              <li 
                key={index} 
                className='individual_item'
              >
                <Icon className = "file_icon" width={24} height={24} fill="currentColor" />
                <p className='individual_item_name'>{application.name}</p>
                <a href={application.link} className='download_button_a'>
                  <div className='download_button'>Download</div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;