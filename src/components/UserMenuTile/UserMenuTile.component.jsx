import {Typography,CardContent,Card,Grid} from '@mui/material'

const UserMenuTile = (props) => {
    const { user } = props

    return (
    <Card sx={{display:"flex",borderRadius:3,
    backgroundColor: "rgba(81, 95, 102,0.7)"
     }}>
        <CardContent >
            <Grid container spacing={2}>
                <Grid xs={12} sm={4} item>
                    <Typography
                    color="#fff">
                        {`${user.firstName} ${user.lastName}`}
                    </Typography>
                </Grid>
                <Grid xs={12} sm={4} item>
                    <Typography
                    color="#fff">
                        {user.email}
                    </Typography>
                </Grid>
                <Grid xs={12} sm={4} item>
                    <Typography
                    color="#fff">
                        {user.phone}
                    </Typography>
                </Grid>
            </Grid>
        </CardContent>        
    </Card> 
    )
}

export default UserMenuTile
