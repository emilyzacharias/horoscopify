import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserZodiac } from './UserZodiacContext';
import GradientBackground from './GradientBackground';
import {profile} from './script';
import aquarius from './SVG/Aquarius.svg';
import aries from './SVG/Aries.svg';
import cancer from './SVG/Cancer.svg';
import capricorn from './SVG/Capricorn.svg';
import gemini from './SVG/Gemini.svg';
import leo from './SVG/Leo.svg';
import libra from './SVG/Libra.svg';
import pisces from './SVG/Pisces.svg';
import sagittarius from './SVG/Sagittarius.svg';
import taurus from './SVG/Taurus.svg';
import scorpio from './SVG/Scorpio.svg';
import virgo from './SVG/Virgo.svg';
import star1 from './SVG/star1.svg';
import star2 from './SVG/star2.svg';
import spotifylogo from './spotifylogo.png';
import ParticlesApp from './particles'

export var zodiac = "";

function ChooseZodiac() {

    const navigate = useNavigate();


    useEffect(() => {
        const timer = setTimeout(() => {
            if (profile == "false") {
                console.log("profile is false");
                navigate('/loginfail');
            }
        }, 0);
      
        // Clear the timer when the component unmounts or before the effect runs again
        return () => clearTimeout(timer);
      }, []);

    

    const [selectedZodiac, setSelectedZodiac] = useState(null);

    const handleZodiacClick = (zodiac) => {
        setSelectedZodiac(zodiac);
        setUserZodiac(selectedZodiac);

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };

    // State variable to hold the selected value from the dropdown
    const { userZodiac, setUserZodiac } = useUserZodiac();

    // Function to handle the click event of the continue button
    const handleContinueButtonClick = () => {
        //userZodiac = zodiac;
        setUserZodiac(selectedZodiac);

        console.log(selectedZodiac);
        console.log(userZodiac);
        

        zodiac = selectedZodiac;

        if (zodiac == null) {
            zodiac = "aries"
        }
        console.log('Selected zodiac:', selectedZodiac);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="ChooseZodiac">
        <header className="App-header">
            
        </header>
        <div className="App-body background-gradient">
            <h2>Select your sign</h2>
            <div className="zodiac-buttons">
                <button
                    className={selectedZodiac === 'aries' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('aries')}
                >
                    <img src={aries} className="cardSvg"/>
                    <h5>Aries</h5>
                    <p>Mar 21 - Apr 19</p>
    
                </button>
                <button
                    className={selectedZodiac === 'taurus' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('taurus')}
                >
                    <img src={taurus} className="cardSvg"/>
                    <h5>Taurus</h5>
                    <p>Apr 20 - May 20</p>
                </button>
                <button
                    className={selectedZodiac === 'gemini' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('gemini')}
                >
                    <img src={gemini} className="cardSvg"/>
                    <h5>Gemini</h5>
                    <p>May 21 - Jun 20</p>
                </button>
                <button
                    className={selectedZodiac === 'cancer' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('cancer')}
                >
                    <img src={cancer} className="cardSvg"/>
                    <h5>Cancer</h5>
                    <p>Jun 21 - Jul 22</p>
                </button>
                <button
                    className={selectedZodiac === 'leo' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('leo')}
                >
                    <img src={leo} className="cardSvg"/>
                    <h5>Leo</h5>
                    <p>Jul 23 - Aug 22</p>
                </button>
                <button
                    className={selectedZodiac === 'virgo' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('virgo')}
                >
                    <img src={virgo} className="cardSvg"/>
                    <h5>Virgo</h5>
                    <p>Aug 23 - Sep 22</p>
                </button>
                <button
                    className={selectedZodiac === 'libra' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('libra')}
                >
                    <img src={libra} className="cardSvg"/>
                    <h5>Libra</h5>
                    <p>Sep 23 - Oct 22</p>
                </button>
                <button
                    className={selectedZodiac === 'scorpio' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('scorpio')}
                >
                    <img src={scorpio} className="cardSvg"/>
                    <h5>Scorpio</h5>
                    <p>Oct 23 - Nov 21</p>
                </button>
                <button
                    className={selectedZodiac === 'sagittarius' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('sagittarius')}
                >
                    <img src={sagittarius} className="cardSvg"/>
                    <h5>Sagittarius</h5>
                    <p>Nov 22 - Dec 21</p>
                </button>
                <button
                    className={selectedZodiac === 'capricorn' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('capricorn')}
                >
                    <img src={capricorn} className="cardSvg"/>
                    <h5>Capricorn</h5>
                    <p>Dec 22 - Jan 19</p>
                </button>
                <button
                    className={selectedZodiac === 'aquarius' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('aquarius')}
                >
                    <img src={aquarius} className="cardSvg"/>
                    <h5>Aquarius</h5>
                    <p>Jan 20 - Feb 18</p>
                </button>
                <button
                    className={selectedZodiac === 'pisces' ? 'selected' : ''}
                    onClick={() => handleZodiacClick('pisces')}
                >
                    <img src={pisces} className="cardSvg"/>
                    <h5>Pisces</h5>
                    <p>Feb 19 - Mar 20</p>
                </button>
            </div>
            <div className='continuebutton'>
                <Link to="/results"><button id='Login-button' onClick={handleContinueButtonClick}>Continue</button></Link>
            </div>
            <ParticlesApp/>

                <div className="About-footer">
                  <img className = "spotifylogo" src = {spotifylogo}></img>
                  <p>Created by Emily Zacharias | &copy; 2024</p>
                </div>
        </div>
        
        </div>
      );

}

export default ChooseZodiac;
