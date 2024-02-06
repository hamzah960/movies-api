const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    watchList: [
        {
            movie: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movies'
            },
            watched: Boolean
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields with dates
})

module.exports = mongoose.model("Users", usersSchema);