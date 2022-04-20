import React from 'react'
import MessageWindow from '../../components/MessageWindow/MessageWindow.component.jsx';
import './HomePage.styles.css'
import userDogImage from '../../assets/UserDogImage.jpg';
import { Grid, Typography,Box, IconButton,Card,
CardContent } from '@mui/material';
import background from '../../assets/background.jpg';
import LoginModal from '../../components/LoginModal/LoginModal.component.jsx';
import { useUser } from '../../context/UserContext';
import HomePageContainer from '../../components/HomePageContainer/HomePageContainer.component.jsx';
import mapImage from '../../assets/mapImage.png'
import { useWindow } from '../../hooks/useWindow';
import PetsCategoriesList from '../../components/PetsCategoriesList/PetsCategoriesList.component';
import PetsListItem from '../../components/PetsListItem/PetsListItem.component';
import {newTopPetsList} from './PetsList';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
const HomePage = () => {

   const {user} = useUser();
   const { isDesktopOrLaptop, isSmallScreen } = useWindow();
   
   console.log(isDesktopOrLaptop)
   console.log(isSmallScreen)
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
            sx={{
               marginTop:"60px",
               flexGrow:3,
               padding:"1rem",
               backdropFilter:"blur(1rem)",
               paddingTop: isSmallScreen ? "1rem" : "1rem",
               display:"flex",alignItems:"flex-end",
               justifyContent:"center",
               alignItems: "center",
               flexDirection:"column",
               }}>
               
               <Grid item container
                  maxWidth={isDesktopOrLaptop ?
                  "calc(1200px + 1rem) !important" : "600px !important"}
                  sx={{
                  gridGap:"1rem",
                  marginBottom:"1rem",
                  flex:"1",display:"grid",
                  justifyItems:"center",
                  height:"100%",
                  alignItems: "center",
                  gridTemplateColumns:isDesktopOrLaptop ? "1fr 1fr 2fr" : "1fr 1fr",
                  gridTemplateRows:isDesktopOrLaptop && "1fr 130px"
                  }}>
                 <HomePageContainer 
                  background="linear-gradient(0deg, rgba(234,234,234,1) 0%, rgba(234,234,234,0.7) 100%)"

                 height="100%">
                     <Box sx={{display:"flex",flexDirection:"column",height:"100%",width:"100%",alignItems:"center",
                     justifyContent:"flex-start"}}>
                        <Typography className ="bold" variant="span">
                           New Pets
                        </Typography>
                        <Box sx={{maxHeight:"480px",
                        width:"100%",overflow:"scroll"}}>
                        {newTopPetsList.map((pet,index) => {

                        return <PetsListItem listType="newPets"
                        index={index}
                        pet = {pet}
                        />
                        })}
                        </Box>
                     </Box>
                  </HomePageContainer>
                  <HomePageContainer
                     background="linear-gradient(0deg, rgba(234,234,234,1) 0%, rgba(234,234,234,0.7) 100%)"
                     height="100%">
                     <Box sx={{display:"flex",flexDirection:"column",height:"100%",width:"100%",alignItems:"center"}}>
                        <Typography className ="bold" variant="span">
                           Top Saved Pets
                        </Typography>
                                                                                             <Box sx={{maxHeight:"480px",overflow:"scroll",width:"100%"}}>
                        {newTopPetsList.map((pet,index) => {
                        return <Box key={index} sx={{display:"flex",flexDirection:"column",
                        alignItems:"center"}}>
                        <PetsListItem listType="newPets"
                        pet = {pet}
                        />
                        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                           <Typography className ="bold" variant="span">
                              100 likes
                           </Typography>
                           <IconButton
                           centerRipple={true}
                           sx={{}}>
                              <FavoriteRoundedIcon color="secondary" sx={{width:{xs:"30px",sm:"40px"},height:{xs:"30px",sm:"40px"},'&:hover': {
                              color: 'red'
                              },}}/>
                           </IconButton>
                        </Box>
                        </Box>
                        })}
                        </Box>
                     </Box>
                  </HomePageContainer>
                  <HomePageContainer 
                  gridRowStart={!isDesktopOrLaptop && 1}
                  gridColumn={!isDesktopOrLaptop && "1/3"}
                  background="linear-gradient(0deg, rgba(234,234,234,1) 0%, rgba(234,234,234,0.7) 100%)"
                  height="100%">
                     <Card sx={{display:"flex",borderRadius:3,
                     
                     background: "linear-gradient(0deg, rgba(81,95,102,1) 0%, rgba(159,166,169,0.5) 50%, rgba(216,218,218,1) 88%, rgba(216,218,218,1) 100%)",

                     boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)"
                     }}>
                        <CardContent >
                              <Typography
                              color="#fff"
                              sx={{fontWeight:"bolder"}}
                              >
                  
                  <Typography className ="bold" variant={isDesktopOrLaptop ? "h4" : "h6"}
                   color="secondary" sx={{fontFamily: 'Poppins, sans-serif', lineHeight:1.5}}><Typography
                     color="secondary"
                     sx={{fontFamily: 'Poppins, sans-serif', lineHeight:1.5}}
                     variant="span">Pet a Pet  </Typography> is the only social platform you need to adopt <Typography
                     color="secondary"
                     sx={{fontFamily: 'Poppins, sans-serif', lineHeight:1.5}}
                     variant="span">a pet!</Typography> We are working with veterinary clinics around the country to give you the best support and information in one place. <Typography
                     color="primary"
                     sx={{fontWeight:"bolder",fontFamily: 'Poppins, sans-serif', lineHeight:1.5}}
                     variant="span">Try out the nice features we are offering you by searching for a pet!</Typography>
                  </Typography>
                              </Typography>
                        </CardContent>
                     </Card>
                  </HomePageContainer>
                  <HomePageContainer 
                  maxWidth="100% !important" height="100%"
                  gridRowStart={!isDesktopOrLaptop && 2}
                  gridColumn={isDesktopOrLaptop ? "1 / span 3" : "1/3"}>
                     <PetsCategoriesList/>
                  </HomePageContainer>
               </Grid>
               <Box sx={{display:"grid",
               gridAutoRows:"1fr",
               gridTemplateColumns:isDesktopOrLaptop ? "1fr 1fr" : "1fr",
               gridGap:"1rem",gridTemplateRows:"1fr"}}>

               <HomePageContainer
               maxWidth="600px !important"
               justifySelf = {isDesktopOrLaptop ? "end" : "center"}>
               {
                  !user &&
                  <Grid item container
                  xs={12}
                  // sm={!user && 6}
                  sx={{display:"flex",
                  justifyContent: "center",
                  alignItems:"center",
                  borderRadius:3,
                  flexWrap:"nowrap",
                  width:"100%",
                  flexBasis:"10%",
                  maxWidth:"100%"}}>  
                     <Grid item
                        sx={{
                        backgroundColor: "rgba(81, 95, 102,0.7)",
                        "&:hover":{backgroundColor:"#515f66"},
                        cursor:"pointer",
                        boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",
                        borderRadius:3}}>
                        <Typography sx={{fontWeight:"bolder",
                        padding:2,color:"#fff"}}>{messageTextLeft}</Typography>
                     </Grid>
                  </Grid>
               }
               <Grid item 
                     xs={12}
                     // sm={user ? 12 : 6}
                     // lg={user ? 12 : 6}
                     // xl={user ? 12 : 6}
                     sx={{display:"flex",
                     flexBasis:"10%",
                     maxWidth:"100%"
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
         </HomePageContainer>
         <HomePageContainer 
         maxWidth="600px !important"
         justifySelf={isDesktopOrLaptop ? "start" : "center"}>
            <Box 
            sx={{
               boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",
               borderRadius:3,
               height:"100%",width:"100%",
               position:"relative",
               filter: "brightness(57%)",
               cursor:"pointer",
               backgroundSize:"cover",backgroundImage:`url(${mapImage})`}}/>
            <Typography variant="span" sx={{
               cursor:"pointer",fontSize:"1.3rem",fontSioverflowWrap: "break-word",fontWeight:"bolder",position:"absolute",color:"#fff"}}>Pets map coming soon...</Typography>
         </HomePageContainer>
         </Box>
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