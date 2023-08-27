import React from 'react';
import './Header.css';
import {Search} from '@material-ui/icons';
import {Avatar} from '@material-ui/core';
import { useStateValue } from './StateProvider';

function Header() {
    const [{user},dispatch] = useStateValue();

    return (
        <div className="header">
            <div className="header__left">
                <Search/>
                <input placeholder="Searchfor Artists, Songs, or Podcasts"
                type="text"
                />
            </div>
            <div className="header__right">
                <Avatar src={user?.images[0].url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
                
            </div>
            
        </div>
    )
}

export default Header
