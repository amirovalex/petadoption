import { Grid } from '@mui/material';
import UserForm from '../UserForm/UserForm'

const Dashboard = () => {
    return (
        <Grid container>
            <UserForm 
            formType="dashboard"/>
        </Grid>
    )
}

export default Dashboard
