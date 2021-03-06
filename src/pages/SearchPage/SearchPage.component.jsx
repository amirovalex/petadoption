import React from 'react'
import PetsList from '../../components/PetsList/PetsList.component.jsx';
import { Container, Typography } from '@mui/material';
import { usePet } from '../../context/PetContext';
import PetPage from '../../components/PetPage/PetPage.component';
import { useEffect } from 'react';
import useQuery from '../../hooks/useQuery';

const SearchPage = () => {
    const {searchPetsResults, selectedPet} = usePet();
    const query = useQuery()

    useEffect(() => {
        console.log(query.get("type"))
    },[])
    
    return (
        <Container sx={{
            paddingTop:8,
            height:searchPetsResults.length <= 0 ? "100%" : "auto",
            display:searchPetsResults.length <= 0 ? "flex" : "block",justifyContent:"center",alignItems:"center"}}>
            {searchPetsResults.length > 0 ?
            <>
                <PetsList 
                listType="petSearch" pets={searchPetsResults}/>
                <PetPage />
            </>
            :
            <Typography color="black">
                No pets found for your request.
            </Typography>
            }
        </Container>
    )
}

export default SearchPage
