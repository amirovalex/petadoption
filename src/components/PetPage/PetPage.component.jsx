import * as React from 'react';
import { Grid, Modal, Button, Paper, Container } from '@mui/material';
import { usePet } from '../../context/PetContext';
import CloseIcon from '@mui/icons-material/Close';
import DogYoga from '../../assets/DogYoga.jpg';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useWindow } from '../../hooks/useWindow';
import PetInfoGridItem from '../PetInfoGridItem/PetInfoGridItem';

const PetPage = () => {

    const { petPageStatus, closePetPage, selectedPet } = usePet();

console.log(selectedPet)
    return (
        selectedPet 
        ?
        <Modal
        sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -46%)',
            width: "100%",
            height:"calc(100% - 60px)",
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
        }}
        hideBackdrop
        open={petPageStatus}
        onClose={closePetPage}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      > 
        <>
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
        <Container sx={{py:2}}>
            <Grid container sx={{flexDirection:"column"}}>
                <Grid item gap={2} container sx={{alignItems:"center"}}>
                    <Grid item container sx={{width:"auto",flexDirection:"column"}}>
                    <span>{selectedPet && selectedPet.name}</span>
                    <span>{selectedPet && selectedPet.type}</span>
                    </Grid>
                    <Button color="secondary" variant="contained" >Adopt</Button>
                    <Button color="secondary" variant="contained" >Foster</Button>
                    <FavoriteRoundedIcon sx={{cursor:"pointer",color:"red"}}/>
                </Grid>
                <Grid item container sx={{py:1}}>
                    <Grid item container sx={
                        {justifyContent:{xs:"center",md:"flex-start"}}} xs={12} sm={5}>
                        <PetInfoGridItem petInfo={selectedPet.height} infoName={"Height"}/>
                        <PetInfoGridItem petInfo={selectedPet.weight} infoName={"Weight"}/>
                        <PetInfoGridItem petInfo={selectedPet.color} infoName={"Color"}/>                      
                        <PetInfoGridItem petInfo={selectedPet.breed} infoName={"Breed"}/>    
                        <PetInfoGridItem petInfo={selectedPet.hypoallergenic} infoName={"Hypoallergenic"}/> 
                        <PetInfoGridItem petInfo={selectedPet.adoptionStatus} infoName={"Adoption Status"}/> 
                        <Grid item container xs={12} sm={5} sx={{height:"50px",
                        flexWrap:"nowrap",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:1,border:"1px solid black"}}>
                            <span>Dietary Restrictions</span>
                        </Grid>
                        <Grid item container xs={12} sm={5} sx={{height:"50px",
                        flexWrap:"nowrap",justifyContent:"center",alignItems:"center",flexDirection:"column",borderRadius:1,border:"1px solid black"}}>
                            <span>{selectedPet.dietaryRestrictions ? selectedPet.dietaryRestrictions : "No info"}</span>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={5} container>
                        <Grid item>
                            <p>Bio: {selectedPet.bio}</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
      </>
      </Modal>
      : null    
    )
}

export default PetPage
