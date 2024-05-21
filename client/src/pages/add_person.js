import React, { useState } from 'react';
import './../css/pages/add_person.css';


function AddDetails(){

    const [file, setFile] = useState({
        file_name:'',
        link:'',
        description:''
    })

    const handleNameInput = (e) =>{
        setFile({
            ...file,
            file_name: e.target.value
        })
    }
    const handleLinkInput = (e) =>{
        setFile({
            ...file,
            link: e.target.value
        })
    }
    const handleDescriptionInput = (e) =>{
        setFile({
            ...file,
            description: e.target.value
        })
    }

    return (
        <div className='add_details_admin_main'>
            <div className='add_details_admin_inner'>
                <label className='add_details_admin_name_label'>Enter File Name :</label>
                <input className='add_details_admin_name_input' onChange={handleNameInput} placeholder='file name'/>
                <label className='add_details_admin_link_label' >Enter Link:</label>
                <input className='add_details_admin_link_input' onChange={handleLinkInput} placeholder='link'/>
                <label className='add_details_admin_description_label'>Enter description:</label>
                <textarea className='add_details_admin_description_input' onChange={handleDescriptionInput} placeholder='description'></textarea>
            </div>
        </div>
    );
}

export default AddDetails
