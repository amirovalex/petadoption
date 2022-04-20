import * as React from 'react';
import { useState } from 'react';
import {Box,DialogTitle,Dialog,Button} from '@mui/material/';
import UserForm from '../UserForm/UserForm'
import { useUser } from '../../context/UserContext';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoginModal = () =>  {
  const [formType, setFormType] = useState('login');

  const { login, signup, isOpenModal ,openModal, closeModal, editUser } = useUser()

  const handleCloseModal = () => {
    setFormType("login");
    closeModal();
  }

  const handleSetForm = (type) => {
    setFormType(type);
  };

  const handleCallback = () => {
    switch (formType) {
      case "login":
        return login;
        break;
      case "signup":
        return signup;
        break;
      default:
        return
        break;
    }
  }

  return (
    <div>
       <Button sx={{marginBottom:1}} color="secondary" variant="contained" onClick={openModal}>
        Join Us
       </Button>
       <Dialog TransitionComponent={Transition} open={isOpenModal} onClose={handleCloseModal}>
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
        <UserForm 
            setFormType={setFormType}
            formType={formType}
            callback={handleCallback()}
         />
      </Dialog>
    </div>
  );
}

export default LoginModal;