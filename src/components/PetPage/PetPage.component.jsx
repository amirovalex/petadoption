import * as React from 'react';
import { Grid, Modal, Button, Paper, Container } from '@mui/material';
import { usePet } from '../../context/PetContext';
import { useUser } from '../../context/UserContext';
import CloseIcon from '@mui/icons-material/Close';
import DogYoga from '../../assets/DogYoga.jpg';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useWindow } from '../../hooks/useWindow';
import PetInfoGridItem from '../PetInfoGridItem/PetInfoGridItem';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
import "./PetPage.styles.css"
const PetPage = () => {

    const { petPageStatus, closePetPage, savePet, savedPetDelete, adoptPet, returnPet, selectedPet } = usePet();
    const { user,savedPets } = useUser()

    const [isPetSaved,setIsPetSaved] = React.useState(false)
    const {isSmallScreen} = useWindow()

    React.useEffect(() => {
        setIsPetSaved(false)
        selectedPet &&
        savedPets.map((pet) => {
            console.log(pet.id)
            console.log(selectedPet.id)
            if(pet.id === selectedPet.id) {
                setIsPetSaved(true)
            }
        })
    },[savedPets,selectedPet])

    React.useEffect(() => {
        return closePetPage()
    },[])

    return (
        selectedPet 
        ?
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={petPageStatus}
        closeAfterTransition
        hideBackdrop
        onClose={closePetPage}
        sx={{width: "100%",
            height:"100%",}}
        > 
        <Slide direction="up" in={petPageStatus} mountOnEnter unmountOnExit>
            <Box sx={{ 
            position: 'absolute',
            bottom: '0',

            width: "100%",
            height:isSmallScreen ? "calc(100% - 60px)" : "calc(100% - 60px)",
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
        }}>    
            <Paper sx={{
                backgroundImage:`url(${DogYoga})`,
                width:"100%",
                display: 'flex',
                flexDirection: 'column',
                backgroundRepeat:"no-repeat",
                backgroundSize: "contain",
                height:{xs:200,sm:300,md:500},
                backgroundColor:"#000",
                backgroundPosition:"center",
                borderRadius:0
                }}>
                <CloseIcon sx={{color:"#14445a",cursor:"pointer","&:hover":{color:"#fff"},mr:1,mt:1,alignSelf:"flex-end"}} onClick={closePetPage} />   
            </Paper>
            <Container sx={{
                overflowY: "scroll",
                height:{xs:"calc(100vh - 200px - 60px)",sm:"calc(100vh - 300px - 60px)",md:"calc(100vh - 500px - 60px)"},
                py:2
                }}>
            <Grid container sx={{flexDirection:"column"}}>
                <Grid item gap={2} container sx={{alignItems:"center"}}>
                    <Grid item container sx={{width:"auto",flexDirection:"column"}}>
                    <span className="bold">{selectedPet && selectedPet.name}</span>
                    <span>{selectedPet && selectedPet.type}</span>
                    </Grid>
                    <Button color="secondary" variant="contained" 
                    disabled={selectedPet.owner && selectedPet.adoptionStatus === "adopt" && selectedPet.owner !== user.id && "true"}
                    onClick={() => {
                        selectedPet.owner === user.id && selectedPet.adoptionStatus === "adopt" ?
                        returnPet(user,selectedPet.id)
                        :
                        adoptPet(user,selectedPet.id, "adopt")}
                        }>{selectedPet.owner === user.id && selectedPet.adoptionStatus === "adopt" ? "Return" : "Adopt"}</Button>
                    <Button 
                        color="secondary"
                        disabled={selectedPet.owner && selectedPet.adoptionStatus === "foster" && selectedPet.owner !== user.id && "true"}
                        onClick={() => {
                        selectedPet.owner === user.id && selectedPet.adoptionStatus === "foster" ?
                        returnPet(user,selectedPet.id)
                        :
                        adoptPet(user,selectedPet.id, "foster")}}
                        variant="contained">{selectedPet.owner === user.id && selectedPet.adoptionStatus === "foster" ? "Return" : "Foster"}</Button>
                    <FavoriteRoundedIcon 
                    onClick={() => {
                        isPetSaved ? savedPetDelete(user,selectedPet) : savePet(user,selectedPet)
                    }}sx={{cursor:"pointer",color:isPetSaved ? "red" : "secondary"}}/>
                </Grid>
                <Grid item container sx={{py:1}}>
                    <Grid item container sx={
                        {justifyContent:{xs:"center",md:"flex-start",gap:"1rem"}}} xs={12} sm={5}>
                        <PetInfoGridItem petInfo={selectedPet.height} infoName={"Height"}/>
                        <PetInfoGridItem petInfo={selectedPet.weight} infoName={"Weight"}/>
                        <PetInfoGridItem petInfo={selectedPet.color} infoName={"Color"}/>                      
                        <PetInfoGridItem petInfo={selectedPet.breed} infoName={"Breed"}/>    
                        <PetInfoGridItem petInfo={selectedPet.hypoallergenic} infoName={"Hypoallergenic"}/> 
                        <PetInfoGridItem petInfo={selectedPet.adoptionStatus} infoName={"Adoption Status"}/> 
                        <Grid item container xs={12} sm={5} sx={{height:"50px",
                        flexWrap:"nowrap",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:1,boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",}}>
                            <span className="bold">Dietary Restrictions</span>
                        </Grid>
                        <Grid item container xs={12} sm={5} sx={{height:"50px",
                        flexWrap:"nowrap",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:1,boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",}}>
                            <span>{selectedPet.dietaryRestrictions ? selectedPet.dietaryRestrictions : "No info"}</span>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={5} container>
                        <Grid item sx={{display:"flex",alignItems:"flex-start"}}>
                            <span className="bold">Bio:</span>
                            <span>{selectedPet.bio ? selectedPet.bio : " No Bio available"}</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
        </Box>
      </Slide>
      </Modal>
      : null    
    )
}

export default PetPage
