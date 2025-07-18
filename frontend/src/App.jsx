import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import GearList from "./pages/Home.jsx"
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import {Toaster} from "react-hot-toast";


const App = () => {
  return (
      <div className={"flex w-full items-center justify-center"}>
          <Routes>
            <Route
                path={"/"}
                element=<Home />
            />
              <Route
                path={"/login"}
                element={<LoginPage />}
              />
              <Route
                path={"/signup"}
                element={<SignupPage />}
              />

        </Routes>
          <Toaster></Toaster>
      </div>

    // <div className="flex flex-col p-4 h-full w-full items-center justify-center">
    //   <header className="App-header">
    //     <h1>Gear Management App</h1>
    //   </header>
    //   <main>
    //     {/*<GuitarList />*/}
    //       <GearList />
    //   </main>
    // </div>
  );
};

export default App;