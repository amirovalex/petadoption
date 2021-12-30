import './Navbar.styles.css'
import logoDark from "../../assets/LogoDark.png";
// import logoWhite from "../../assets/LogoWhite.png";
// import SavedLogo from "../../assets/SavedLogo.svg";
// import ProfileLogo from "../../assets/ProfileLogo.svg";
import { AppBar,Toolbar,IconButton,Avatar,Tooltip,Box,TextField,Menu, MenuItem, Typography } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useState } from 'react';

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

  const open = Boolean(anchorEl);

    return(
        <AppBar>
            <Toolbar >
            <Box sx={{paddingRight:2}}>
                <Avatar sx={{height:"auto",cursor:"pointer"}} variant="square" src={logoDark}/>
            </Box>
                <TextField color="secondary" sx={{flexGrow:1}} label="Search for a pet" variant="standard"/>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                <IconButton 
                                      aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                    onClick={handlePopoverOpen} sx={{paddingLeft:1,paddingRight:0}}>
                        <AccountCircleRoundedIcon color="secondary" sx={{width:"40px",height:"40px"}}/>
                </IconButton>
                </Tooltip>
                <Menu
                sx={{ mt: '0px', top:"0px" }}
                id="menu-appbar"
                anchorEl={anchorEl}

                keepMounted

                open={Boolean(anchorEl)}
                onClose={handlePopoverClose}

                >
                    <MenuItem onClick={handlePopoverClose}>
                        <Typography textAlign="center">Saved</Typography>
                    </MenuItem>
                    <MenuItem onClick={handlePopoverClose}>
                        <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                </Menu>
            </Box>
            </Toolbar>
            
        </AppBar>
    )
}

export default Navbar;