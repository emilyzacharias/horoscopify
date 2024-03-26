import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import {triggerLogIn} from './script.js';


function Loginfail() {

    return (
        <div>
            <p>There has been an error. Please try again</p>
            <Link to="/">
                    <button>Return to home</button>
                </Link>
        </div>
    );
}

export default Loginfail;