import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import {Home,Search,LibraryMusic} from '@material-ui/icons';
import { useStateValue } from './StateProvider';
import SpotifyWebApi from 'spotify-web-api-js';

const sd  = new SpotifyWebApi();
function Sidebar() {
    const[{playlists,token},dispatch] = useStateValue();
    sd.setAccessToken(token);
    const getId = (id) => {
        sd.getPlaylist(id)
        .then((res) => {
            console.log(res);
            dispatch({
                type:'SET_DISCOVERY_WEEKLY',
                discovery_weekly:res
            });
        });
    }
    return (
        <div className="sidebar">
            <img className="sidebar__logo" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="spotify"/>
            
            <SidebarOption title="Home" Icon={Home}/>
            <SidebarOption title="Search" Icon={Search}/>
            <SidebarOption title="Your Library" Icon={LibraryMusic}/>
            <br/>
            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr/>
            {playlists?.items?.map((playlist,index)=>(
                <SidebarOption title={playlist.name} key={index} getId={getId} id={playlist.id}/>
            ))}

        </div>
    )
}

export default Sidebar
