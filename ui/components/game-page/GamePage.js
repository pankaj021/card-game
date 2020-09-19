import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import PlayerBoard from './PlayerBoard';
import StatusBoard from './StatusBoard';
import { TurnContext } from '../context/TurnContext';
import { GameContext } from '../context/GameContext';

export default function GamePage(props) {
    const gameId = props.match.params.gameId;
    const [game, setGame] = useState(null);
    const [error, setError] = useState("");
    const [turn, setTurn] = useState({playerId: "", playerChoice: ""});
    useEffect(() => {
        if(!game) {
            Axios.get(`/games/${gameId}`)
            .then(res => {
                setGame(res.data);
                setTurn({playerId: res.data.turnInfo.playerId});
                setError("");
            })
            .catch(err => {
                setError("Error while fetching the game...");
            })
        }
    });

    if(error) return <div className="game-page"><h1>{error}</h1></div>    
    if(!game) return null;
    const {playerId1, playerId2, status, winner, openCards, turnInfo, _id} = game;
    const value = {turn, setTurn};
    return(
        <GameContext.Provider value={{game, setGame}}>
            <TurnContext.Provider value={value}>
                <div className="game-page">
                    <div className='game-board'>
                        <PlayerBoard index={1} openCards={openCards[0]}/>
                        <PlayerBoard index={2} openCards={openCards[1]}/>
                    </div>
                    <StatusBoard gameId={_id} status={status} winner={winner} playerIds={[playerId1, playerId2]} turnInfo={turnInfo}/>
                </div>
            </TurnContext.Provider>
        </GameContext.Provider>
    )
}