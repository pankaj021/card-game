const Player = require('../../models/Player');
const PlayerEntity = require('../../entities/player');

module.exports = {
    createPlayer: async (name) => {
        const newPlayer = new Player({name});
        const player = await newPlayer.save();
        return player && PlayerEntity(player);
    },
    findPlayerById: async (playerId) => {
        if(!playerId) return Promise.reject(new Error("Player id not provided"));
        const player = await Player.findById(playerId);
        return player && PlayerEntity(player);
    },
    findAllPleyers: async () => {
        const players = await Player.find();
        return players && players.map(player => player && PlayerEntity(player))
    },
    updatePlayerById: async (playerId, doc) => {
        if(!playerId) return Promise.reject(new Error("Player id not provided..."));
        if(!doc) return Promise.reject(new Error("Player document is not provided..."));
        return Player.findByIdAndUpdate(playerId, doc);
    },
    findPlayerByName: async (name) => {
        const player = await Player.findOne({name});
        return player && PlayerEntity(player);
    }
}