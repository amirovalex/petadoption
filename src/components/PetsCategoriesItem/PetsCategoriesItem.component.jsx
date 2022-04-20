import React from 'react'
import Box from "@mui/material/Box"
import {usePet} from '../../context/PetContext';
import {useUser} from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const PetsCategoriesItem = ({logo}) => {

    const {searchPets} = usePet()
    const {user,openModal} = useUser()
    const navigate = useNavigate()

    console.log(typeof logo)
    const [logoText,setLogoText] = React.useState("")
    const logoTextVariants = ["cat","mouse","dog","lizard","chameleon","rabbit","snake","fish","parrot","turtle"]

    const handleLogoText = () => {
        logoTextVariants.map((type) => {
            if(logo.includes(type)) {
                let newType = type.charAt(0).toUpperCase() + type.slice(1) + "s"
                if(newType === "Fishs") {
                  newType = "Fishes"
                }
                setLogoText(newType)
            }
        })
    }

    const handleSearch = () => {
        let editedType = logoText.charAt(0).toLowerCase() + logoText.slice(1,logoText.length - 1)
        if(editedType === "fishe") {
            editedType = "fish"
        }
        searchPets(user, editedType);
        navigate(`/search?type=${editedType}`);
    }

    React.useEffect(() => {
        handleLogoText()
    },[])
  return (
    <Box sx={{display: 'flex',flexDirection:"column" ,alignItems:"center",'&:hover':{
      filter:"brightness(0.5) sepia(1) hue-rotate(162deg) saturate(0.6) contrast(2)",
      cursor:"pointer"
    }}}
    onClick={() => user ? handleSearch() : openModal()}
    >
    <img height="100px" src={logo} alt="Pet Logo"/>
    <span className="bold" color="black">{logoText}</span>
    </Box>
  )
}

export default PetsCategoriesItem