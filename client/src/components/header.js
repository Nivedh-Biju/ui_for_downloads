import logo from "./../logo.png";
import profile from "./../profile.png";
import './../css/components/header.css';


function Header(){
    return(
        <div className='header_section'>
        <img className= "header_logo" src={logo} alt = "logo"/>
        <div className='header_title'>Sample Heading</div>
        <img className='user_image_header' src = {profile}></img>
        <div className='user_info_header'>
        <p className='user_name_header'>User 1</p>
        <p className='user_post_header'>Admin</p>
        </div>
    </div>
    );
}

export default Header;