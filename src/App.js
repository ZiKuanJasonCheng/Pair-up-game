import logo from './logo.svg';
import './App.css';
import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom";
import Game from './Game/Game'
import Game2 from './Game/Game2'
import Home from './Home'
import { Component } from 'react';

function App () {
  // let navigate = useNavigate(); 

  // const navigateToGamePage = () => { 
  //   navigate("/game");
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game num_grids="2"/>} />
          <Route path="/game2" element={<Game2 />} />
          
        </Routes>
      </header>
    </div>
  );
  
}

export default App;
