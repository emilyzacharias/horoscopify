import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import './script.js';


function Authorize() {
    function runScript() {
        // Fetch the script file
        fetch('./script.js')
            .then(response => response.text())
            .then(scriptText => {
                // Create a script element
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.text = scriptText;

                // Append the script to the document's body
                document.body.appendChild(script);
            })
            .catch(error => {
                console.error('Error loading script:', error);
            });
    }
}

export default Authorize;