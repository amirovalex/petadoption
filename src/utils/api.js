import axios from "axios";
import { decodeToken } from "./utils.js";

const getUserById = async (token, id) => {
  try {
    console.log(token, id);
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/user/login`,
      { email, password }
    );
    const decodedToken = decodeToken(response.data.token);
    const user = await getUserById(response.data.token, decodedToken.id);
    console.log("user", user, "response data", response.data);
    user.token = response.data.token;
    return user;
  } catch (error) {
    console.error(error);
  }
};

const registerUser = async (
  email,
  password,
  repassword,
  firstName,
  lastName,
  phone
) => {
  try {
    console.log(typeof phone);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/user/signup`,
      { email, password, repassword, firstName, lastName, phone, admin: "0" }
    );
    const decodedToken = decodeToken(response.data.token);
    const user = await getUserById(response.data.token, decodedToken.id);
    return user;
  } catch (error) {
    console.error(error);
  }
};

const getPetByCriteria = async (token, pet) => {
  try {
    console.log(token);
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pet?type=${pet.type}${
        pet.adoptionStatus ? `adoptionStatus=${pet.adoptionStatus}` : ""
      }${pet.minHeight ? `minHeight=${pet.minHeight}` : ""} ${
        pet.maxHeight ? `maxHeight=${pet.maxHeight}` : ""
      } ${pet.minWeight ? `minWeight=${pet.minWeight}` : ""} ${
        pet.maxWeight ? `maxWeight=${pet.maxWeight}` : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const addPet = async (
  token,
  type,
  name,
  picture,
  weight,
  height,
  color,
  bio,
  hypoallergenic,
  dietaryRestrictions,
  breed
) => {
  try {
    console.log(token);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/pet`,
      {
        name,
        color,
        bio,
        dietaryRestrictions,
        breed,
        type,
        picture,
        hypoallergenic,
        weight,
        height,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const pet = response.data;
    return pet;
  } catch (error) {
    console.error(error);
  }
};

const editPetById = async (
  token,
  id,
  type,
  name,
  picture,
  weight,
  height,
  color,
  bio,
  hypoallergenic,
  dietaryRestrictions,
  breed
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/pet/${id}`,
      {
        type,
        name,
        picture,
        weight,
        height,
        color,
        bio,
        hypoallergenic,
        dietaryRestrictions,
        breed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const pet = response.data;
    return pet;
  } catch (error) {
    console.error(error);
  }
};

const editUserById = async (
  token,
  id,
  firstName,
  lastName,
  phone,
  password,
  repassword,
  email
) => {
  try {
    const editObject = {
      firstName,
      lastName,
      phone,
      email,
    };
    if (password.length || repassword.length > 0) {
      editObject.password = password;
      editObject.repassword = repassword;
    }
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_LINK}/user/${id}`,
      editObject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const pet = response.data;
    return pet;
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (token) => {
  try {
    console.log("token", token);
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPetsByUserId = async (token, id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pet/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPetById = async (token, petId) => {
  try {
    console.log(token, petId);
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pet/${petId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserSavedPets = async (token, userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_LINK}/pet/saved/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteSavedPet = async (token, userId, petId) => {
  try {
    console.log(token, petId);
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_LINK}/pet/${petId}/save`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const saveAPet = async (token, userId, petId) => {
  try {
    console.log(token, petId);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/pet/${petId}/save`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const adoptAPet = async (token, userId, petId, adoptionType) => {
  try {
    console.log(token, petId);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/pet/${petId}/adopt`,
      { userId, adoptionType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const returnAPet = async (token, userId, petId, adoptionType) => {
  try {
    console.log(token, petId);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_LINK}/pet/${petId}/return`,
      { userId, adoptionType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

/*
get pets by criteria - http://localhost:7070/pet?type=cat&minHeight=10 done

get user by id - http://localhost:7070/user/id done

post add pet - http://localhost:7070/pet done

put edit pet by id - http://localhost:7070/pet/id done

get all users - http://localhost:7070/user done

put update user - http://localhost:7070/user/id done

get pets by user id - http://localhost:7070/pet/user/id done

get pet by id - http://localhost:7070/pet/id done

delete saved pet - http://localhost:7070/pet/id/save done 

post save pet - http://localhost:7070/pet/id/save done

post adopt pet  - http://localhost:7070/pet/id/adopt done

post return pet  - http://localhost:7070/pet/id/return done


*/

export {
  loginUser,
  registerUser,
  getUserById,
  getPetByCriteria,
  addPet,
  editPetById,
  editUserById,
  getAllUsers,
  getPetsByUserId,
  getPetById,
  deleteSavedPet,
  saveAPet,
  adoptAPet,
  returnAPet,
  getUserSavedPets,
};
