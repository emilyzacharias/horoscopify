import React from 'react';
import logo from './logo.svg';
import scorpio from './SVG/Scorpio.svg';
import sag from './SVG/Sagittarius.svg';
import taur from './SVG/Taurus.svg';
import aries from './SVG/Aries.svg';
import star1 from './SVG/star1.svg';
import star2 from './SVG/star2.svg';
import circle1 from './SVG/circle1.svg';
import circle2 from './SVG/circle2.svg';
import circle3 from './SVG/circle3.svg';
import circle4 from './SVG/circle4.svg';
import noise from './SVG/Noise.svg';
import './App.css';
import { Link } from 'react-router-dom';
import GradientBackground from './GradientBackground';

function HomePage() {
    return (
            <div className="App">
              <header className="App-header">
              </header>
              <body className="App-body">
                <div className="background-stars">
                  <img src={scorpio} id="scorpiosvg"/>
                  <img src={sag} id="sagsvg"/>
                  <img src={taur} id="taursvg"/>
                  <img src={aries} id="ariessvg"/>
                  <img src={star1} id="starsvg1"/>
                  <img src={star2} id="starsvg2"/>
                  <img src={star1} id="starsvg3"/>
                  <img src={star2} id="starsvg4"/>
                  <img src={star1} id="starsvg5"/>
                  <img src={star2} id="starsvg6"/>
                  <img src={star1} id="starsvg7"/>
                  <img src={star2} id="starsvg8"/>
                  
                </div>
                <div className="homePageText">
                <h1>Horoscopify</h1>
                <h3>Generate your horoscope playlist based off your sign and listening habits.</h3>
                <Link to="/ChooseZodiac">
                    <button id = "Login-button">Log in with Spotify</button>
                </Link>
                </div>
                <div className="gradient-background">
                  <GradientBackground/>
                </div>
              </body>
              <footer className="app-footer">
                <p>created by Emily Zacharias | &copy; 2024 | about | policy</p>
              </footer>
            </div>
    );
}



export default HomePage;