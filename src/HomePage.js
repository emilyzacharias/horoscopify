import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
            <div className="App">
              <header className="App-header">
              </header>
              <body className="App-body">
                <h1>Scopify</h1>
                <h3>Generate your horoscope playlist based off your sign and listening habits.</h3>
                <Link to="/Authorize">
                    <button>Log in with Spotify</button>
                </Link>
              </body>
              <footer>
                <p>created by Emily Zacharias | &copy; 2024 | about | policy</p>
              </footer>
            </div>
    );
}



export default HomePage;