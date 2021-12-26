import './Navbar.styles.css'
import logoDark from "../../assets/LogoDark.png";
// import logoWhite from "../../assets/LogoWhite.png";
import SavedLogo from "../../assets/SavedLogo.svg";
import ProfileLogo from "../../assets/ProfileLogo.svg";

//Logo should change when not on homepage
const Navbar = () => {
    return(
        <ul id="navbar">
            <li id="logoNav">
                <img src={logoDark} width="40px" alt="logo" />
            </li>
            <div className="navbar-user-menu">
            <li>
                <img  src={SavedLogo} alt="heart"/>
            </li>
            <li>
                <img   src={ProfileLogo} alt="profile"/>
            </li>
            </div>
        </ul>
    )
}

export default Navbar;