import React from "react";

export const TurnContext = React.createContext({
    turn: {playerId: "", playerChoice: ""}, 
    setTurn: () => {}
});