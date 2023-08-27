import React from 'react';
import './SongRow.css'

function SongRow({track,playSong}) {
    /*var x = document.getElementById(`${track.id}`); 

    function playAudio(id) { 
    if(x && id ===  track.id){
        x.play(); 
    }
        
    } */

    return (
        <div className="songRow" onClick={() => playSong(track.id)}>
            <img className ="songRow__album" src={track.album.images[0].url} alt=""  />
            <div className="songRow__info">
                
                <h1>{track.name}</h1>
                <p>
                    {track.artists.map((artist) => artist.name).join(", ")} -{" "}
                    {track.album.name}
                    
                </p>
              
                
                    <audio src={track.preview_url}  controls />
               
                
                
            </div>
        </div>
    )
}

export default SongRow
//