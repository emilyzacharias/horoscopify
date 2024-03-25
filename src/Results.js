import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, redirect, useNavigate} from 'react-router-dom';

import { zodiac } from './ChooseZodiac'
import GradientBackground from './GradientBackground';
import { getRecommendations, ZodiacAudioFeatures, userName, createPlaylist, getPlaylistLink } from './script';
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
import noise from './SVG/Noise.svg';
import spotifylogo from './spotifylogo.png';
import ErrorBoundary from './ErrorBoundary';



var recommendedTracksList = [];
let isFetching = false;
var tracksList = [];
var tracksList2 = [];
var createdPlaylist = "";




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




function Results() {
  const [recommendedTracksList, setRecommendedTracksList] = useState([""]);
  const [isFetching, setIsFetching] = useState(false);
  const [playlistAdded, setPlaylistAdded] = useState(false);
  const [moreAdded, setMoreAdded] = useState(false);
  const [playlistLink, setPlaylistLink] = useState("");
  const navigate = useNavigate();





  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRecommendedTracks(getAudioFeature(zodiac));
    }, 200);
  
    // Clear the timer when the component unmounts or before the effect runs again
    return () => clearTimeout(timer);
  }, []);

  const createPlaylistButtonClick = () => {
    //userZodiac = zodiac;
    
    createPlaylist(zodiac)
      .then(() => {
        const playlistLink = getPlaylistLink();
        setPlaylistLink(playlistLink);
        console.log(playlistLink);
        setPlaylistAdded(true);
      })
      .catch(error => {
        console.error('Error creating playlist:', error);
        // Handle error if necessary
      });
  };

  const showMoreSongsClick = () => {
    setRecommendedTracksList(tracksList.concat(tracksList2));
    setMoreAdded(true);
  }

  async function fetchRecommendedTracks(AudioFeature) {
    if (isFetching) {
      console.log("fetchRecommendedTracks is already running.");
      return; // Exit the function early if already running
    }
    if (recommendedTracksList.length > 1) {
      
      console.log("recommendations already made.");
      return; // Exit the function early if recommendations are already made.
    }
      try {
        setIsFetching(true);
        console.log(isFetching);
          // Call the getRecommendations function and await its result
         const recommendedTracks = await getRecommendations(AudioFeature);
         if (recommendedTracks == "error") {
            navigate('/loginfail');
            return;
         }
          //const recommendedTracks = ""
          // Log the result
          tracksList = recommendedTracks?.slice(0, 5).map(
            ({ name, artists, external_urls }) => (
              <span className="track" key={external_urls.spotify}>
                <span className="track-name">
                  <a href={external_urls.spotify} target="_blank">{name}</a>
                </span><br/>
                <span className="artist"><a href={external_urls.spotify} target="_blank">{artists.map(artist => artist.name).join(', ')}</a></span>
              </span>
            )
          );

          tracksList2 = recommendedTracks?.slice(5, 15).map(
            ({ name, artists, external_urls }) => (
              <span className="track" key={external_urls.spotify}>
                <span className="track-name">
                  <a href={external_urls.spotify} target="_blank">{name}</a>
                </span><br/>
                <span className="artist"><a href={external_urls.spotify} target="_blank">{artists.map(artist => artist.name).join(', ')}</a></span>
              </span>
            )
          );

            setRecommendedTracksList(tracksList);
          console.log(tracksList);
          //document.getElementById("topSongs").innerText = results;
      } catch (error) {
          // Handle any errors
          console.error("Error fetching recommended tracks:", error);
      } finally {
        setIsFetching(false); // Reset the flag once the function completes
        if (typeof recommendedTracksList === 'undefined') {
          console.log("we undefined");
          navigate('/loginfail');
        }
        return;
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

  function getZodiacDescription(zodiac) {
    const zodiacAudioFeatures = {
        aries: "energetic, upbeat, and fast-paced",
        taurus: "grounded, soothing, and melodic",
        gemini: "dynamic, eclectic, and expressive",
        cancer: "emotive, introspective, and soulful",
        leo: "bold, dramatic, and attention-grabbing",
        virgo: "refined, understated, and detail-oriented",
        libra: "harmonious, balanced, and socially-oriented",
        scorpio: "intense, passionate, and emotionally-charged",
        sagittarius: "adventurous, optimistic, and free-spririted",
        capricorn: "disciplined, introspective, and understated",
        aquarius: "innovative, eclectic, and socially-consious",
        pisces: "dreamy, ethereal, and emotionally-evocative"
    };

      return zodiacAudioFeatures[zodiac];
  }

  // Use the zodiac to select the corresponding image
  const zodiacImageSrc = zodiacImages[zodiac];


  return (
    <div className="Results">
      <header className="App-header">
        
      </header>
      <body className="App-body">
    {  <div className="background-stars">
                <img src={star2} id="starsvg2"/>
                <img src={star2} id="starsvg4"/>
                <img src={star1} id="starsvg5"/>
                <img src={star2} id="starsvg6"/>
                <img src={star1} id="starsvg7"/>
                <img src={star2} id="starsvg9"/>
                <img src={star1} id="starsvg10"/>
                <img src={star1} id="starsvg11"/>
                <img src={star2} id="starsvg12"/>
                <img src={star1} id="starsvg13"/>
                <img src={star2} id="starsvg14"/>
                <img src={zodiacImageSrc} id="results-left-constellation" />
                <img src={zodiacImageSrc} id="results-right-constellation"/>
                 
                  
  </div> }
        <h2 id="results-header">{userName.charAt(0).toUpperCase() + userName.slice(1)}'s {zodiac.charAt(0).toUpperCase() + zodiac.slice(1)} Horoscopify <span id="topsongs"></span></h2>
        <h5>{getZodiacDescription(zodiac)}</h5>
        <ErrorBoundary>
        <ul id="recommendedsongs">
          {recommendedTracksList.map((result, index) => (
            <li className="recommended-list-items" key={index}>{result}</li>
          ))}
        </ul>
        </ErrorBoundary>
        {!moreAdded && <button onClick={showMoreSongsClick} id="more">+ more</button>}

        
          {playlistAdded ? (
                  <p id="playlist-button"><a href = {playlistLink} target = "_blank">View Playlist</a></p> // Show this text if playlist is added
              ) : (
                  <button id="Login-button" onClick={createPlaylistButtonClick}>Add playlist to library</button> // Show this button if playlist is not added
              )}
          
       { <div className="gradient-background">
            <GradientBackground/>
              </div> }
      </body>
      <footer className="app-footer">
                <p><a href="./">home</a><br/><br/>created by <a href = "https://ezacharias.com" target="_blank">Emily Zacharias</a> | &copy; 2024</p>
                <img className = "spotifylogo" src = {spotifylogo}></img>
              </footer>
    </div>
  );
}

export default Results;



