import React from 'react';
import './App.css';

import Guitars from "./components/Guitars";
import GuitarList from "./components/Guitars";

const App = () => {
  return (
    <div className="flex flex-col p-4 w-full items-center justify-center">
      <header className="App-header">
        <h1>Guitar Management App</h1>
      </header>
      <main>
        <GuitarList />
      </main>
    </div>
  );
};

export default App;