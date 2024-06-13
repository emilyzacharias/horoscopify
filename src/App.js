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
import ResultsImage from './ResultsImage';



function App() {
  return (
    
      <UserZodiacProvider>
        <Router basename={'/'}>
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ChooseZodiac" element={<ChooseZodiac />} />
                <Route path="/Results" element={<Results />} />
                <Route path="/Authorize" element={<Authorize />} />
                <Route path="/Loginfail" element={<LoginFail />} />
                <Route path="/ResultsImage" element={<ResultsImage />} />
            </Routes>
            </ErrorBoundary>
        </Router>
      </UserZodiacProvider>
   
  );
}

export default App;
