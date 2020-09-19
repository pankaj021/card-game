import React, {useContext, useState, useEffect} from 'react';
import {Redirect} from "react-router-dom"
import Axios from 'axios';
import {PlayersContext} from '../context/PlayersContext';
import Button from '../lib/Button';
import Input from '../lib/Input';

const Player = ({index, player}) => (
    <div className='player'>
        <h2>{`Player ${index}: `}</h2>
        <h4>{(player && player.name) || `Select a player from the list`}</h4>
    </div>
)

export default function MainContent(props) {
    const { gamePlayers } = useContext(PlayersContext);
    const [gameId, setGameId] = useState("");
    const [error, setError] = useState("");
    const [name, setName] = useState("");

    const startGame = () => {
        Axios.post("/games", {
            "playerId1": gamePlayers[0]._id,
            "playerId2": gamePlayers[1]._id
        }).then(res => {
            setGameId(res.data._id);
        }).catch(err => setError("Game could not be started...."))
    }
    const createPlayer = () => {
        Axios.post("/players", {name})
        .then(res => {
            setName("");
        }).catch(err => setError("Player could not be created...."))
    }

    if(error) return <div className='main-content'><h1>{error}</h1></div>
    if(gameId) return <Redirect to={`/game/${gameId}`}/>
    return(
        <div className='main-content'>
            {error && <div>{error}</div>}
            <div className='players'>
                <div className="create-user">
                    <Input
                        label="Enter your name..."
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button 
                        label="Add"
                        disabled={!name || !name.trim()}
                        onClick={createPlayer}
                    />
                </div>
                <Player index={1} player={gamePlayers[0]}/>
                <Player index={2} player={gamePlayers[1]}/>
                <Button
                    label="Start Game"
                    disabled={gamePlayers.length < 2}
                    onClick={() => startGame()}
                />
            </div>
        </div>
    )
}