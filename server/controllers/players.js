const {createPlayer, findPlayerByName, findPlayerById, findAllPleyers, updatePlayerById} = require('../use-cases/players');
const {NoResourceFound, ResourceAlreadyExists} = require('../errors/index');

module.exports = {
    save: async (req, res, next) => {
        const {name} = req.body;
        try {
            const player = await findPlayerByName(name)
            if(player) throw new ResourceAlreadyExists();
            const response = await createPlayer(name);
            return res.status(201).json(response);
        } catch(error){
            return next(error);
        }
    },
    findById: async (req, res, next) => {
        const {playerId} = req.params;
        try {
            const response = await findPlayerById(playerId);
            if(!response) return next(new NoResourceFound());
            return res.status(200).json(response);
        } catch(error) {
            return next(error);
        }
    },
    findAll: async (req, res, next) => {
        try {
            const response = await findAllPleyers();
            return res.status(200).json(response);
        } catch(error) {
            return next(error);
        }
    },
    updateById: async (req, res, next) => {
        try {
            const {playerId} = req.params;
            const playerDoc = req.body;
            const response = await updatePlayerById(playerId, playerDoc);
            return res.status(200).json(response);
        } catch(error) {
            return next(error);
        }
    },
}
