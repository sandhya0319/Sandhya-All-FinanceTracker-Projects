import "./App.css";
import { Routes, Route } from "react-router-dom";
import FinanceForm from "./pages/transactions/components/FinanceForm";
import ViewFinanceData from "./pages/transactions/components/ViewFinanceData";
import ViewSingleData from "./pages/transactions/components/ViewSingleData";
import { BrowserRouter } from 'react-router-dom';
import LoginPage from "./pages/Authentication/components/LoginPage";
import RegisterPage from "./pages/Authentication/components/RegisterPage";
import {ProtectedRoutes,UnprotectedRoutes} from "./Services/ProtectedRoutes";
//import { Transactioncontext } from "./pages/contexts/Transactioncontext";

function App() {
  return (
    <div className="App">
      <div className="head">
        <h1>Finance Tracker</h1>
      </div>
     
        <BrowserRouter>
        <Routes>
          <Route element={<UnprotectedRoutes />}>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

 
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="form" element={<FinanceForm />} />
            <Route path="/form/:id" element={<FinanceForm />} />
            <Route path="/viewdata" element={<ViewFinanceData />} />
            <Route path="/viewsingledata" element={<ViewSingleData />} />
          </Route>
        </Routes>
        
        </BrowserRouter>
      
  
  </div>
  );
}

export default App;
