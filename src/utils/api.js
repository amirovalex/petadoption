import axios from "axios";
import React from "react";

const loginUser = async (email, password) => {
  try {
    const response = await axios.get(process.env.REACT_APP_SERVER_LINK);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export { loginUser };
