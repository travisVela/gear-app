import React, {useEffect} from 'react';
import './App.css';
import {Toaster} from "react-hot-toast";

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx"
import {api} from "./api";



const App = () => {
    const {authUser, checkAuth} = api()
    // console.log({"authUser": authUser})
    useEffect(() => {
        checkAuth()
    }, [checkAuth]);

  return (
      <div className={"flex w-full items-center justify-center"}>
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

        </Routes>
          <Toaster></Toaster>
      </div>
  );
};

export default App;