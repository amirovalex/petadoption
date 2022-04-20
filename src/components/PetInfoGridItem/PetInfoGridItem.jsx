import React from 'react'
import { Grid } from '@mui/material';

const PetInfoGridItem = ({petInfo,infoName}) => {
  return (
    <Grid item container xs={12} sm={5} sx={{
        boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",
        flexWrap:"nowrap",
        height:"50px",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:1}}>
        <span className="bold">{infoName}</span>
        <span>{petInfo ? petInfo : "No info"}</span>
    </Grid>
  )
}

export default PetInfoGridItem