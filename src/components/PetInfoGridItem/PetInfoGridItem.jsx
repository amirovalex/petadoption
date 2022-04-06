import React from 'react'
import { Grid } from '@mui/material';

const PetInfoGridItem = ({petInfo,infoName}) => {
  return (
    <Grid item container xs={12} sm={5} sx={{
        flexWrap:"nowrap",
        height:"50px",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:1,border:"1px solid black"}}>
        <span>{infoName}</span>
        <span>{petInfo ? petInfo : "No info"}</span>
    </Grid>
  )
}

export default PetInfoGridItem