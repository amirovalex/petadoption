import React from 'react'
import MessageWindow from '../../components/MessageWindow/MessageWindow.component.jsx';
import './HomePage.styles.css'
import userDogImage from '../../assets/UserDogImage.jpg';
import { Grid, Typography } from '@mui/material';
import background from '../../assets/background.jpg';
import LoginModal from '../../components/LoginModal/LoginModal.component.jsx';
import { useUser } from '../../context/UserContext';

const HomePage = () => {

   const {user} = useUser();

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
         <Grid item container
            sx={{flexGrow:3,
            display:"flex"}}>
               {
                  !user &&
                  <Grid item container
                  xs={12}
                  sm={!user && 6}
                  sx={{display:"flex",
                  justifyContent: "center",
                  alignSelf:"flex-end",
                  borderRadius:3}}>  
                     <Grid item
                        sx={{maxWidth:"80%",
                        backgroundColor: "rgba(81, 95, 102,0.7)",
                        borderRadius:3}}>
                        <Typography sx={{padding:2,color:"#fff"}}>{messageTextLeft}</Typography>
                     </Grid>
                  </Grid>
               }
               <Grid item 
                     xs={12}
                     sm={user ? 12 : 6}
                     lg={user ? 12 : 6}
                     xl={user ? 12 : 6}
                     sx={{display:"flex",
                     justifyContent: "center",
                     alignSelf:"center"
                     }}>
                  <MessageWindow
                     xs={12}
                     sm={6}
                     lg={6}
                     xl={6}
                     message={messageTextRight}
                     url={userDogImage}
                  />
               </Grid>
         </Grid>
         {
            !user &&
            <Grid item
            sx={{flexGrow:1,
               display:"flex",justifyContent:"center",alignItems:"center"
               }}>
                     <LoginModal/>
            </Grid> 
         } 
      </Grid>
   )
}

export default HomePage;