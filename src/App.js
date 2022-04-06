import "./App.css";
import Navbar from "./components/Navbar/Navbar.component";
import HomePage from "./pages/HomePage/HomePage.component";
import ProfilePage from "./pages/ProfilePage/ProfilePage.component";
import { Routes, Route } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.component";
import SearchPage from "./pages/SearchPage/SearchPage.component";
const App = () => {
  const { cookies, login } = useUser();

  useEffect(() => {
    console.log(cookies);
    if (cookies.Email && cookies.Password)
      login(null, cookies.Email, cookies.Password);
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/user/*"
          element={
            <PrivateRoute redirectTo={"/"}>
              <ProfilePage />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
