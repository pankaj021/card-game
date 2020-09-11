const Player = require('../../models/Player');
const PlayerEntity = require('../../entities/player');

module.exports = {
    createPlayer: async (name) => {
        const newPlayer = new Player({name});
        const player = await newPlayer.save();
        return Promise.resolve(PlayerEntity(player));
    },
    findPlayerById: (playerId) => {
        if(!playerId) return Promise.reject(new Error("Player id not provided"));
        return Player.findById(playerId);
    },
    findAllPleyers: () => {
        return Player.find();
    },
}