import React, { useState } from 'react';
import axios from 'axios';
import '../css/pages/add_person.css';

function AddDetails() {
    const [file, setFile] = useState({
        filename: '',
        link: '',
        description: ''
    });

    const handleNameInput = (e) => {
        setFile({
            ...file,
            filename: e.target.value
        });
    };

    const handleLinkInput = (e) => {
        setFile({
            ...file,
            link: e.target.value
        });
    };

    const handleDescriptionInput = (e) => {
        setFile({
            ...file,
            description: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(file.filename === ''){
                alert("Enter file name")
            }
            else if(file.link === ''){
                alert("Enter link for file")
            }
            else if(file.description === ''){
                alert("Enter description for file")
            }
            else{
            const response = await axios.post('http://localhost:3001/api/addData', file);
            if (response.status === 201) {
                alert('Data added successfully!');
            } else {
                alert('Failed to add data!');
            }}
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add data!');
        }
    };

    return (
        <div className='add_details_admin_main'>
            <div className='add_details_admin_inner'>
                <label className='add_details_admin_name_label'>Enter File Name :</label>
                <input className='add_details_admin_name_input' onChange={handleNameInput} placeholder='file name'/>
                <label className='add_details_admin_link_label'>Enter Link:</label>
                <input className='add_details_admin_link_input' onChange={handleLinkInput} placeholder='link'/>
                <label className='add_details_admin_description_label'>Enter description:</label>
                <textarea className='add_details_admin_description_input' onChange={handleDescriptionInput} placeholder='description'></textarea>
                <div className='submit_admin_file_details' onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    );
}

export default AddDetails;
