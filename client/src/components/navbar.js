import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Icon1 } from './../svgs/home-outline.svg';
import { ReactComponent as Icon2 } from './../svgs/people-outline.svg';
import { ReactComponent as Icon3 } from './../svgs/search-outline.svg';
import { ReactComponent as Icon4 } from './../svgs/add-circle-outline.svg';
import { ReactComponent as Icon5 } from './../svgs/create-outline.svg';
import './../css/components/navbar.css';

function SideNav({ isAdmin }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="sid_nav_main">
            {(
                <button className="expand_button" onClick={toggleExpand}>
                    {!isExpanded ? `☰` : `X`}
                </button>
            )}
            {isExpanded && (
                <div className={`side_nav ${isExpanded ? 'expanded' : 'collapsed'}`} >
                    <div className='side_bar_icons'>
                        <li className={`icon_item ${location.pathname === '/home' ? 'active' : ''}`} onClick={() => navigate('/home')}>
                            <Icon1 className={`icons ${location.pathname === '/home' ? 'active' : ''}`} width={25} height={25}></Icon1>
                            <p className={`icons_name ${location.pathname === '/home' ? 'active' : ''}`}>Home</p>
                        </li>
                        {isAdmin &&
                            <>
                                <li className={`icon_item ${location.pathname === '/add_details' ? 'active' : ''}`} onClick={() => navigate('/add_details')}>
                                    <Icon4 className={`icons ${location.pathname === '/add_details' ? 'active' : ''}`} width={25} height={25}></Icon4>
                                    <p className= {`icons_name ${location.pathname === '/add_details' ? 'active' : ''}`}>Add File</p>
                                </li>
                                <li className={`icon_item ${location.pathname === '/edit_files' ? 'active' : ''}`} onClick={() => navigate('/edit_files')}>
                                    <Icon5 className={`icons ${location.pathname === '/edit_files' ? 'active' : ''}`} width={25} height={25}></Icon5>
                                    <p className={`icons_name ${location.pathname === '/edit_files' ? 'active' : ''}`}>Edit File</p>
                                </li>
                            </>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default SideNav;
