import React, {useEffect, useState, useContext, Fragment} from 'react';
import axios from 'axios';
import Select from '../lib/Select';
import {PlayersContext} from '../context/PlayersContext';

export default function SideMenu() {
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState("");
    const { gamePlayers, setGamePlayers } = useContext(PlayersContext);
    useEffect(() => {
        axios.get('/players')
        .then(res => setPlayers(res.data))
        .catch(err => setError("ERROR OCCURRED"))
    }, []);

    const handleSelectChanges = (e, _id, name) => {
        if(e.target.checked){
            gamePlayers.length < 2 && setGamePlayers([...gamePlayers, {name, _id}]);
        } else {
            setGamePlayers(gamePlayers.filter(player => player._id !== _id));
        }
    }    
    if(error) return <div>Error Occurred...</div>;
    if(!players.length) return <div className='sidemenu'>No player found...</div>;
    return(
        <div className='sidemenu'>
            {players.map(({name, isAvailable, _id}) => (
                <div key={_id} className="player-list">
                    <span className='online' style={{visibility: isAvailable ? "visible" : "hidden"}}>{isAvailable || "yes"}</span>
                    <Select  
                        label={name}
                        disabled={!isAvailable || gamePlayers.length >= 2 && gamePlayers.filter(p => p._id === _id).length <= 0}
                        onChange={(e) => handleSelectChanges(e, _id, name)}
                    />
                </div>
        ))}
        </div>
    )
}