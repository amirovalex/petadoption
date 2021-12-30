import React from 'react'
import MessageWindow from '../../components/MessageWindow/MessageWindow.component.jsx';
import './HomePage.styles.css'
import userDogImage from '../../assets/UserDogImage.jpg';
import {Box, Grid, Typography, } from '@mui/material';
import background from '../../assets/background.jpg';
import LoginForm from '../../components/LoginForm/LoginForm.component.jsx';
const HomePage = () => {
    const messageTextLeft = "We helped thousands of pets to find their new home. Join today to adopt your own pet"
    const messageTextRight = "Hi, I am looking for a new home. I love the sea and playing with my tennis ball"
    return (
        <Grid container
        direction="column"
        justifyContent="center"
        sx={{  
           backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        flexGrow:1}}>
         <Grid item
          sx={{flexGrow:3,
         display:"flex"}}>
         <Box 
            sx={{display:"flex",
            justifyContent: "center",
            alignSelf:"flex-end",
            borderRadius:3,
            flexBasis:"50%"}}>  
         <Box sx={{maxWidth:"80%",
                  backgroundColor: "rgba(81, 95, 102,0.7)",
                  borderRadius:3}}>
         <Typography sx={{padding:2,color:"#fff"}}>{messageTextLeft}</Typography>
         </Box>
         </Box>
         <Box sx={{display:"flex",
                  justifyContent: "center",
                  alignSelf:"center",
                  flexBasis:"50%"
                  }}>
         <MessageWindow
            message={messageTextRight}
            url={userDogImage}
         />
         </Box>
         </Grid>
         <Grid item
         sx={{flexGrow:1,
            display:"flex",justifyContent:"center",alignItems:"center"
            }}>
                  <LoginForm/>
         </Grid>  
        </Grid>
    )
}

export default HomePage;