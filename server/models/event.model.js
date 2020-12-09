const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    description: {
        type: String,
        trim: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now()
    },

    place: {
        type: String,
        required: true,
    },

    latitude: {
        type: String,
    },

    longitude: {
        type: String
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    capacity: {
        type: Number,
    },


}, {
    timestamps: true
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;