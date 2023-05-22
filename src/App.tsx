import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
//import {ProtectedRoutes,UnprotectedRoutes} from "./Services/ProtectedRoutes";
import Register from './pages/Authentication/Components/Register';
import Login from './pages/Authentication/Components/Login';

const App:React.FC=()=>{
  return (
    <div className="App">
     <h1>hello</h1>
     <BrowserRouter>
        <Routes>
          {/* <Route element={<UnprotectedRoutes />}> */}
            {/* <Route path="/" element={<Register />} /> */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/register" element={<Register />} />
          {/* </Route> */}
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
