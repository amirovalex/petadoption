import React from 'react'
import MessageWindow from '../../components/MessageWindow/MessageWindow.component.jsx';
import './HomePage.styles.css'
import userDogImage from '../../assets/UserDogImage.jpg';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';

const HomePage = () => {
    const messageTextLeft = "We helped thousands of pets to find their new home. Join today to adopt your own pet"
    const messageTextRight = "Hi, I am looking for a new home. I love the sea and playing with my tennis ball"
    return (
        <div id="homePage">
         <div id="upperSide">
         <Box 
            sx={{display:"flex",justifyContent: "center",alignSelf:"flex-end",backgroundColor:"#fff",padding:2,borderRadius:3, fontFamily: "Roboto"}}>
            {messageTextLeft}
         </Box>
         <Box sx={{display:"flex",justifyContent: "center",alignSelf:"center"}}>
         <MessageWindow
            message={messageTextRight}
            url={userDogImage}
         />
         </Box>
         </div>
         <div id="lowerSide">
                  <Button variant="contained">Join Us</Button> 
         </div>  
        </div>
    )
}

export default HomePage;