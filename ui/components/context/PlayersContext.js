import React from "react";

export const PlayersContext = React.createContext({
    gamePlayers: [], 
    setGamePlayers: () => {}
});