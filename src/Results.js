import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Results() {
  return (
    <div className="Results">
      <header className="App-header">
        
      </header>
      <body className="App-body">
        <h1>Results</h1>
        <p>Top songs: <span id="topsongs"></span></p>
      </body>
      <footer>
        <p>created by Emily Zacharias | &copy; 2024 | about | policy</p>
      </footer>
    </div>
  );
}

export default Results;
