import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserZodiac } from './UserZodiacContext';


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
            setUserZodiac("Aries");
        }
        // Here you can save the selectedOption to a database or pass it to another component
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
