import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../css/pages/add_person.css';

function AddDetails() {
    const [file, setFile] = useState({
        filename: '',
        link: '',
        description: '',
        file: null,
        image: null
    });
    const [selectedFileName, setSelectedFileName] = useState('No file selected');
    const [selectedImage, setSelectedImage] = useState('No image selected');

    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);

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

    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleChooseImage = () => {
        imageInputRef.current.click();
    };

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        setFile({
            ...file,
            file: selectedFile
        });
        setSelectedFileName(selectedFile.name);
    };

    const handleImageInput = (e) => {
        const selectedImageFile = e.target.files[0];
        setSelectedImage(selectedImageFile.name);
    
        const reader = new FileReader();
    
        // Create a Promise to resolve when the reader finishes loading the image
        const imageLoadedPromise = new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result); // Resolve with the base64 encoded image
            };
        });
    
        // Read the selected image as data URL
        reader.readAsDataURL(selectedImageFile);
    
        // Await the resolution of the Promise before updating the state
        imageLoadedPromise.then((base64Image) => {
            setFile({
                ...file,
                image: base64Image // Store the base64 encoded image
            });
        });
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            console.log(file);
            if (file.image) {
                formData.append('image', file.image);
            }
    
            if (file.file) {
                formData.append('file', file.file);
            }
    
            formData.append('filename', file.filename);
            formData.append('link', file.link);
            formData.append('description', file.description);
    
            console.log('FormData:', formData); // Log FormData object
    
            const response = await axios.post('http://localhost:3001/api/addData', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 201) {
                alert('Data added successfully!');
            } else {
                alert('Failed to add data!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add data!');
        }
    };
    

    return (
        <div className='add_details_admin_main'>
            <div className='add_details_admin_inner'>
                <label className='add_details_admin_main_label'>Add File</label>
                <label className='add_details_admin_name_label'>Enter File Name :</label>
                <label className='add_details_admin_link_label'>Enter Link:</label>
                <input className='add_details_admin_name_input' onChange={handleNameInput} placeholder='file name'/>
                <input className='add_details_admin_link_input' onChange={handleLinkInput} placeholder='link'/>
                <label className='add_details_admin_description_label'>Enter description:</label>
                <textarea className='add_details_admin_description_input' onChange={handleDescriptionInput} placeholder='description'></textarea>
                <label className='add_details_admin_file_label'>Upload File:</label>
                <div className='upload_file_section'>
                    <button className='choose_files_button' onClick={handleChooseFile}>Choose File</button>
                    <div className="selected_file">{selectedFileName}</div>
                    <input ref={fileInputRef} type="file" className='add_details_admin_file_input' onChange={handleFileInput} />
                </div>
                <label className='add_details_admin_image_label'>Upload Image:</label>
                <div className='upload_image_section'>
                    <button className='choose_image_button' onClick={handleChooseImage}>Choose Image</button>
                    <div className="selected_image">{selectedImage}</div>
                    <input ref={imageInputRef} type="file" className='add_details_admin_image_input' onChange={handleImageInput} accept="image/*" />
                </div>
                <div className='submit_admin_file_details' onClick={handleSubmit}>Save</div>
            </div>
        </div>
    );
}

export default AddDetails;
