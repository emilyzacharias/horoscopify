import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserZodiac } from './UserZodiacContext';
import { getRecommendations, ZodiacAudioFeatures } from './script.js'

export var results = "";
export var zodiac = "";



async function fetchRecommendedTracks(AudioFeature) {
    try {
        // Call the getRecommendations function and await its result
       const recommendedTracks = await getRecommendations(AudioFeature);
        //const recommendedTracks = ""
        // Log the result
        const recommendedTracksList = 
          recommendedTracks?.map(
            ({name, artists}) =>
              `${name} by ${artists.map(artist => artist.name).join(', ')}`
          );
        results = recommendedTracksList;
        console.log(recommendedTracksList);
        document.getElementById("topSongs").innerText = recommendedTracksList
    } catch (error) {
        // Handle any errors
        console.error("Error fetching recommended tracks:", error);
    }
}

function getAudioFeature(zodiac) {
    const zodiacAudioFeatures = {
        aries: ZodiacAudioFeatures.aries,
        taurus: ZodiacAudioFeatures.taurus,
        gemini: ZodiacAudioFeatures.gemini,
        cancer: ZodiacAudioFeatures.cancer,
        leo: ZodiacAudioFeatures.leo,
        virgo: ZodiacAudioFeatures.virgo,
        libra: ZodiacAudioFeatures.libra,
        scorpio: ZodiacAudioFeatures.scorpio,
        sagittarius: ZodiacAudioFeatures.sagittarius,
        capricorn: ZodiacAudioFeatures.capricorn,
        aquarius: ZodiacAudioFeatures.aquarius,
        pisces: ZodiacAudioFeatures.pisces
    };

    return zodiacAudioFeatures[zodiac];
}


function ChooseZodiac() {

    const [selectedZodiac, setSelectedZodiac] = useState(null);

    const handleZodiacClick = (zodiac) => {
        setSelectedZodiac(zodiac);
    };

    // State variable to hold the selected value from the dropdown
    const { userZodiac, setUserZodiac } = useUserZodiac();

    // Function to handle the change event of the dropdown menu
    const handleDropdownChange = (event) => {
        setUserZodiac(event.target.value);
    };

    // Function to handle the click event of the continue button
    const handleContinueButtonClick = () => {
        if (userZodiac == null) {
            setUserZodiac("aries");
        }
        //userZodiac = zodiac;
        setUserZodiac(zodiac);
        console.log(userZodiac);
        fetchRecommendedTracks(getAudioFeature(userZodiac));
        console.log('Selected zodiac:', userZodiac);
    };

  return (
    <div className="ChooseZodiac">
    <header className="App-header">
        
    </header>
    <body className="App-body">
        <h1>Choose your sign</h1>
        <div className="zodiac-buttons">
            <button
                className={selectedZodiac === 'aries' ? 'selected' : ''}
                onClick={() => handleZodiacClick('aries')}
            >
                Aries
            </button>
            <button
                className={selectedZodiac === 'taurus' ? 'selected' : ''}
                onClick={() => handleZodiacClick('taurus')}
            >
                Taurus
            </button>
            <button
                className={selectedZodiac === 'gemini' ? 'selected' : ''}
                onClick={() => handleZodiacClick('gemini')}
            >
                Gemini
            </button>
            <button
                className={selectedZodiac === 'cancer' ? 'selected' : ''}
                onClick={() => handleZodiacClick('cancer')}
            >
                Cancer
            </button>
            <button
                className={selectedZodiac === 'leo' ? 'selected' : ''}
                onClick={() => handleZodiacClick('leo')}
            >
                Leo
            </button>
            <button
                className={selectedZodiac === 'virgo' ? 'selected' : ''}
                onClick={() => handleZodiacClick('virgo')}
            >
                Virgo
            </button>
            <button
                className={selectedZodiac === 'libra' ? 'selected' : ''}
                onClick={() => handleZodiacClick('libra')}
            >
                Libra
            </button>
            <button
                className={selectedZodiac === 'scorpio' ? 'selected' : ''}
                onClick={() => handleZodiacClick('scorpio')}
            >
                Scorpio
            </button>
            <button
                className={selectedZodiac === 'sagittarius' ? 'selected' : ''}
                onClick={() => handleZodiacClick('sagittarius')}
            >
                Sagittarius
            </button>
            <button
                className={selectedZodiac === 'capricorn' ? 'selected' : ''}
                onClick={() => handleZodiacClick('capricorn')}
            >
                Capricorn
            </button>
            <button
                className={selectedZodiac === 'aquarius' ? 'selected' : ''}
                onClick={() => handleZodiacClick('aquarius')}
            >
                Aquarius
            </button>
            <button
                className={selectedZodiac === 'pisces' ? 'selected' : ''}
                onClick={() => handleZodiacClick('pisces')}
            >
                Pisces
            </button>
        </div>
        {/*
        <select name="name" id="zodiacs" value={userZodiac} onChange={handleDropdownChange}>
            <option value="aries">Aries</option>
            <option value="taurus">Taurus</option>
            <option value="gemini">Gemini</option>
            <option value="cancer">Cancer</option>
            <option value="leo">Leo</option>
            <option value="virgo">Virgo</option>
            <option value="libra">Libra</option>
            <option value="scorpio">Scorpio</option>
            <option value="sagittarius">Sagittarius</option>
            <option value="capricorn">Capricorn</option>
            <option value="aquarius">Aquarius</option>
            <option value="pisces">Pisces</option>
  </select> */}
        <Link to="/results"><button onClick={handleContinueButtonClick}>Continue</button></Link>
    </body>
    <footer>
        <p>created by my name | &copy; 2024 | about | policy</p>
    </footer>
    </div>
  );

}

export default ChooseZodiac;
