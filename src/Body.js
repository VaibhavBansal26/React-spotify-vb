import React from 'react';
import './Body.css';
import Header from './Header';
import SongRow from './SongRow';
import { useStateValue } from './StateProvider';
import { MoreHoriz,Favorite,PlayCircleFilled } from '@material-ui/icons';
import SpotifyWebApi from 'spotify-web-api-js';

const si  = new SpotifyWebApi();
function Body({spotify}) {
    const[{discover_weekly,token},dispatch] = useStateValue();
    //console.log(discover_weekly);

    const playSong = (id) => {
        si.setAccessToken(token);
        si.getTrack(id).then(res => {
            console.log(res);
            dispatch({
                type:"SET_ITEM",
                item:res
            });
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        })
        /*si.getAudioFeaturesForTrack(id)
        .then(res => {
            console.log(res);
        })*/
    }
    return (
        <div className="body">
            <Header spotify={spotify}/>
            <div className="body__info">
                <img src={discover_weekly?.images[0].url} alt="" />
                <div className="body__infoText">
                    <strong>PlayList</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.name}</p>
                </div>
            </div>
            <div className="body__songs">
                <div className="body__icons">
                    <PlayCircleFilled className="body__shuffle"/>
                    <Favorite fontSize="large"/>
                    <MoreHoriz />
                </div>
                {discover_weekly?.tracks.items.map((item,i) => (
                    <SongRow track = {item.track} key={i} playSong={playSong}/>
                    ))}
            </div>
            
        </div>
    )
}

export default Body
