const mongoose = require('mongoose');

const GameSchema = {
    playerId1: { 
        type: mongoose.Schema.ObjectId, ref: 'Player',
        required: [true, "Enter player1 Id."]
    },
    playerId2: { 
        type: mongoose.Schema.ObjectId, ref: 'Player',
        required: [true, "Enter player2 Id."]
    },
    openCards: {
        type: [{}, {}],
        default: [{}, {}]
    },
    status: {
        type: String,
        enum : ['STARTED', 'ENDED', 'DRAW', "ABORTED"],
        default: 'STARTED'
    },
    winner: {
        type: mongoose.Schema.ObjectId, ref: 'Player',
        default: null
    },
    turnInfo : {
        playerId: {
            type: mongoose.Schema.ObjectId, ref: 'Player',
            default: null
        },
        startedAt: {
            type: Date,
            default: Date.now()
        }
    },
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    updatedAt: {
        type: Date, 
        default: Date.now()
    },
}

module.exports = mongoose.model('Game', GameSchema);
