const {startGame, findGameById, findAllGames, updateById} = require('../use-cases/games');
const playGame = require('../use-cases/games/playGame');
const {NoResourceFound} = require('../errors/index');
const redisClient = require('../libs/redisClient');
const {GAME_EXPIRY} = require('../constants');

module.exports = {
    save: async (req, res, next) => {
        const {playerId1, playerId2} = req.body;
        try {
            const response = await startGame(playerId1, playerId2);
            redisClient.setex(
                `${response._id}`,
                GAME_EXPIRY,
                JSON.stringify(response)
            )
            return res.status(201).json(response);
        } catch(error){
            return next(error);
        }
    },
    findById: async (req, res, next) => {
        const {gameId} = req.params;
        try {
            const response = await findGameById(gameId);
            if(!response) return next(new NoResourceFound());
            return res.status(200).json(response);
        } catch(error) {
            return next(error);
        }
    },
    findAll: async (req, res, next) => {
        try {
            const response = await findAllGames();
            return res.status(200).json(response);
        } catch(error) {
            return next(error);
        }
    },
    updateById: async (req, res, next) => {
        const {gameId} = req.params;
        const {gameDoc} = req.body;
        try {
            const response = await updateById(gameId, gameDoc);
            return res.status(204).json(response);
        } catch(error) {
            return next(error);
        }
    },
    playGame: async (req, res, next) => {
        const {gameId} = req.params;
        const {playerId, playerChoice} = req.body;
        try {
            const game = await playGame(gameId, playerId, playerChoice, redisClient)
            await redisClient.setex(
                gameId,
                GAME_EXPIRY,
                JSON.stringify(game)
            )
            res.status(200).json(game);
            updateById(gameId, game);
        } catch (error) {
            next(error);
        }
    },
}
