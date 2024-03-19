import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { results } from './ChooseZodiac'

function Results() {

  return (
    <div className="Results">
      <header className="App-header">
        
      </header>
      <body className="App-body">
        <h1>Results</h1>
        <p>Top songs: <span id="topsongs"></span></p>
        <p>{results}</p>
      </body>
      <footer>
        <p>created by my name | &copy; 2024 | about | policy</p>
      </footer>
    </div>
  );
}

export default Results;
