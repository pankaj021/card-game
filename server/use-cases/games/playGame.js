const getCardForPlayer = require('../cards/getCardForPlayer');
const doesPlayerWin = require('./doesPlayerWin');
const {TURN_EXPIRY} = require('../../constants')

module.exports = async (playerId, playerChoice, game) => {
    try {
        const playerIndex = game.playerId1 === playerId ? 0 : 1;
        if(playerId !== game.turnInfo.playerId) {
            throw new Error(`It's not your turn...`);
        }
        const openCards = [...game.openCards[0], ...game.openCards[1]];
        if(openCards.length === 52) game.status = "DRAW";
        else {
            const currTS = new Date().getTime();
            const startTS = new Date(game.turnInfo.startedAt).getTime();
            if(currTS - startTS > TURN_EXPIRY) playerChoice = "random";
            const card = getCardForPlayer(playerChoice, openCards);
            game.openCards[playerIndex].push(card);
            game.turnInfo = {
                "playerId": playerIndex ? game.playerId1 : game.playerId2,
                "startedAt": new Date().toISOString()
            }
            game.updatedAt = new Date().toISOString();
            if(doesPlayerWin(game.openCards[playerIndex])){
                game.winner = playerId;
                game.status = "ENDED";
            }
        }
        return game;
    } catch (error) {
        throw error;
    }
}