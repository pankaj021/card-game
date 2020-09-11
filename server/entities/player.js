module.exports = (player) => {
    return {
        _id: player._id,
        name: player.name,
        isAvailable: player.isAvailable,
        winCount: player.winCount,
        createdAt: player.createdAt,
    }
}