import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ChooseZodiac from './ChooseZodiac';
import Results from './Results';
import Authorize from './Authorize';
import LoginFail from './Loginfail';
import { UserZodiacProvider } from './UserZodiacContext';
import ErrorBoundary from './ErrorBoundary';



function App() {
  return (
    
      <UserZodiacProvider>
        <Router>
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ChooseZodiac" element={<ChooseZodiac />} />
                <Route path="/Results" element={<Results />} />
                <Route path="/Authorize" element={<Authorize />} />
                <Route path="/Loginfail" element={<LoginFail />} />
            </Routes>
            </ErrorBoundary>
        </Router>
      </UserZodiacProvider>
   
  );
}

export default App;
