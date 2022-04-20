import React from 'react'
import PetsCategoriesItem from '../PetsCategoriesItem/PetsCategoriesItem.component';
import { Box } from "@mui/material";
import cat from '../../assets/petIcons/cat.svg'
import dog from '../../assets/petIcons/dog.svg'
import chameleon from '../../assets/petIcons/chameleon.svg'
import fish from '../../assets/petIcons/fish2.svg'
import lizard from '../../assets/petIcons/lizard.svg'
import mouse from '../../assets/petIcons/mouse.svg'
import snake from '../../assets/petIcons/snake.svg'
import parrot from '../../assets/petIcons/parrot.svg'
import turtle from '../../assets/petIcons/turtle.svg'
import rabbit from '../../assets/petIcons/rabbit.svg'

const PetsCategoriesList = () => {

  const petsArray = [cat,dog,chameleon,fish,lizard,mouse,parrot,snake,turtle,rabbit]
  return (
    <Box sx={{display:'flex',width: '100%',justifyContent: 'space-evenly', gap:"1rem",flexWrap:"wrap"}}>
      {petsArray.map((petLogo,index) => {
        return <PetsCategoriesItem 
        key={index} logo={petLogo}/>
      })}
    </Box>
  )
}

export default PetsCategoriesList