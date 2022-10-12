import React from "react";
import "./App.css";
import Header from "./src/header";
import Swap from "./src/swap";
import Foolter from "./src/ButtonBar";
import Farm from "./src/Farms";
import Pool from "./src/pool";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (

        <><Header />
           <BrowserRouter>
           <Routes>
           <Route path="/Swap" element={<Swap/>} />
            <Route path="/Farms" element={<Farm/>} />
            <Route path="/Pools" element={<Pool/>} />
            <Route
        path="*"
        element={<Navigate to="/Swap" replace />}
    />
           </Routes>
           </BrowserRouter>
        
        
        <Foolter /></>
  );
}

export default App;
