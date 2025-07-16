import React from 'react';
import './App.css';

import Guitars from "./components/Guitars.jsx";
import GuitarList from "./components/Guitars.jsx";
import GearList from  "./components/Home.jsx"

const App = () => {
  return (
    <div className="flex flex-col p-4 h-full w-full items-center justify-center">
      <header className="App-header">
        <h1>Gear Management App</h1>
      </header>
      <main>
        {/*<GuitarList />*/}
          <GearList />
      </main>
    </div>
  );
};

export default App;