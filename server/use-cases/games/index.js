const Game = require('../../models/Game');
const GameEntity = require('../../entities/game');
const {ApiReturnedError}   = require('../../errors');

module.exports = {
    startGame: async (playerId1, playerId2) => {
        try {
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
    findGameById: async (gameId) => {
        if(!gameId) return Promise.reject(new Error("Game id not provided..."));
        const game = await Game.findById(gameId);
        return game && GameEntity(games);
    },
    findAllGames: async () => {
        const games = await Game.find();
        return games && games.map(game => game && GameEntity(game));
    },
    updateGameById: async (gameId, gameDoc) => {
        if(!gameId) return Promise.reject(new Error("Game id not provided..."));
        if(!gameDoc) return Promise.reject(new Error("Game document is not provided..."));
        return Game.findByIdAndUpdate(gameId, {...gameDoc, updatedAt: new Date()});
    }
}