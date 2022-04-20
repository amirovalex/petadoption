import React from 'react'
import {Grid,Typography,Avatar} from "@mui/material";
import { usePet } from '../../context/PetContext';

const PetsListItem = ({listType,index,pet}) => {

  const {selectPet, openPetPage} = usePet();
  
  return (
     <Grid sx={{flexDirection: 'column',alignItems: 'center', py:1}}  item container>
                    <Grid sx={{display: 'flex',justifyContent: 'center'}} item>
                        <Avatar 
                        onClick={() => {
                            if(listType==="petEdit") {
                                selectPet(pet)
                                return;
                            }
                            if(listType==="petSearch") {
                                selectPet(pet)
                                openPetPage()
                            }
                        }}
                        sx={{backgroundColor:"#fff",width: '8rem',cursor:"pointer", height: '8rem',"&:hover":{opacity:0.8}}} src={pet.picture ? pet.picture : "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"}
                        />
                    </Grid>
                    <Grid item sx={{padding: 1}}>
                        <Typography variant="p" sx={{fontWeight:"bold",}}>
                            {pet.name}
                        </Typography>
                    </Grid>
                </Grid>
  )
}

export default PetsListItem