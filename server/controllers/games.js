const {startGame, findGameById, findAllGames, updateGameById} = require('../use-cases/games');
const {findPlayerById, updatePlayerById} = require('../use-cases/players');
const playGame = require('../use-cases/games/playGame');
const {NoResourceFound, GameOver} = require('../errors/index');
const redisClient = require('../libs/redisClient');
const {GAME_EXPIRY} = require('../constants');

module.exports = {
    save: async (req, res, next) => {
        const {playerId1, playerId2} = req.body;
        try {
            let players = [await findPlayerById(playerId1), await findPlayerById(playerId2) ];
            if(!players[0] || !players[0].isAvailable) throw new NoResourceFound(`${playerId1} not found.`);
            if(!players[1] || !players[1].isAvailable) throw new NoResourceFound(`${playerId2} not found.`);
            const response = await startGame(playerId1, playerId2);
            players[0].isAvailable = false;
            players[1].isAvailable = false;
            await Promise.all([ 
                updatePlayerById(playerId1, players[0]),
                updatePlayerById(playerId2, players[1]),
            ])
            await redisClient.setex(
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
            const redisData = await redisClient.get(gameId);
            if(redisData){
                return res.status(200).json(JSON.parse(redisData));
            }
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
        const gameDoc = req.body;
        try {
            const response = await updateGameById(gameId, gameDoc);
            return res.status(204).json(response);
        } catch(error) {
            return next(error);
        }
    },
    playGame: async (req, res, next) => {
        const {gameId} = req.params;
        const {playerId, playerChoice} = req.body;
        try {
            const redisData = await redisClient.get(gameId); 
            const game = redisData ? JSON.parse(redisData) : await findGameById(gameId);
            if(game.status === "DRAW" || game.status === "ENDED") throw new GameOver("Game is already over...")
            const updatedGame = await playGame(playerId, playerChoice, game)
            await redisClient.setex(
                gameId,
                GAME_EXPIRY,
                JSON.stringify(updatedGame)
            )
            res.status(200).json(updatedGame);
            updateGameById(gameId, updatedGame);
            if(game.status === "DRAW" || game.status === "ENDED"){
                updatePlayerById(game.playerId1, {isAvailable: true});
                updatePlayerById(game.playerId2, {isAvailable: true});
            }
        } catch (error) {
            next(error);
        }
    },
}
