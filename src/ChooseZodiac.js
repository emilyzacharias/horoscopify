import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserZodiac } from './UserZodiacContext';
import { getRecommendations, ZodiacAudioFeatures } from './script.js'

export var results = "";

async function fetchRecommendedTracks(AudioFeature) {
    try {
        // Call the getRecommendations function and await its result
       const recommendedTracks = await getRecommendations(AudioFeature);

        // Log the result
        const recommendedTracksList = 
          recommendedTracks?.map(
            ({name, artists}) =>
              `${name} by ${artists.map(artist => artist.name).join(', ')}`
          );
        results = recommendedTracksList;
        console.log(recommendedTracksList);
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
        </select>
        <Link to="/results"><button onClick={handleContinueButtonClick}>Continue</button></Link>
    </body>
    <footer>
        <p>created by Emily Zacharias | &copy; 2024 | about | policy</p>
    </footer>
    </div>
  );
}

export default ChooseZodiac;
