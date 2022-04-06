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

  const { user, handleSavedPets, handleOwnedPets } = useUser();

  const startFetchingPets = () => {
    return setFetchingPets(true);
  };
  const finishFetchingPets = () => {
    return setFetchingPets(false);
  };

  const openPetPage = () => {
    setPetPageStatus(true);
  };

  const closePetPage = () => {
    setPetPageStatus(false);
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
      setSearchPetsResults(petsList);
      console.log("1");
    } catch (error) {
      console.log(error);
    }
  };

  const getSavedPets = async () => {
    try {
      const pets = await getUserSavedPets(user.token, user.id);
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
      console.log("pet added");
      return petsList;
    } catch (error) {
      console.log(error);
    }
  };

  const editPetInDb = async (
    user,
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
      console.log("0");
      setSearchPetsResults(petsList);
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

  const savedPetDelete = async (user, petId) => {
    try {
      const response = await deleteSavedPet(user.token, user.id, petId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const savePet = async (user, petId) => {
    try {
      const response = await saveAPet(user.token, user.id, petId);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const adoptPet = async (user, petId, adoptionType) => {
    try {
      const response = await adoptAPet(
        user.token,
        user.id,
        petId,
        adoptionType
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const returnPet = async (user, petId, adoptionType) => {
    try {
      const response = await returnAPet(
        user.token,
        user.id,
        petId,
        adoptionType
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

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
