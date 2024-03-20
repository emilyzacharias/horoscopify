import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { selectedZodiac, zodiac } from './ChooseZodiac'
import GradientBackground from './GradientBackground';

function Results() {

  return (
    <div className="Results">
      <header className="App-header">
        
      </header>
      <body className="App-body">
        <h2>Results</h2>
        <p>Recommended {zodiac} Songs: <span id="topsongs"></span></p>
        <div className="gradient-background">
            <GradientBackground/>
        </div>
      </body>
      <footer className='app-footer'>
        <p>created by Emily Zacharias | &copy; 2024 | about | policy</p>
    </footer>
    </div>
  );
}

export default Results;
