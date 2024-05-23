import React from 'react';
import { useLocation } from 'react-router-dom';
import "./../css/components/description.css";

function DescriptionPage() {
    const location = useLocation();
    const { application } = location.state || {};

    if (!application) {
        return <div>No application data available</div>;
    }

    return (
        <div className="description_page_main">
            <img src={application.image} className="description_page_logo" alt="Image" />
            <div className="description_page_name">
                {application.filename}
            </div>
            <div className="description_page_description">
                {application.description}
            </div>
            <div className='description_page_download_section'>
                <a href = {application.link} className="description_page_download">Click Here</a>
            </div>
        </div>
    );
}

export default DescriptionPage;
