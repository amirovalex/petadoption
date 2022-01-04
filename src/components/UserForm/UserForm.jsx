import { useState, useEffect } from 'react';
import {Grid,DialogActions,TextField,Button,DialogContent, InputAdornment,FormControl, InputLabel, OutlinedInput} from '@mui/material/';
import { useUser } from '../../context/UserContext';

const UserForm = (props) =>  {
  const {callback, formType , setFormType} = props
  const {closeModal, user, editUser, login, signup } = useUser()
  const [emailForm, setEmailForm] = useState("");
  const [passwordForm, setPasswordForm] = useState("");
  const [repasswordForm, setRepasswordForm] = useState("");
  const [phoneForm, setPhoneForm] = useState("");
  const [firstnameForm, setFirstnameForm] = useState("");
  const [lastnameForm, setLastnameForm] = useState("");

  const clearFields = () => {
    setFormType("login");
    setEmailForm("");
    setPasswordForm("");
    setRepasswordForm("");
    setPhoneForm("");
    setFirstnameForm("");
    setLastnameForm("");
    closeModal();
  }
  
  const handleEmail = (value) => {
    setEmailForm(value);
  };

  const handlePassword = (value) => {
    setPasswordForm(value);
  };

  const handleRepassword = (value) => {
    setRepasswordForm(value);
  };

  const handlePhone = (value) => {
    setPhoneForm(value);
  };

  const handleFirstname = (value) => {
    setFirstnameForm(value);
  };

  const handleLastname = (value) => {
    setLastnameForm(value);
  };

  const setUserFields = () => {
    setEmailForm(user.email)
    setPhoneForm(user.phone)
    setFirstnameForm(user.firstName)
    setLastnameForm(user.lastName)
  }

  const handleCallback = () => {
    switch (formType) {
    case "login":
      login(clearFields,emailForm,passwordForm);
      break;
    case "signup":
      signup(clearFields, emailForm, passwordForm, repasswordForm, firstnameForm, lastnameForm, phoneForm);
      break;
    case "dashboard":
      console.log('eee')
      editUser(user.id, firstnameForm, lastnameForm, phoneForm, passwordForm, repasswordForm , emailForm);
      break;
    default:
      return
      break;
    }  
  }

  const handleButtonText = () => {
    switch (formType) {
      case "login":
        return "Login";
        break;
      case "signup":
        return "Register";
        break;
      case "dashboard":
        return "Save";
        break;
      default:
        return
        break;
    }
  }

  useEffect(() => {
    console.log('userrr',user)
    if(formType === "dashboard") setUserFields();
  },[])

  return (
    <div>
        <DialogContent >
          <Grid container columnSpacing={{ xs: 1, sm: 2}} sx={{justifyContent:"space-evenly"}}>
          <Grid item xs={12} sm={6}  >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={emailForm}
            color="secondary"
            onChange={(e) => handleEmail(e.target.value)}
          />
          </Grid>
          {formType !== "login" &&
            <Grid item container sm={6} xs={12} sx={{display:"flex",alignItems: "center"}}>
                <FormControl sx={{flexGrow:1,position:"relative",top:"2px"}}>
                  <InputLabel color="secondary" htmlFor="phone">Phone Number</InputLabel>
                  <OutlinedInput
                      margin="dense"
                      id="phone"
                      label="Phone Number"
                      type="phone"
                      fullWidth
                      variant="outlined"
                      value={phoneForm}
                      color="secondary"
                      startAdornment={<InputAdornment position="start">+(972)</InputAdornment>}
                      xs={{flexGrow:1}}
                      onChange={(e) => handlePhone(e.target.value)}
                  />
                </FormControl>
            </Grid>
          }
          <Grid item xs={12} sm={6}>
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={passwordForm}
            color="secondary"
            onChange={(e) => handlePassword(e.target.value)}
          />
          </Grid>
          { formType !== "login" &&
          <>
          <Grid xs={12} sm={6} item>
            <TextField
                margin="dense"
                id="repassword"
                label="Repeat Password"
                type="password"
                fullWidth
                variant="outlined"
                value={repasswordForm}
                color="secondary"
                onChange={(e) => handleRepassword(e.target.value)}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
                margin="dense"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                value={firstnameForm}
                color="secondary"
                onChange={(e) => handleFirstname(e.target.value)}
            />
          </Grid>
          <Grid xs={12} sm={6} item>
            <TextField
                margin="dense"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                value={lastnameForm}
                color="secondary"
                onChange={(e) => handleLastname(e.target.value)}
            />
          </Grid>
          </>
          }
          </Grid>
        </DialogContent>
        <DialogActions sx={{justifyContent:"center"}}>
            <Button 
              onClick={() => {
                console.log('pressed')
                handleCallback()}}
              color="secondary" variant="contained">
              {handleButtonText()}
            </Button>
        </DialogActions>
    </div>
  );
}

export default UserForm;