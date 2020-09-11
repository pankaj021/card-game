const mongoose = require('mongoose');
const PlayerSchema = {
    name: {
        type: String,
        required: [true, "Name can't be empty."]
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    winCount: {
        type: Number,
        default: 0
    }, 
    createdAt: {
        type: Date, 
        default: Date.now()
    }
}
module.exports = mongoose.model('Player', PlayerSchema);
