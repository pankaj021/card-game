const {findGameById} = require('./index');
const getCardForPlayer = require('../cards/getCardForPlayer');
const doesPlayerWin = require('./doesPlayerWin');
const {TURN_EXPIRY} = require('../../constants')

module.exports = async (gameId, playerId, playerChoice, redisClient) => {
    try {
        const redisData = await redisClient.get(gameId); 
        const game = redisData ? JSON.parse(redisData) : await findGameById(gameId);
        const playerIndex = game.playerId1 === playerId ? 0 : 1;
        if(playerId !== game.turnInfo.playerId) {
            throw new Error(`It's not ${playerId} turn...`);
        }
        const openCardObj = {...game.openCards[0], ...game.openCards[1]};
        if(game.status === "DRAW" || game.status === "ENDED") throw new Error("Game is already over...")
        if(Object.keys(openCardObj).length === 52) game.status = "DRAW";
        else {
            const currTS = new Date().getTime();
            const startTS = new Date(game.turnInfo.startedAt).getTime();
            if(currTS - startTS > TURN_EXPIRY) playerChoice = "random";
            const card = getCardForPlayer(playerChoice, openCardObj);
            game.openCards[playerIndex][card.id] = card;
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