import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './../css/pages/edit_file_id.css';



const availableRoles = ['Product Team Developers', 'Service Area Developers', 'DB Team', 'Testers', 'Business Analysts', 'Business Development', 'HR'];

const RolesSelector = ({ selectedRoles, onRoleChange }) => {
    const isAllSelected = selectedRoles.length === availableRoles.length;
    const handleCheckboxChange = (role) => {
        if (role === 'All') {
            if (isAllSelected) {
                onRoleChange([]); // Deselect all
            } else {
                onRoleChange([...availableRoles]); // Select all
            }
        } else {
            if (selectedRoles.includes(role)) {
                onRoleChange(selectedRoles.filter((r) => r !== role));
            } else {
                onRoleChange([...selectedRoles, role]);
            }
        }
    };

    return (
        <div className='add_file_role_section'>
            <label className='checkbox-container add_file_role_label'>
                <input
                    type="checkbox"
                    value="All"
                    checked={isAllSelected}
                    onChange={() => handleCheckboxChange('All')}
                    className='add_file_role_selector'
                />
                All
            </label>
            {availableRoles.map((role) => (
                <label key={role} className='checkbox-container add_file_role_label'>
                    <input
                        type="checkbox"
                        value={role}
                        checked={selectedRoles.includes(role)}
                        onChange={() => handleCheckboxChange(role)}
                        className='add_file_role_selector'
                    />
                    {role}
                </label>
            ))}
        </div>
    );
};




const EditFileComponent = () => {
    const [fileData, setFileData] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { application } = location.state || {};
    const fileId = application._id;

    const [file, setFile] = useState({
        filename: '',
        link: '',
        description: '',
        roles: [],
        file: null,
        image: null
    });

    useEffect(() => {
            setFile({ filename:application.filename, link: application.link, description:application.description, roles:application.roles, image:application.image });
            setSelectedImage(application.image ? 'Image selected' : 'No image selected');
    }, [application]);


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

    const handleRoleChange = (roles) => {
        setFile({ ...file, roles });
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
    
        const imageLoadedPromise = new Promise((resolve) => {
            reader.onloadend = () => {
                resolve(reader.result);
            };
        });
    
        reader.readAsDataURL(selectedImageFile);
    
        imageLoadedPromise.then((base64Image) => {
            setFile({
                ...file,
                image: base64Image
            });
        });
    };
    const navigate = useNavigate();
    const HandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
    
            const rolesToSubmit = file.roles.length === availableRoles.length ? 'all' : file.roles;
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
            formData.append('roles', JSON.stringify(rolesToSubmit)); // Append roles as JSON string
            console.log(formData.filename);
            const response = await axios.put(`http://localhost:3001/api/files/edit/${fileId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                navigate('/home');
            } else {
                console.log('Failed to edit data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className='add_details_admin_main'>
            <div className='add_details_admin_inner'>
                <label className='add_details_admin_main_label'>Edit File</label>
                <label className='add_details_admin_name_label'>Enter File Name :</label>
                <label className='add_details_admin_link_label'>Enter Link:</label>
                <input className='add_details_admin_name_input' onChange={handleNameInput} placeholder='file name' value={file.filename}/>
                <input className='add_details_admin_link_input' onChange={handleLinkInput} placeholder='link' value={file.link}/>
                <label className='add_details_admin_description_label'>Enter description:</label>
                <textarea className='add_details_admin_description_input' onChange={handleDescriptionInput} placeholder='description' value={file.description}></textarea>
                <label className='add_details_admin_roles_label'>Select Roles:</label>
                <RolesSelector selectedRoles={file.roles} onRoleChange={handleRoleChange} />
                {/* <label className='add_details_admin_file_label'>Upload File:</label> */}
                <div className='upload_file_section'>
                    <button className='choose_files_button' onClick={handleChooseFile}>Choose File</button>
                    <div className="selected_file">{selectedFileName}</div>
                    <input ref={fileInputRef} type="file" className='add_details_admin_file_input' onChange={handleFileInput} />
                </div>
                <label className='add_details_admin_image_label'>Upload Image:</label>
                <div className='upload_image_section'>
                    <button className='choose_image_button' onClick={handleChooseImage}>Choose Image</button>
                    <div className="selected_image">
                        {file.image ? (
                            <img src={file.image} alt="Selected Image" className="preview-image" />
                        ) : (
                            <span>No image selected</span>
                        )}
                    </div>
                    <input ref={imageInputRef} type="file" className='add_details_admin_image_input' onChange={handleImageInput} accept="image/*" />
                </div>
                <div className='submit_admin_file_details' onClick={HandleSubmit}>Save</div>
            </div>
        </div>
    );
};

export default EditFileComponent;
