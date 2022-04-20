import React from 'react'
import { Container } from '@mui/material';

const HomePageContainer = ({children,justifySelf,alignSelf,marginBottom,flex,maxWidth,height,gridColumn,background,gridRowStart}) => {
  console.log()
  return (
    <Container sx={{
        justifySelf:justifySelf,
        alignSelf:alignSelf,
        marginBottom:marginBottom,
        flex:flex,
        height:height,
        gridColumn:gridColumn,
        boxShadow:"1px 1px 6px 2px rgb(0 0 0 / 15%)",
        maxWidth:maxWidth,
        flexWrap:"nowrap",
        gap:"1rem",
        background:background ? background : "rgba(234, 234, 234)",
        borderRadius:3,
        padding:2,
        gridRowStart:gridRowStart,
        display: 'flex', flexDirection: 'column',alignItems: 'center',justifyContent: 'center'}}>{children}</Container>
  )
}

export default HomePageContainer