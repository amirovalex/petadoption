import React from 'react'
import {Grid,Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const MenuTile = (props) => {
    const  {navigateRoute,text,cb} = props
    const navigate = useNavigate()
    const { user } = useUser()
    return (
        <Grid item 
        onClick={() => {
            if(cb) {cb(user)}
            navigate(navigateRoute)
        }}
        sx={{cursor:"pointer","&:hover":{backgroundColor:"rgba(0,0,0,0.1)"},padding:1}}>
            <Typography variant="h5"
            >
                {text}
            </Typography>
        </Grid>
    )
}

export default MenuTile
