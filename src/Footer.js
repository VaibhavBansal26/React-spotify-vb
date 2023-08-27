import React,{useEffect} from 'react';
import './Footer.css';
import {PauseCircleOutline,PlayCircleOutline,SkipPrevious,SkipNext,Shuffle,Repeat,PlaylistPlay, VolumeDown} from '@material-ui/icons';
import { Grid,Slider } from '@material-ui/core';
import { useStateValue } from './StateProvider';


function Footer({spotify}) {
    const [{item,playing},dispatch] = useStateValue();

    useEffect(() => {
    
        spotify.getMyCurrentPlaybackState().then((r) => {
          console.log(r);
    
          dispatch({
            type: "SET_PLAYING",
            playing: r.is_playing,
          });
    
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
        });
      }, [spotify,dispatch]);

    const handlePlayPause = () => {
        if (playing) {
          spotify.pause();
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
        } else {
          spotify.play();
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        }
      };
    const skipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };
    
      const skipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: "SET_ITEM",
            item: r.item,
          });
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
        });
      };
    return (
        <div className="footer">
            <div className="footer__left">
                <img className="footer__albumLogo" src={item?.album.images[0].url} alt={item?.name}/>
                {item?(
                <div className="footer__songInfo">
                    <h4>{item?.name}</h4>
                    <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
                </div>):(
                    <div className="footer__songInfo">
                    <h4>No song is playing</h4>
                    <p>...</p>
                  </div>
                )}

            </div>
            <div className="footer__center">
                <Shuffle className="footer__green"/>
                <SkipPrevious className="footer__icon" onClick={skipNext}/>
                {playing ? (
                    <PauseCircleOutline
                        onClick={handlePlayPause}
                        fontSize="large"
                        className="footer__icon"
                    />
                    ) : (
                    <PlayCircleOutline
                        onClick={handlePlayPause}
                        fontSize="large"
                        className="footer__icon"
                    />
                    )}
               
                <SkipNext className="footer__icon" onClick={skipPrevious}/>
                <Repeat className="footer__green"/>

            </div>
            <div className="footer__right">
                <Grid container spacing={2}>
                    <Grid item>
                        <PlaylistPlay/>
                    </Grid>
                    <Grid item>
                        <VolumeDown/>
                    </Grid>
                    <Grid item xs>
                        <Slider/>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
        
    
}

export default Footer
