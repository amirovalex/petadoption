import React from 'react'
import {Container} from "@mui/material";
import SearchBar from '../../SearchBar/SearchBar.component';
import PetsList from '../../PetsList/PetsList.component';
import { usePet } from '../../../context/PetContext';
import { useEffect } from 'react';
import PetForm from '../../PetForm/PetForm.component';

const EditPetMenu = () => {
    const {searchPetsResults, setSearchPetsResults, selectedPet} = usePet();

    // useEffect(() => {
    //     searchPetsResults.length > 0 && setSearchPetsResults([])
    // },[])

    return (
        <Container sx={{display: 'flex', flexDirection:
        "column",justifyContent: 'center',alignItems:"center"
        }}>
            <SearchBar searchType="petEdit"/>
            {
                selectedPet ? 
                <PetForm 
                    pet={selectedPet}
                    formType="edit"/> :             
                <PetsList listType="petEdit" pets={searchPetsResults}/>
            }
        </Container>
    )
}

export default EditPetMenu