import { useState } from 'react';
import {Grid,Box,DialogTitle,DialogActions,Dialog,TextField,Button,DialogContent} from '@mui/material/';

const LoginForm = () =>  {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState('login');

  const handleSetForm = (type) => {
    setFormType(type);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="secondary" variant="contained" onClick={handleClickOpen}>
        Join Us
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{display:"flex",justifyContent:"space-evenly"}}>
        <DialogTitle onClick={() => { 
          handleSetForm('login')
        }}
        sx={[{flexGrow:1,cursor:"pointer",textAlign:"center"},
        {'&:hover':{backgroundColor: "rgba(81, 95, 102,0.8)"}},
        formType === "login" && {backgroundColor: "rgba(81, 95, 102,0.7)"}]}>
            Log In
        </DialogTitle>
        <DialogTitle onClick={() => { 
          handleSetForm('register')
        }}
        sx={[{flexGrow:1,cursor:"pointer",textAlign:"center"},{'&:hover':{backgroundColor: "rgba(81, 95, 102,0.8)"}},
        formType === "register" && {backgroundColor: "rgba(81, 95, 102,0.7)"}]}>
            Sign Up
            </DialogTitle>
        </Box>  
        <DialogContent>
          <Grid container sx={{gap:2,justifyContent:"space-evenly"}}>
          <Grid item sx={{flexGrow:1}}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          </Grid>
          {formType === 'register' &&
            <Grid item sx={{flexGrow:1}}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="phone"
                    label="Phone Number"
                    type="phone"
                    fullWidth
                    variant="outlined"
                    color="secondary"
                />
            </Grid>
          }
          <Grid  item sx={{flexGrow:1}}>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            color="secondary"
          />
          </Grid>
          { formType === 'register' &&
          <>
          <Grid  item sx={{flexGrow:1}}>
            <TextField
                autoFocus
                margin="dense"
                id="repassword"
                label="Repeat Password"
                type="password"
                fullWidth
                variant="outlined"
                color="secondary"
            />
          </Grid>
          <Grid item sx={{flexGrow:1}}>
            <TextField
                autoFocus
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                color="secondary"
            />
          </Grid>
          <Grid item sx={{flexGrow:1}}>
            <TextField
                autoFocus
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                color="secondary"
            />
          </Grid>
          </>
          }
          </Grid>
        </DialogContent>
        <DialogActions sx={{justifyContent:"center"}}>
            <Button color="secondary" variant="contained">
                { formType === "login" ? "Login" : "Register" }
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginForm;