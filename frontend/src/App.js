import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Toaster } from 'react-hot-toast';

import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import EmployeeList from './components/EmployeeList/EmployeeList';
import UpdateEmp from './components/UpdateEmp/UpdateEmp';
import Employee from './components/Employee/Employee';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/employee" element={<ProtectedRoute><Employee /></ProtectedRoute>} />
          <Route path="/employeelist" element={<ProtectedRoute> <EmployeeList /></ProtectedRoute>} />
          <Route path="/updateemp/:_id" element={<ProtectedRoute><UpdateEmp /></ProtectedRoute>} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
