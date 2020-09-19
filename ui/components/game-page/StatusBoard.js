import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import Choices from './Choices';
import { TurnContext } from '../context/TurnContext';
import { GameContext } from '../context/GameContext';

function isDisabled(game, playerId) {
    return game.winner ||  playerId !== game.turnInfo.playerId
}

function getGameResult(status, winner, players) {
    const STATUS = ['STARTED', 'DRAW', "ABORTED"];
    if(STATUS.indexOf(status) >= 0) return `Game ${status}.`;
    const pWinner = players.filter(player => player._id === winner)[0].name
    return `${pWinner} Won.`
}

export default function StatusBoard({status, gameId, winner, playerIds, turnInfo}) {
    const [players, setPlayers] = useState([]);
    const {turn, setTurn} = useContext(TurnContext);
    const {game, setGame} = useContext(GameContext);
    const [error, setError] = useState("");
    useEffect(() => {
        const pList = playerIds.map(playerId => Axios.get(`/players/${playerId}`));
        Promise.all(pList)
        .then(res => {
            setPlayers([res[0].data, res[1].data])
            setError("");
        })
        .catch(err => {
            setError(err);
        })
    }, []);
    const playGame = () => {
        turn && turn.playerChoice && 
        Axios.post(`/games/${gameId}/play`, turn)
        .then(res => {
            setGame(res.data);
            setTurn({...turn, playerId: res.data.turnInfo.playerId});
            setError("");
        })
        .catch(err => {
            setError(err.response.data.message)
        })
    }
    const [player1, player2] = players;
    if(!players.length) return <div>Loading.....</div>
    if(status === "DRAW" || status === "ENDED") {
        return(
            <div className='status-board'>
                <h1>{getGameResult(status, winner, players)}</h1>
            </div>
        )
    }
    return (
        <div className='status-board'>
            <h1>{getGameResult(status, winner, players)}</h1>
            {error && <h2 style={{color: "red"}}>{error}</h2>}
            <h3 className="player-siderbar">{player1 && player1.name || ""} (60 sec)</h3>
            {!isDisabled(game, playerIds[0]) && <Choices 
                playerId={playerIds[0]} 
                disabled={isDisabled(game, playerIds[0])} 
                onChange={(choice) => setTurn({...turn, playerChoice: choice})}
            />}
            <div className="play-game" onClick={playGame}>Play Game</div>
            <h3 className="player-siderbar">{player2 && player2.name || ""} (60 sec)</h3>
            {!isDisabled(game, playerIds[1]) && <Choices 
                playerId={playerIds[1]} 
                disabled={isDisabled(game, playerIds[1])} 
                onChange={(choice) => setTurn({...turn, playerChoice: choice})}
            />}
        </div>
    )
}   