import React from 'react'
import { Grid, Typography, Button } from '@mui/material';
import PetsList from '../../components/PetsList/PetsList.component';
import Dashboard from '../../components/Dashboard/Dashboard.component';
import SideMenu from '../../components/SideMenu/SideMenu.component';
import { Routes,Route } from 'react-router-dom';
import menuWrapper from '../../components/MenuWrapper/MenuWrapper.component';
import AdminMenu from '../../components/AdminMenu/AdminMenu.component';
import { usePet } from '../../context/PetContext';
import { useUser } from '../../context/UserContext';
import { useEffect, useState } from 'react';

const ProfilePage = () => {

    const { savedPets, ownedPets } = useUser()
    const { getSavedPets, getPetsByUser } = usePet()
    const [ listType, setListType ] = useState("saved");
    useEffect(() => {
        getSavedPets()
        getPetsByUser()
    },[])

    const SideMenuWithMenuWrapper = menuWrapper(SideMenu)
    const AdminMenuWithWrapper = menuWrapper(AdminMenu)
    return (
        <Grid container sx={{height:"100%",pt:8,flexDirection:'column'}}>
            <Grid item>
                <Typography variant="h2">
                    User Profile: Saved
                </Typography>
            </Grid>   
            <Grid item container sx={{flexGrow:1,flexWrap:"nowrap",borderTop:"2px solid black",
            flexDirection:{xs:"column", sm:"row"}}}>
                <SideMenuWithMenuWrapper 
                    sx={{flexBasis:{xs:0,sm:"20%"},flexDirection:'column',
                    borderRight:{xs:"none",sm:"2px solid black"},
                    borderBottom:{xs:"2px solid black",sm:"none"
                    }}}
                />
                <Grid item container sx={{flexDirection:'column'}}>
                    <Routes>
                    <Route path="saved" element={
                    <>
                        <Grid item container sx={{flexGrow:0,justifyContent:"center",width:"auto",
                        borderBottom:"2px solid black"}}>
                            <Grid sx={{borderRight:"2px solid black"}} item>
                                <Button onClick={(e) => setListType("saved")} variant="text" color="secondary" >Saved</Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={(e) => setListType("owned")} variant="text" color="secondary">Owned</Button>
                            </Grid>
                        </Grid>
                        <PetsList pets={listType === "saved" ? savedPets : ownedPets }/>
                    </>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="admin/*" element={<AdminMenuWithWrapper
                        sx={{flexDirection:'column'}}/>}/>
                    </Routes>
                </Grid>  
            </Grid>    
        </Grid>
    )
}

export default ProfilePage
