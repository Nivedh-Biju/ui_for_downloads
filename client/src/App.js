import React, { useState } from 'react';
import './App.css';


function DescriptionModal({ show, onClose, description }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal_description" onClick={onClose}>
      <div className="modal_content_description" onClick={(e) => e.stopPropagation()}>
        <span className="close_description" onClick={onClose}>&times;</span>
        <p>{description}</p>
      </div>
    </div>
  );
}

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const arr_of_items = [
    { name: "item one", link: "#link1#", description: "description 1 1 11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
    { name: "item two", link: "#link2#", description: "description 2 2 2" },
    { name: "item three", link: "#link3#", description: "description 3 3 3" },
  ];

  const handleItemClick = (index) => {
    setSelectedItem(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="App">
      <div className="App_inner">
        {arr_of_items && (
          <ul className='display_items'>
            {arr_of_items.map((application, index) => (
              <li 
                key={index} 
                className='individual_item'
                onClick={() => handleItemClick(index)}
              >
                <p className='individual_item_name'>{application.name}</p>
                <a href={application.link} className='download_button_a'>
                  <div className='download_button'>Download</div>
                </a>
              </li>
            ))}
          </ul>
        )}
        <DescriptionModal 
          show={showModal} 
          onClose={closeModal} 
          description={selectedItem !== null ? arr_of_items[selectedItem].description : ''} 
        />
      </div>
    </div>
  );
}

export default App;