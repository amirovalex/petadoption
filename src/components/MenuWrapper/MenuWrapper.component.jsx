import React from 'react'
import { Grid } from "@mui/material";

const menuWrapper = WrappedComponent => {
    const Menu = (props) => {
        return (
            <Grid item container 
            {...props}>
                <WrappedComponent/>
            </Grid>
        )
    }
    return Menu
}

export default menuWrapper
