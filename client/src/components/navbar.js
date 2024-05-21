import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Icon1 } from './../svgs/home-outline.svg';
import { ReactComponent as Icon2 } from './../svgs/people-outline.svg';
import { ReactComponent as Icon3 } from './../svgs/search-outline.svg';
import { ReactComponent as Icon4}  from './../svgs/add-circle-outline.svg';
import './../css/components/navbar.css'

function SideNav( {isAdmin,}) {

    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(true);
  
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
   
    return (
      <div>
        {(
          <button className="expand_button" onClick={toggleExpand}>
            {!isExpanded ? `☰` : `X`} 
          </button>
        )}
        {isExpanded && (
          <div className={`side_nav ${isExpanded ? 'expanded' : 'collapsed'}`} >
            <div className='side_bar_icons'>
              <li className='icon_item' onClick = { () => navigate('/home')}>
              <Icon1 className="icons" width={25} height={25}></Icon1>
              <p className='icons_name'>Home</p>
              </li>
              <li className='icon_item'>
              <Icon2 className="icons" width={25} height={25}></Icon2>
              <p className='icons_name'>Contact</p>
              </li>
              <li className='icon_item'>
              <Icon3 className="icons" width={25} height={25}></Icon3>
              <p className='icons_name'>Search</p>
              </li>
              { isAdmin &&
                <li className='icon_item' onClick = { () => navigate('/add_details')}>
                <Icon4 className="icons" width={25} height={25}></Icon4>
                <p className='icons_name'>Add File</p>
                </li>
              }
            </div>
          </div>
        )}
      </div>
    );
  }

  export default SideNav