import { createContext } from "react";
import React, { useContext, useState, useEffect } from "react";
import {
  getPetByCriteria,
  addPet,
  editPetById,
  getPetsByUserId,
  getPetById,
  deleteSavedPet,
  saveAPet,
  adoptAPet,
  returnAPet,
  getUserSavedPets,
} from "../utils/api";
import { useUser } from "./UserContext";
export const PetContext = createContext();

export const usePet = () => {
  return useContext(PetContext);
};

export const PetProvider = ({ children }) => {
  const [fetchingPets, setFetchingPets] = useState(false);
  const [searchPetsResults, setSearchPetsResults] = useState([]);
  const [petPageStatus, setPetPageStatus] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [adoptedPet, setAdoptedPet] = useState(false);

  const {
    user,
    handleSavedPets,
    handleOwnedPets,
    petSearchValues,
    setSavedPets,
    savedPets,
  } = useUser();

  const startFetchingPets = () => {
    return setFetchingPets(true);
  };
  const finishFetchingPets = () => {
    return setFetchingPets(false);
  };

  const openPetPage = () => {
    setPetPageStatus(true);
  };

  const searchPetsAfterAdoption = () => {
    console.log("HHEHEHE");
    const {
      user,
      typeInput,
      nameInput,
      adoptionStatusInput,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
    } = petSearchValues;

    searchPets(
      user,
      typeInput,
      nameInput,
      adoptionStatusInput,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight
    );
  };

  const closePetPage = () => {
    setPetPageStatus(false);
    if (adoptedPet) {
      setAdoptedPet(false);
      searchPetsAfterAdoption();
    }
  };

  const selectPet = (pet) => {
    setSelectedPet(pet);
  };

  const searchPets = async (
    user,
    type,
    name,
    adoptionStatus,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight
  ) => {
    try {
      const pet = {
        type,
        name,
        adoptionStatus,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
      };
      const petsList = await getPetByCriteria(user.token, pet);
      console.log("0");
      console.log(petsList);
      setSearchPetsResults(petsList);
      console.log("1");
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedPets = async () => {
    try {
      const pets = await getUserSavedPets(user.token, user.id);
      console.log("fetched pets", pets);
      handleSavedPets(pets);
      return pets;
    } catch (error) {
      console.log(error);
    }
  };

  const addPetToDb = async (
    type,
    name,
    image,
    weight,
    height,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed
  ) => {
    try {
      console.log(user.token);
      const petsList = await addPet(
        user.token,
        type,
        name,
        image,
        weight,
        height,
        color,
        bio,
        hypoallergenic,
        dietaryRestrictions,
        breed
      );
      if (petsList) {
        searchPets(
          petSearchValues.user,
          petSearchValues.typeInput,
          petSearchValues.nameInput,
          petSearchValues.adoptionStatusInput,
          petSearchValues.minHeight,
          petSearchValues.maxHeight,
          petSearchValues.minWeight,
          petSearchValues.maxWeight
        );
      }
      console.log("pet added");
      return petsList;
    } catch (error) {
      console.log(error);
    }
  };

  const editPetInDb = async (
    id,
    type,
    name,
    image,
    weight,
    height,
    color,
    bio,
    hypoallergenic,
    dietaryRestrictions,
    breed
  ) => {
    try {
      console.log(
        user.token,
        id,
        type,
        name,
        image,
        weight,
        height,
        color,
        bio,
        hypoallergenic,
        dietaryRestrictions,
        breed
      );
      const petsList = await editPetById(
        user.token,
        id,
        type,
        name,
        image,
        weight,
        height,
        color,
        bio,
        hypoallergenic,
        dietaryRestrictions,
        breed
      );
      console.log(petsList);
      if (petsList.changedRows) {
        searchPets(
          petSearchValues.user,
          petSearchValues.typeInput,
          petSearchValues.nameInput,
          petSearchValues.adoptionStatusInput,
          petSearchValues.minHeight,
          petSearchValues.maxHeight,
          petSearchValues.minWeight,
          petSearchValues.maxWeight
        );
      }
      console.log("0");
      // setSearchPetsResults(petsList);
      console.log("1");
    } catch (error) {
      console.log(error);
    }
  };

  const getPetsByUser = async () => {
    try {
      const pets = await getPetsByUserId(user.token, user.id);
      handleOwnedPets(pets);
      return pets;
    } catch (error) {
      console.log(error);
    }
  };

  const getPet = async (user, petId) => {
    try {
      const response = await getPetById(user.token, petId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const savedPetDelete = async (user, pet) => {
    try {
      console.log(user);
      const response = await deleteSavedPet(user.token, user.id, pet.id);
      console.log(response);
      if (response) {
        setSavedPets((prevState) => {
          const filteredArr = prevState.filter(
            (filteredPet) => pet.id !== filteredPet.id
          );
          return filteredArr;
        });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const savePet = async (user, pet) => {
    try {
      const response = await saveAPet(user.token, user.id, pet.id);
      if (response) {
        setSavedPets((prevState) => [...prevState, pet]);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const adoptPet = async (user, petId, adoptionType) => {
    try {
      console.log("adopted");
      const response = await adoptAPet(
        user.token,
        user.id,
        petId,
        adoptionType
      );
      if (response) {
        setAdoptedPet(true);

        setSelectedPet((prevState) => {
          return { ...prevState, owner: user.id, adoptionStatus: adoptionType };
        });
        console.log(searchPetsResults);
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const returnPet = async (user, petId) => {
    try {
      console.log("return");
      const response = await returnAPet(user.token, user.id, petId);
      if (response) {
        setAdoptedPet(true);
        console.log(searchPetsResults);
        setSelectedPet((prevState) => {
          return { ...prevState, owner: null, adoptionStatus: null };
        });
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(savedPets);
  }, [savedPets]);

  useEffect(() => {
    getSavedPets();
  }, [user]);

  useEffect(() => {
    const init = async () => {
      //check token in cookies if yes get user by id and login
      //   const unsubscribe = await onAuthStateChanged(auth, async (user) => {
      //     console.log(user);
      //     if (user) {
      //       setUser(user);
      //       const unsubscribeUser = await getUserFromDatabase(user.uid);
      //     }
      //     setLoading(false);
      //   });
      //   return unsubscribe;
    };
    init();
  }, []);

  const value = {
    searchPets,
    searchPetsResults,
    setSearchPetsResults,
    addPetToDb,
    editPetInDb,
    getPetsByUser,
    getPet,
    savedPetDelete,
    savePet,
    adoptPet,
    returnPet,
    getSavedPets,
    openPetPage,
    closePetPage,
    petPageStatus,
    setPetPageStatus,
    selectPet,
    selectedPet,
  };

  return (
    <PetContext.Provider value={value}>
      {/* {!loading && children} */}
      {children}
    </PetContext.Provider>
  );
};
