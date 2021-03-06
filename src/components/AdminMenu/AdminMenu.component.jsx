import React from 'react'
import { useLocation } from 'react-router-dom';
import {useState} from 'react';
import MenuTile from '../../components/MenuTile/MenuTile.component';
import PetForm from '../../components/PetForm/PetForm.component';
import { usePet } from '../../context/PetContext.js';
import { useUser } from '../../context/UserContext.js';
import EditPetMenu from '../../components/Menus//EditPetMenu/EditPetMenu.component';
import { Box} from '@mui/material'
import UserInfoCard from '../UserInfoCard/UserInfoCard.component';
import { useWindow } from '../../hooks/useWindow';
const AdminMenu = () => {
    const [menuRoute,setMenuRoute] = useState("main")
    
    const handleMenuRoute = (route) => {
        setMenuRoute(route)
    }
    const location = useLocation()
    const { getUsers,allUsers } = useUser()
    const { setSearchPetsResults } = usePet()
    const { isDesktopOrLaptop } = useWindow()
    return (
        <>
        { !location.pathname.includes('admin/') &&  
        <>
            <MenuTile
                text={"Pets"}
                navigateRoute={"pets"}
            />
            <MenuTile 
                text={"Users"}
                navigateRoute={"users"}
            />
        </>
        }
        { location.pathname.includes('admin/users') && !location.pathname.includes('users/')  &&
            <>
                <MenuTile 
                text={"Get All Users"}
                navigateRoute={"users/all"}
                cb={getUsers}
            />
            </>
        }
        { location.pathname.includes('admin/pets') && !location.pathname.includes('pets/') &&
            <>
                <MenuTile 
                text={"Add a pet"}
                navigateRoute={"pets/add"}
                />
                <MenuTile 
                cb={() => {
                    setSearchPetsResults([])}} 
                text={"Edit Pet"}
                navigateRoute={"pets/edit"}
                />
            </>
        }
        { location.pathname.includes('/pets/add') &&
            <PetForm 
                formType="add"
                />
        }       
        { location.pathname.includes('/pets/edit') &&
            <EditPetMenu/>
            // <PetForm 
            //     formType="edit"
            //     />
        }  
        { location.pathname.includes('/admin/users/all') &&
            <Box sx={{display:"flex",
            flexDirection:isDesktopOrLaptop? "row": "column",
            flexWrap:"wrap",padding:"1rem",gap:"1rem"}}>
                {allUsers.map((user) => {
                    return(
                        <UserInfoCard user={user}/>
                    )
                })}
            </Box>
        }      
        </>
    )
}

export default AdminMenu
