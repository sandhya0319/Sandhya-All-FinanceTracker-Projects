import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import {ProtectedRoutes,UnprotectedRoutes} from "./Services/ProtectedRoutes";
import Register from './pages/Authentication/Components/Register';
import Login from './pages/Authentication/Components/Login';
import FinanceForm from './pages/transactions/components/FinanceForm';
import ViewFinanceData from './pages/transactions/components/ViewFinanceData';
import { ErrorBoundary } from 'react-error-boundary';
import ViewSingleData from './pages/transactions/components/ViewSingleData';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Finance Tracker</h1>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <BrowserRouter>
        <Routes>
          <Route element={<UnprotectedRoutes />}>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

 
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="form" element={<FinanceForm />} />
            <Route path="/form/:id" element={<FinanceForm />} />
            <Route path="/viewdata" element={<ViewFinanceData />} />
            <Route path="/viewsingledata" element={<ViewSingleData />} />
          </Route>
        </Routes>
        
        </BrowserRouter>
        </ErrorBoundary>
    </div>
  );
}

export default App;
