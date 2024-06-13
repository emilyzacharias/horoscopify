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
import ParticlesApp from './particles'
import ParticlesApp2 from './particlescopy'


function HomePage() {
    
    return (
            <div className="App">
              
                 
              <header className="App-header">
              </header>
             
              <body className="App-body background-gradient">
              <div className = ""></div>
               <div className="homePageText">
                <h1>Horoscopify</h1>
                <h3>Recommended songs based off your favorite tracks and zodiac sign.</h3>
                <Link to="/Authorize">
                    <button id = "Login-button">Log in with Spotify</button>
                </Link>
                </div>
                <div className="gradient-background">
                </div>
          
                
                <ParticlesApp/>
                

                <div className="About-footer">
                  <img className = "spotifylogo" src = {spotifylogo}></img>
                  <p>Created by Emily Zacharias | &copy; 2024</p>
                </div>
              </body>
            </div>
    );
    
}



export default HomePage;