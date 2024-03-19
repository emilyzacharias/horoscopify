import { useState } from 'react';
import { useUserZodiac } from './UserZodiacContext';


const clientId = "251541bae2654bf099c6853ab90e4c4a";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken = ""
var topTracksIds = ""

export const ZodiacAudioFeatures = {
    aries: "&min_danceability=0.7&min_energy=0.7&target_tempo=130&min_valence=0.7",
    taurus: "&target_acousticness=0.5&max_energy=0.6&min_valence=0.45",
    gemini: "&min_danceability=0.7&min_energy=0.45&min_speechiness=0.7",
    cancer: "&min_acousticness=0.7&min_valence=0.45&max_liveness=0.55",
    leo: "&min_energy=0.7&min_loudness=0.7&min_valence=0.7",
    virgo: "&min_instrumentalness=0.7&max_valence=0.55&target_tempo=100",
    libra: "&min_valence=0.7&target_tempo=110&min_liveness=0.7",
    scorpio: "&max_acousticness=0.55&min_energy=0.7&max_valence=0.7",
    sagittarius: "&min_danceability=0.7&min_energy=0.7&target_tempo=130",
    capricorn: "&min_instrumentalness=0.7&max_energy=0.55&max_valence=0.55",
    aquarius: "&min_danceability=0.7&target_energy=0.5&min_speechiness=0.7",
    pisces: "&min_acousticness=0.7&max_valence=0.55&min_liveness=0.25&target_liveness=0.6"
}


if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    console.log(profile);
    

    // Call getTopTracks with accessToken and store the result in topTracks
    const topTracks = await getTopTracks(accessToken);
    topTracksIds = [
        topTracks[0].id, topTracks[1].id, topTracks[2].id, topTracks[3].id, topTracks[4].id
      ];
    const topsongs = 
        topTracks?.map(
            ({ name, artists }) =>
                `${name} by ${artists.map(artist => artist.name).join(', ')}`
        );
        //populateUI(profile, topsongs);
    const recommendedTracks = await getRecommendations(ZodiacAudioFeatures.Aries);
    const recommendedTracksList = 
          recommendedTracks?.map(
            ({name, artists}) =>
              `${name} by ${artists.map(artist => artist.name).join(', ')}`
          );
    console.log(topsongs);
    console.log(recommendedTracksList);
}


async function fetchWebApi(endpoint, method, accessToken) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json' // Ensure the content type is set correctly
        },
        method
    });
    return await res.json();
}


async function getTopTracks(accessToken) {
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=medium_term&limit=20', 'GET', accessToken
    )).items;
}

export async function getRecommendations(zodiacfeature){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(
      `v1/recommendations?market=US&limit=5&seed_tracks=${topTracksIds.join(',')}${zodiacfeature}`, 'GET', accessToken
    )).tracks;
  }

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000/choosezodiac");
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("scope", "user-top-read");
    params.append("redirect_uri", "http://localhost:3000/choosezodiac");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

function populateUI(profile, topsongs) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
    document.getElementById("topsongs").innerText = topsongs;
    
}