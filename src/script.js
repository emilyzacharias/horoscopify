import { useHistory } from 'react-router-dom';

const clientId = "251541bae2654bf099c6853ab90e4c4a";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken = "";
var topTracksIds = [];
var recommendedTracksURIs = "";
export var userName = "";
const MAX_RETRIES = 3;
const BASE_DELAY = 400; //in milliseconds
export var profile = "";
var recTracks = "";
var playlistLink = "";
var redirectURI = "http://localhost:3003/choosezodiac"

// https://emilyzacharias.github.io/horoscopify/choosezodiac

export const ZodiacAudioFeatures = {
    aries: "&target_danceability=0.9&target_energy=0.9&target_tempo=130&target_valence=0.9",
    taurus: "&target_acousticness=0.5&target_energy=0.4&target_valence=0.7",
    gemini: "&target_danceability=0.9&target_energy=0.7&target_speechiness=0.9",
    cancer: "&target_acousticness=0.9&target_valence=0.35&target_liveness=0.35",
    leo: "&target_energy=0.9&target_loudness=0.9&target_valence=0.9",
    virgo: "&target_instrumentalness=0.9&target_valence=0.35&target_tempo=100",
    libra: "&target_valence=0.9&target_tempo=110&target_liveness=0.9",
    scorpio: "&target_acousticness=0.35&target_energy=0.9&target_valence=0.9",
    sagittarius: "&target_danceability=0.9&target_energy=0.9&target_tempo=130",
    capricorn: "&target_instrumentalness=0.9&target_energy=0.35&target_valence=0.35",
    aquarius: "&target_danceability=0.9&target_energy=0.5&target_speechiness=0.9",
    pisces: "&target_acousticness=0.9&target_valence=0.35&target_liveness=0.7"
}

export function triggerLogIn() {
    if (!code) {
        redirectToAuthCodeFlow(clientId);
        console.log("hey");
    }
}

if (!code) {
    //redirectToAuthCodeFlow(clientId);
} else {
    accessToken = await getAccessToken(clientId, code);
    try {
        profile = await fetchProfile(accessToken);


    console.log(profile);
    userName = profile.display_name;
    

    // Call getTopTracks with accessToken and store the result in topTracks
    const topTracks = await getTopTracks(accessToken);
    for (let i = 0; i < topTracks.length; i++) {
        topTracksIds.push(topTracks[i].id);
      }
    
    //uses these tracks if user has less than 5 tracks in their top tracks
    if(topTracksIds.length === 0) {
        topTracksIds.push('46kspZSY3aKmwQe7O77fCC');
        topTracksIds.push('6tNQ70jh4OwmPGpYy6R2o9');
        topTracksIds.push('6tNgRQ0K2NYZ0Rb9l9DzL8');
        topTracksIds.push('4IadxL6BUymXlh8RCJJu7T');
        topTracksIds.push('0Z7nGFVCLfixWctgePsRk9');
    }
    
    console.log("running this code.");
    const topsongs = 
        topTracks?.map(
            ({ name, artists }) =>
                `${name} by ${artists.map(artist => artist.name).join(', ')}`
        );
        //populateUI(profile, topsongs);
    /*const recommendedTracks = await getRecommendations(ZodiacAudioFeatures.Aries);
    const recommendedTracksList = 
          recommendedTracks?.map(
            ({name, artists}) =>
              `${name} by ${artists.map(artist => artist.name).join(', ')}`
          ); */
    console.log(topsongs);
    //console.log(recommendedTracksList);

    } catch (error) {
        profile = "false";
    }
    
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

async function fetchWebApiWithRetry(endpoint, method, accessToken, body, retryCount = 0) {
    try {
        console.log(`https://api.spotify.com/${endpoint}`);
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            method,
            body:JSON.stringify(body)
        });

        if (res.status === 429) {
            // Handle rate limiting, possibly by waiting and retrying
            throw new Error('Rate limit exceeded');
        }

        return await res.json();
    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            const delay = Math.pow(2, retryCount) * BASE_DELAY;
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWebApiWithRetry(endpoint, method, accessToken, body, retryCount + 1);
        } else {
            throw error;
        }
    }
}

async function fetchWebApiWithRetryPlaylist(endpoint, method, accessToken, body, retryCount = 0) {
    try {
        console.log(`https://api.spotify.com/${endpoint}`);
        const res = await fetch(`https://api.spotify.com/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application.json',
                'Content-Type': 'image/jpeg'
            },
            method,
            body
        });

        if (res.status === 429) {
            // Handle rate limiting, possibly by waiting and retrying
            throw new Error('Rate limit exceeded');
        }

        return await res.json();
    } catch (error) {
        if (retryCount < MAX_RETRIES) {
            const delay = Math.pow(2, retryCount) * BASE_DELAY;
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWebApiWithRetryPlaylist(endpoint, method, accessToken, body, retryCount + 1);
        } else {
            throw error;
        }
    }
}



async function getTopTracks(accessToken) {
    return (await fetchWebApiWithRetry(
        'v1/me/top/tracks?time_range=medium_term&limit=5', 'GET', accessToken
    )).items;
}

export async function getRecommendations(zodiacfeature){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    console.log("running get recs.");
    if (topTracksIds === undefined) {
        return "error";
    }
    recommendedTracksURIs = (await fetchWebApiWithRetry(
      `v1/recommendations?market=US&limit=15&seed_tracks=${topTracksIds.join(',')}${zodiacfeature}`, 'GET', accessToken
    )).tracks;
    recTracks = 
        recommendedTracksURIs?.map(
            ({ uri }) =>
                `${uri}`
        );
    console.log(recTracks);
    return recommendedTracksURIs;
  }

export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", redirectURI);
    params.append("scope", "user-top-read playlist-modify-private");
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
    params.append("scope", "user-top-read playlist-modify-private");
    params.append("redirect_uri", redirectURI);
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

    try {
        const result = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (result.status === 403) {
            // Redirect to /loginfail if Forbidden error occurs
            
            return null; // or throw an error
        }

        return await result.json();
    } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle other errors if necessary
        return null; // or throw an error
    }
}

/*
async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}
*/


export async function createPlaylist(zodiac) {
    const playlistData = {
        "name": `${userName.charAt(0).toUpperCase() + userName.slice(1)}'s ${zodiac.charAt(0).toUpperCase() + zodiac.slice(1)} Horoscopify`, 
        "description": "Playlist created based off your unique music taste and zodiac sign. Powered by horoscopify.app",
        "public": false
    };


    try {
        const playlist = await fetchWebApiWithRetry(
            `v1/users/${profile.id}/playlists`, 'POST', accessToken, playlistData
        );

        const getplaylist = await fetchWebApiWithRetry(
            `v1/playlists/${playlist.id}`,
            'GET', accessToken
          );
        
         console.log(getplaylist.external_urls.spotify);
         playlistLink = getplaylist.external_urls.spotify

        console.log(recommendedTracksURIs);
        await fetchWebApiWithRetry(
            `v1/playlists/${playlist.id}/tracks?uris=${recTracks.join(',')}`,
            'POST', accessToken
          );


       /*   console.log(scorpioImg);
        await fetchWebApiWithRetryPlaylist(
            `v1/playlists/${playlist.id}/images`, 'PUT', accessToken, scorpioImg
        ); */
      
        return playlist;
    } catch (error) {
        console.error("Error creating playlist:", error);
        throw error;
    }
}

export function getPlaylistLink() {
    return playlistLink;
}

const scorpioImg = 
    "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"


