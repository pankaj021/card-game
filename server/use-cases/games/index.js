const Game = require('../../models/Game');
const Player = require('../../models/Player');
const GameEntity = require('../../entities/game');
const {NoResourceFound, ApiReturnedError}   = require('../../errors');

module.exports = {
    startGame: async (playerId1, playerId2) => {
        try {
            let players = await Promise.all([
                Player.findById(playerId1),
                Player.findById(playerId2),
            ])
            if(!players[0] || !players[0].isAvailable) return Promise.reject(new NoResourceFound(`${playerId1} not found.`));
            if(!players[1] || !players[1].isAvailable) return Promise.reject(new NoResourceFound(`${playerId2} not found.`));
            const newGame = new Game({
                playerId1, 
                playerId2,
                turnInfo: {
                    playerId: playerId1,
                    startedAt: new Date().toISOString()
                }
            });
            const game = await newGame.save();
            return Promise.resolve(GameEntity(game));
        } catch (error) {
            return Promise.reject(new ApiReturnedError());            
        }
    },
    findGameById: (gameId) => {
        if(!gameId) return Promise.reject(new Error("Game id not provided..."));
        return Game.findById(gameId);
    },
    findAllGames: () => {
        return Game.find();
    },
    updateById: (gameId, gameDoc) => {
        if(!gameId) return Promise.reject(new Error("Game id not provided..."));
        if(!gameDoc) return Promise.reject(new Error("Game document is not provided..."));
        return Game.findByIdAndUpdate(gameId, gameDoc);
    }
}