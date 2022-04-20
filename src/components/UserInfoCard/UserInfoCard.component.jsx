import React from 'react'
import { Box ,Typography, Card, CardContent } from '@mui/material';

const UserInfoCard = ({user}) => {
  return (
    <Box sx={{boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",padding:"1rem",borderRadius:3}}>
    <Box 
        color="secondary"
        sx={{
        display: 'flex',
        flexDirection: 'column',
        padding:"1rem",
        borderRadius:3,
        color:"secondary",
        boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",background: "linear-gradient(225deg, rgba(81,95,102,1) 0%, rgba(159,166,169,0.5) 50%, rgba(216,218,218,1) 88%, rgba(216,218,218,1) 100%)",}}>
        <Typography ><span className='bold'>Email: </span>{user.email}</Typography>
        <Typography><span className='bold'>Full Name: </span>{user.firstName}{" "}{user.lastName}</Typography>
        <Typography><span className='bold'>Phone Number: </span>{user.phoneNumber ?user.phoneNumber : "No number" }</Typography>
        <Typography><span className='bold'>Created Date: </span>{user.createdDate}</Typography>
    </Box>
    </Box>
  )
}

export default UserInfoCard