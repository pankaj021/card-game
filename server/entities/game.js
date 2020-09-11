module.exports = (game) => {
    return {
        _id: game._id,
        playerId1: game.playerId1,
        playerId2: game.playerId2,
        openCards: game.openCards,
        status: game.status,
        winner: game.winner,
        turnInfo: game.turnInfo,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt
    }
}