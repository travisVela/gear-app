import React, {useEffect, useState} from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import {Toaster} from "react-hot-toast";
import {api} from "./api";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx"
import ProfilePage from "./pages/ProfilePage.jsx";
import Navbar from "./components/Navbar.jsx";



const App = () => {
    const {checkAuth} = api()
    const token = localStorage.getItem('jwt')
    const [authUser, setAuthUser] = useState()
    useEffect(() => {
        checkAuth()

        setAuthUser(token)

    }, []);

  return (
      <div>
          <Navbar/>
          <Routes>
            <Route
                path={"/"}
                element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
            />
              <Route
                path={"/login"}
                element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
              />
              <Route
                path={"/signup"}
                element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
              />
              <Route
                path={"/profile"}
                element={authUser ? <ProfilePage /> : <Navigate to={"/login"}/>}

              />


        </Routes>
          <Toaster></Toaster>
      </div>
  );
};

export default App;