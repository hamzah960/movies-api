const mongoose = require('mongoose');

const moviesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                comment: String,
                rate: Number
            }
        ],
        default: []
    }
}, {
    timestamps: true //creates createdAt and updatedAt fields
})

moviesSchema.set('toJSON',{
    virtuals: true,
    verstionKey: false,
    transform: (doc, ret) => {
        delete ret._id
    }
})

module.exports = mongoose.model("Movies", moviesSchema);