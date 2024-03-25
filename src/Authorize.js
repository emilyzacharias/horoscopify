import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import {triggerLogIn} from './script.js';


function Authorize() {
    useEffect(() => {
        // Call triggerLogIn when component mounts
        triggerLogIn();
    }, []); // Empty dependency array ensures it only runs once after mount

    return (
        <div>
            {/* Your component JSX */}
        </div>
    );
}

export default Authorize;