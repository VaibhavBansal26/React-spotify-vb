import React, { useEffect} from 'react';
import './App.css';
import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import {useStateValue} from './StateProvider';

//spotify-instance //To communicate back and forth with spotify
const spotify = new SpotifyWebApi();

function App() {
  
  //const [Token, setToken] = useState(null);
  const [{user,token,discover_weekly},dispatch] = useStateValue();

 //Run code based on a given condition
  useEffect (() =>{
    const hash = getTokenFromUrl();
    window.location.hash = "" //clear out the access token
    const _token = hash.access_token;
    console.log('I have a token',_token);

    if(_token) {
     // setToken(_token)
      dispatch({
        type:"SET_TOKEN",
        token:_token
      })
      //Giving access token to spotify api
      spotify.setAccessToken(_token);
      //--------------SPOTIFY API METHODS -----------------------//
      //Returns back to user
      spotify.getMe().then(user => {
        console.log(user);
        dispatch({
          type:'SET_USER',
          user:user
        });
      });
      //Get Playlists
      spotify.getUserPlaylists().then((playlists) =>{
        dispatch({
          type:"SET_PLAYLIST",
          playlists
        });
      });
      spotify.getPlaylist('100sbZUYj1riVXygqOFF2P').then(response => {
        dispatch({
          type:"SET_DISCOVER_WEEKLY",
          discover_weekly:response,
        });
      });
    }

  },[dispatch]);
  //console.log("😣",user);
  //console.log("👾" ,token)

  return (
    <div className="app"> 
    {
      token ? (
        <Player spotify={spotify}/>
      ):(
        <Login /> 
      )
    }
     
    </div>
  );
}

export default App;
