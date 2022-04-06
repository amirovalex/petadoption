import React from 'react'
import { Grid, Avatar, Typography } from '@mui/material';
import { usePet } from '../../context/PetContext';

const PetsList = (props) => {
    const {pets} = props
    console.log(pets)
    const { openPetPage, selectPet } = usePet();

    return (
        <Grid item sx={{padding:2,justifyContent:{xs:"center",sm:"start"}}} container spacing={2} >
            {pets.map((pet,index) => {
                return(
                <Grid sx={{flexDirection: 'column',alignItems: 'center'}} key={index} xs={11.5} sm={3} lg={2} item container>
                    <Grid item>
                        <Avatar 
                        onClick={() => {
                            selectPet(pet)
                            openPetPage()
                        }}
                        sx={{backgroundColor:"#fff",width: '100%',cursor:"pointer", height: '100%',"&:hover":{opacity:0.8}}} src={pet.picture.data.length > 1 ? pet.picture.data.length : "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"}
                        />
                    </Grid>
                    <Grid item sx={{padding: 1}}>
                        <Typography variant="p">
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
