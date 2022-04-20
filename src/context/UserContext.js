import { createContext } from "react";
import React, { useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getUserById,
  editUserById,
  getAllUsers,
} from "../utils/api";
import { useCookies } from "react-cookie";
export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [fetchingUser, setFetchingUser] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [savedPets, setSavedPets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [petSearchValues, setPetSearchValues] = useState({});
  // const [lastUserSearch, setLastUserSearch] = useState({});

  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const startFetchingUser = () => {
    return setFetchingUser(true);
  };

  const finishFetchingUser = () => {
    return setLoading(true);
  };

  const handleSavedPets = (pets) => {
    setSavedPets(pets);
  };

  const handleOwnedPets = (pets) => {
    setOwnedPets(pets);
  };

  // const handleLastUserSearch = (searchObj) => {
  //   setLastUserSearch((prevState) => searchObj);
  // };

  const login = async (cb, email, password) => {
    try {
      startFetchingUser();
      const user = await loginUser(email, password);

      if (cb) {
        cb();
      }
      if (user) {
        console.log(user);
        setUser(user);
        setCookie("Token", user.token, { path: "/" });
        setCookie("Email", email, { path: "/" });
        setCookie("Password", password, { path: "/" });
        console.log(cb, email, password);
        console.log("1");
      }
    } catch (error) {
      console.log(error);
    } finally {
      finishFetchingUser();
    }
  };

  const signup = async (
    cb,
    email,
    password,
    repassword,
    firstname,
    lastname,
    phone
  ) => {
    try {
      startFetchingUser();
      const user = await registerUser(
        email,
        password,
        repassword,
        firstname,
        lastname,
        phone
      );
      if (user) {
        setCookie("Token", user.token, { path: "/" });
        setCookie("Email", email, { path: "/" });
        setCookie("Password", password, { path: "/" });
      }
      cb();
    } catch (error) {
      console.log(error);
    } finally {
      finishFetchingUser();
    }
  };

  const logout = async () => {
    removeCookie("Token");
    removeCookie("Email");
    removeCookie("Password");
    setUser(null);
  };

  const getByIdUser = async (user, id) => {
    try {
      console.log("getting user after update");
      const response = await getUserById(user.token, id);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (
    id,
    firstName,
    lastName,
    phone,
    password,
    repassword,
    email
  ) => {
    try {
      const response = await editUserById(
        user.token,
        id,
        firstName,
        lastName,
        phone,
        password,
        repassword,
        email
      );
      console.log(response);
      if (response) {
        console.log("updateLocalUser");
        const updatedUser = { ...user };
        updatedUser.firstName = firstName;
        updatedUser.lastName = lastName;
        updatedUser.phone = phone;
        updatedUser.email = email;
        setUser(updatedUser);
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  //working
  const getUsers = async (user) => {
    try {
      console.log("useeeer", user);
      const response = await getAllUsers(user.token);
      setAllUsers(response.data);
      return allUsers;
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

  useEffect(() => {
    console.log(user);
  }, [user]);

  const value = {
    cookies,
    user,
    login,
    signup,
    logout,
    isOpenModal,
    openModal,
    closeModal,
    editUser,
    getUsers,
    allUsers,
    getByIdUser,
    setSavedPets,
    setOwnedPets,
    handleSavedPets,
    handleOwnedPets,
    savedPets,
    ownedPets,
    setPetSearchValues,
    petSearchValues,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
