import logo from './logo.svg';
import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import { Link, redirect, useNavigate} from 'react-router-dom';

import { zodiac } from './ChooseZodiac'
import GradientBackground from './GradientBackground';
import { getRecommendations, ZodiacAudioFeatures, createPlaylist, getPlaylistLink } from './script';
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
import noise from './SVG/Noise.svg';
import spotifylogo from './spotifylogo.png';
import ErrorBoundary from './ErrorBoundary';
import ParticlesApp from './particles';
import storytemp from './story_template.png';



var recommendedTracksList = ['spotify:track:0SHLuQVSpHcVtheQi20v2Q', 'spotify:track:2qeGrFbgL4St7P4ArgXCS9', 'spotify:track:1WCjhRs2WBgyeGaybCX2Po', 'spotify:track:3nIYY0wyZO5hXCrhRlMJHF', 'spotify:track:3qruUcemmywHKW2jQ7EV6J', 'spotify:track:6TT7B4MigCJCc0tqKYEpZC', 'spotify:track:1uOpGeKg6ikCb9YM2Hgbpb', 'spotify:track:5A49Smwb5GOtXf0TNcaeic', 'spotify:track:0TZjH2joEshudzD9AYlto9', 'spotify:track:3izFKMKwzKVLHGV7gLYVeH', 'spotify:track:7EUhSxz4srS8pqh1cENbLB', 'spotify:track:2ckhAiLT5eV5blWvyDs8Lh', 'spotify:track:5PJH1U5Iie893v48Fl9yaC', 'spotify:track:2gKraTtPgxnmZ906dR5YW0', 'spotify:track:7mYU5AQ4rc3RlVpQsV6iK8'];
let isFetching = false;
var tracksList = [];
var tracksList2 = [];
var createdPlaylist = "";
var userName = "Emily";





const zodiacImages = {
  aquarius: aquarius,
  aries: aries,
  cancer: cancer,
  capricorn: capricorn,
  gemini: gemini,
  leo: leo,
  libra: libra,
  pisces: pisces,
  sagittarius: sagittarius,
  taurus: taurus,
  scorpio: scorpio,
  virgo: virgo
};

const tracksUri = [
  'spotify:track:7FOgcfdz9Nx5V9lCNXdBYv','spotify:track:0a7NOty3d7sX0oREbirXlt','spotify:track:02LMGGAW6fN40b0oxhXkmP','spotify:track:38xXr3MkiKNzNDv4JDJagF','spotify:track:5enxwA8aAbwZbf5qCHORXi','spotify:track:193Dm5SqYy3hTSbuzxbwKc','spotify:track:4LKYOetuIF5c9XjeLBL9av','spotify:track:25HgUJf69zb3K7TJw7LGCQ','spotify:track:64IcRXZ9TzOOqyse3EPA3Y','spotify:track:1jJvNlkbQmtRpG9uIUpiYA'
];





function ResultsImage() {
  return (
    <div className="Results">
      <ParticlesApp/>
      <div className="Results-image background-gradient">
        <div className="Results-contents">
        <img src={cancer} id="results-constellation" />
        <h2 id="results-header">{userName.charAt(0).toUpperCase() + userName.slice(1)}'s {zodiac.charAt(0).toUpperCase() + zodiac.slice(1)} Horoscopify <span id="topsongs"></span></h2>
        <h5>adventurous, optimistic, and free-spirited</h5>
        <ErrorBoundary>
        <ul id="recommendedsongs">
          {recommendedTracksList.map((result, index) => (
            <li className="recommended-list-items" key={index}>{result}</li>
          ))}
        </ul>
        </ErrorBoundary>
        
        </div>

        <ImageOverlay />
       
      </div>
      
    </div>
  );
}

function func() {
    const ctx = document.getElementById("canvas").getContext("2d");
            ctx.fillStyle = "orange";

            function draw() {
                ctx.fillRect(0, 0, 150, 150) // Fill the entire canvas with orange
            }

            window.addEventListener("load", draw);
}

export default ResultsImage;




const ImageOverlay = () => {
    const canvasRef = useRef(null);
    const [text, setText] = useState('');
    const [imageLoaded, setImageLoaded] = useState(false);
  
    const drawText = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = {storytemp};
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText("hello world", 0, 0); // Adjust coordinates as needed
      };
    };
  
    const handleDownload = () => {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'image_with_text.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  
    return (
      <div>
        <img src={storytemp}></img>
        <br />
        <canvas
          ref={canvasRef}
          width={108}
          height={192}
          style={{ border: '1px solid black' }}
        />
        <br />
        <button onClick={handleDownload}>Download Image</button>
      </div>
    );
  };
