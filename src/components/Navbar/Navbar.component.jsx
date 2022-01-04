import './Navbar.styles.css'
import logoDark from "../../assets/LogoDark.png";
// import logoWhite from "../../assets/LogoWhite.png";
// import SavedLogo from "../../assets/SavedLogo.svg";
// import ProfileLogo from "../../assets/ProfileLogo.svg";
import { AppBar,Toolbar,IconButton,Avatar,Tooltip,Box,Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import SearchBar from '../SearchBar/SearchBar.component';
import { Link } from "react-router-dom";

//Logo should change when not on homepage
const Navbar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  console.log(anchorEl)

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const { user, openModal, logout } = useUser();

  const open = Boolean(anchorEl);

    return(
        <AppBar>
            <Toolbar sx={{paddingRight:{xs:0,sm:0}}}>
            <Box sx={{paddingRight:2}}>
                <Link to="/">
                    <Avatar sx={{height:{xs:30,sm:40},width:{xs:30,sm:40},cursor:"pointer"}} variant="square" src={logoDark}/>
                </Link>
            </Box>
            <SearchBar/>
            <Box sx={{ flexGrow: 0, display:"flex"}}>
                <Box>
                <Tooltip title="Saved">
                <Link to="/user/saved">
                    <IconButton
                        centerRipple={true}
                        sx={{}}>
                            <FavoriteRoundedIcon color="secondary" sx={{width:{xs:"30px",sm:"40px"},height:{xs:"30px",sm:"40px"},'&:hover': {
                            color: 'red'
                        },}}/>
                    </IconButton>
                </Link>
                </Tooltip>
                </Box>
                <Box>
                <Tooltip title="Open settings">
                <IconButton 
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={(e) => {
                        user ?
                        handlePopoverOpen(e)
                        :
                        openModal()
                        }} 
                    sx={{}}>
                        <AccountCircleRoundedIcon color="secondary" sx={{width:{xs:"30px",sm:"40px"},height:{xs:"30px",sm:"40px"}}}/>
                </IconButton>
                </Tooltip>
                </Box>
                <Menu
                sx={{ mt: '0px', top:"0px",width:`${anchorEl ? anchorEl.offsetWidth : "auto"}` }}
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handlePopoverClose}
                >
                    <Link style={{textDecoration:"none"}}to="user/saved">
                        <MenuItem onClick={handlePopoverClose}>
                                <Typography
                                sx={{color:"#000"}} textAlign="center">Saved</Typography>
                        </MenuItem>
                    </Link>
                    { 
                    (user && user.admin) ? 
                    <Link style={{textDecoration:"none"}} to="user/admin">
                        <MenuItem>
                            <Typography
                            sx={{color:"#000"}}
                            textAlign="center">Admin</Typography>
                        </MenuItem>
                    </Link>
                    : null
                    }
                    <Link style={{textDecoration:"none"}}to="user/dashboard">
                        <MenuItem onClick={handlePopoverClose}>
                            <Typography 
                            sx={{color:"#000"}}textAlign="center">Dashboard</Typography>
                        </MenuItem>
                    </Link>
                    <Link style={{textDecoration:"none"}}to="/">
                    <MenuItem onClick={() => {
                        handlePopoverClose()
                        logout()
                        }}>
                        <Typography 
                        sx={{color:"#000"}}textAlign="center">Sign Out</Typography>
                    </MenuItem>
                    </Link>
                </Menu>
            </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;