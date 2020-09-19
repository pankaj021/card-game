import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import GamePage from './game-page/GamePage';
import HomePage from './home-page/HomePage';
import './App.css';
import '../components/lib/index.css';
import {PlayersContext} from './context/PlayersContext';


export default function App() {
    const [gamePlayers, setGamePlayers] = useState([]);
    const value = { gamePlayers, setGamePlayers };
    return(
        <PlayersContext.Provider value={value}>
            <Router>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/game' component={GamePage}/>
                    <Route exact path='/game/:gameId' component={GamePage}/>
                </Switch>
            </Router>
        </PlayersContext.Provider>
    )
}