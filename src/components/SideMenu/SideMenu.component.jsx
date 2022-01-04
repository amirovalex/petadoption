import {Grid,Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import MenuTile from '../../components/MenuTile/MenuTile.component';

const SideMenu = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    return (
        <>  
            <MenuTile
                text={"Dashboard"}
                navigateRoute={"/user/dashboard"}
            />
            {user && user.admin === 1 &&  
                <MenuTile 
                    text={"Admin"}
                    navigateRoute={"/user/admin"}
                />
            } 
            <MenuTile 
                text={"Saved"}
                navigateRoute={"/user/saved"}
            /> 
        </>
    )
}

export default SideMenu
