import { useState, useEffect } from 'react';
import {Grid,DialogActions,TextField,Button,DialogContent, NativeSelect, FormControl, InputLabel, Select} from '@mui/material/';

import { useUser } from '../../context/UserContext';
import { usePet } from '../../context/PetContext';

const PetForm = (props) =>  {
  const {callback, pet, formType , setFormType} = props
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petHeight, setPetHeight] = useState("");
  const [petImage, setPetImage] = useState("");
  const [petBio, setPetBio] = useState("");
  const [petHypoallergenic, setPetHypoallergenic] = useState("0")
  const [petDietaryRestrictions, setPetDietaryRestrictions] = useState("")

  useEffect(() => {
    if (formType === "edit") { 
    setPetName(pet.name)
    setPetType(pet.type)
    setPetBreed(pet.breed)
    setPetWeight(pet.weight)
    setPetColor(pet.color)
    setPetHeight(pet.height)
    setPetBio(pet.bio)
    setPetHypoallergenic(pet.hypoallergenic)
    setPetDietaryRestrictions(pet.dietaryRestrictions)
    }
  },[])
//   const clearFields = () => {
//     setFormType("login");
//     setEmailForm("");
//     setPasswordForm("");
//     setRepasswordForm("");
//     setPhoneForm("");
//     setFirstnameForm("");
//     setLastnameForm("");
//   }

  const { addPetToDb, searchPets, editPetInDb, selectPet } = usePet()

  const { petSearchValues } = useUser()
  
  const handlePetName = (value) => {
    setPetName(value);
  };

  const handlePetColor = (value) => {
    setPetColor(value);
  };

  const handlePetType = (value) => {
    setPetType(value);
  };

  const handlePetBreed = (value) => {
    setPetBreed(value);
  };

  const handlePetHeight= (value) => {
    setPetHeight(value);
  };

  const handlePetWeight= (value) => {
    setPetWeight(value);
  };

  const handlePetImage = (value) => {
    setPetImage(value);
  };

  const handlePetBio = (value) => {
    setPetBio(value);
  };

  const handlePetHypoallergenic = (value) => {
    setPetHypoallergenic(value);
  };

  const handlePetDietaryRestrictions = (value) => {
    setPetDietaryRestrictions(value);
  };

   const handlePetFormCallback = () => {
    switch (formType) { 
    case "add":
      addPetToDb( 
        petType,
        petName,
        petImage,
        petWeight,
        petHeight,
        petColor,
        petBio,
        petHypoallergenic,
        petDietaryRestrictions,
        petBreed)
      break;
    case "edit":
        editPetInDb(
        pet.id,  
        petType,
        petName,
        petImage,
        petWeight,
        petHeight,
        petColor,
        petBio,
        petHypoallergenic,
        petDietaryRestrictions,
        petBreed)
        selectPet(null)
        break;
    default:
      break; 
  }
  }

  return (
    <div>
        <DialogContent >
            <Grid gap={1} container columnSpacing={{ xs: 1, sm: 2}} sx={{justifyContent:"space-evenly"}}>
            <Grid item xs={12} sm={5}  >
            <TextField
                autoFocus
                margin="dense"
                id="type"
                label="Pet Type"
                type="text"
                fullWidth
                variant="standard"
                value={petType}
                color="secondary"
                onChange={(e) => handlePetType(e.target.value)}
            />
            </Grid>
            <Grid item xs={12} sm={5}>
            <TextField
                margin="dense"
                id="name"
                label="Pet Name"
                type="text"
                fullWidth
                variant="standard"
                value={petName}
                color="secondary"
                onChange={(e) => handlePetName(e.target.value)}
            />
            </Grid>
            <Grid xs={12} sm={5} item>
                <TextField
                    margin="dense"
                    id="breed"
                    label="Pet Breed"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={petBreed}
                    color="secondary"
                    onChange={(e) => handlePetBreed(e.target.value)}
                />
            </Grid>
            <Grid xs={12} sm={5} item>
                <TextField
                    margin="dense"
                    id="weight"
                    label="Pet Weight(kg)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={petWeight}
                    color="secondary"
                    onChange={(e) => handlePetWeight(e.target.value)}
                />
            </Grid>
            <Grid xs={12} sm={5} item>
                <TextField
                    margin="dense"
                    id="height"
                    label="Pet Height(cm)"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={petHeight}
                    color="secondary"
                    onChange={(e) => handlePetHeight(e.target.value)}
                />
            </Grid>
            <Grid xs={12} sm={5} item>
                <TextField
                    margin="dense"
                    id="bio"
                    label="Pet Bio"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={petBio}
                    color="secondary"
                    onChange={(e) => handlePetBio(e.target.value)}
                />
            </Grid>
            <Grid xs={12} sm={5} item>
                <TextField
                    margin="dense"
                    id="dietaryRestrictions"
                    label="Dietary Restrictions"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={petDietaryRestrictions}
                    color="secondary"
                    onChange={(e) => handlePetDietaryRestrictions(e.target.value)}
                />
            </Grid>
                <Grid xs={12} sm={5} item>
                    <FormControl fullWidth>
                        <InputLabel color="secondary" variant="standard" htmlFor="uncontrolled-native">
                            Hypoallergenic
                        </InputLabel>
                        <NativeSelect
                            onChange={(e) => handlePetHypoallergenic(e.target.value)}
                            color="secondary"
                            value={petHypoallergenic}
                            inputProps={{
                            name: 'hypoallergenic',
                            id: 'uncontrolled-native',
                            }}
                        >
                        <>
                            <option color="secondary" value={"0"}>No</option>
                            <option color="secondary" value={"1"}>Yes</option>
                        </>                         
                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid xs={12} sm={5} item>
                    <FormControl fullWidth>
                        <InputLabel color="secondary" variant="standard" htmlFor="uncontrolled-native">
                            Color
                        </InputLabel>
                        <NativeSelect
                            onChange={(e) => handlePetColor(e.target.value)}
                            color="secondary"
                            value={petColor}
                            inputProps={{
                            name: 'color',
                            id: 'uncontrolled-native',
                            }}
                        >
                        <>
                            <option color="secondary" value={"red"}>Red</option>
                            <option color="secondary" value={"gray"}>Gray</option>
                            <option color="secondary" value={"brown"}>Brown</option>
                            <option color="secondary" value={"black"}>Black</option>
                            <option color="secondary" value={"white"}>White</option>
                            <option color="secondary" value={"multicolor"}>Multi-Color</option>
                        </>                         
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent:"center"}}>
                <Button 
                onClick={() => 
                  handlePetFormCallback()}
                color="secondary" variant="contained">
                { formType === "edit" ? "Save" : "Add" }
                </Button>
            </DialogActions>
    </div>
  );
}

export default PetForm;