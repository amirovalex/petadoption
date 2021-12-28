import './Navbar.styles.css'
import logoDark from "../../assets/LogoDark.png";
// import logoWhite from "../../assets/LogoWhite.png";
import SavedLogo from "../../assets/SavedLogo.svg";
import ProfileLogo from "../../assets/ProfileLogo.svg";
import { AppBar,Toolbar,IconButton,Avatar,Tooltip,Box,TextField } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

//Logo should change when not on homepage
const Navbar = () => {
    return(
        <AppBar>
            <Toolbar >
            <Box sx={{paddingRight:2}}>
                <Avatar sx={{height:"auto"}} variant="square" src={logoDark}/>
                {/* <img src={logoDark}/> */}
            </Box>
                <TextField color="secondary" sx={{flexGrow:1}} label="Search for a pet" variant="standard"/>
            <Tooltip title="Open settings">
                <IconButton sx={{paddingLeft:1,paddingRight:0}}>
                    <AccountCircleRoundedIcon color="secondary" sx={{width:"40px",height:"40px"}}/>
                </IconButton>
            </Tooltip>
            </Toolbar>
            
        </AppBar>
    )

    // return(
    //     <ul id="navbar">
    //         <li id="logoNav">
    //             <img src={logoDark} width="40px" alt="logo" />
    //         </li>
    //         <div className="navbar-user-menu">
    //         <li>
    //             <img  src={SavedLogo} alt="heart"/>
    //         </li>
    //         <li>
    //             <img   src={ProfileLogo} alt="profile"/>
    //         </li>
    //         </div>
    //     </ul>
    // )
}

export default Navbar;