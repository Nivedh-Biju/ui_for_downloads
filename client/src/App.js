import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import SideNav from './components/navbar';
import Header from './components/header';
import Home from './pages/home';
import AddDetails from './pages/add_person';
import DescriptionPage from './pages/description';
import AdminEditFiles from './pages/admin_edit_files';
import EditFileComponent from './pages/admin_edit_file_id';

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
          <Route path="/edit_files" element={<AdminEditFiles />} />
          <Route path="/edit_file" element={<EditFileComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
