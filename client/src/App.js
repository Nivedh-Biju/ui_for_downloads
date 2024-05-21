import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import SideNav from './components/navbar';
import Header from './components/header';
import Home from './pages/home';
import AddDetails from './pages/add_person';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Router> 
      <div className="App">
        <SideNav isAdmin={isAdmin}/> 
        <Header />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add_details" element={<AddDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
