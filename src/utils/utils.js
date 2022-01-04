import jwt from "jsonwebtoken";
const config = process.env;

const decodeToken = (tokenBearer) => {
  const token = tokenBearer.replace("Bearer ", "");
  const decoded = jwt.verify(token, config.REACT_APP_USER_TOKEN);
  return decoded;
};

export { decodeToken };
