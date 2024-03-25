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
import spotifylogo from './spotifylogo.png';
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
                  <img src={star1} id="starsvg9"/>
                  <img src={star2} id="starsvg10"/>
                  <img src={star1} id="starsvg11"/>
                  <img src={star2} id="starsvg12"/>
                  <img src={star1} id="starsvg13"/>
                  <img src={star2} id="starsvg14"/>
                  
                </div>
                <div className="homePageText">
                <h1>Horoscopify</h1>
                <h3>Recommended songs based off your favorite songs and zodiac sign.</h3>
                <Link to="/Authorize">
                    <button id = "Login-button">Log in with Spotify</button>
                </Link>
                </div>
                <div className="gradient-background">
                  <GradientBackground/>
                </div>
              </body>
              <footer className="app-footer">
                <p><a href="./">home</a><br/><br/>created by <a href = "https://ezacharias.com" target="_blank">Emily Zacharias</a> | &copy; 2024</p>
                <img className = "spotifylogo" src = {spotifylogo}></img>
              </footer>
            </div>
    );
}



export default HomePage;