import { Grid } from '@mui/material';
import UserForm from '../UserForm/UserForm'

const Dashboard = () => {
    return (
        <Grid container sx={{justifyContent: 'center'}}>
            <UserForm 
            formType="dashboard"/>
        </Grid>
    )
}

export default Dashboard
