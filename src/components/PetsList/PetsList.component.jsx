import React from 'react'
import { Grid, Avatar, Typography } from '@mui/material';
import { usePet } from '../../context/PetContext';

const PetsList = (props) => {
    const {pets, listType} = props
    console.log(pets)
    const { openPetPage, selectPet} = usePet();

    return (
        <Grid item sx={{padding:2,justifyContent:{xs:"center",sm:"start"}}} container spacing={2} >
            {pets.map((pet,index) => {
                return(
                <Grid sx={{flexDirection: 'column',alignItems: 'center'}} key={index} xs={11.5} sm={3} lg={2} item container>
                    <Grid item>
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
                        sx={{backgroundColor:"#fff",width: '10rem',cursor:"pointer", height: '10rem',"&:hover":{opacity:0.8}}} src={pet.picture ? pet.picture : "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"}
                        />
                    </Grid>
                    <Grid item sx={{padding: 1}}>
                        <Typography variant="p" sx={{fontWeight:"bold",}}>
                            {pet.name}
                        </Typography>
                    </Grid>
                </Grid>
                )
            })}
            {pets.length === 0 || !pets && 
            <Typography variant="h5" sx={{mx:"auto"}}>
                No pets in the list
            </Typography>
            }
        </Grid>
    )
}

export default PetsList
