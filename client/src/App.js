import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import SideNav from './components/navbar';
import Header from './components/header';
import Home from './pages/home';
import AddDetails from './pages/add_person';
import DescriptionPage from './pages/description';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <Router> 
      <div className="App"> 
        <Header />
        <SideNav isAdmin={isAdmin}/>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add_details" element={<AddDetails />} />
          <Route path="/description" element={<DescriptionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
