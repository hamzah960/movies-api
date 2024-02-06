const Movie = require('../models/moviesModel');

exports.create = async (req, res) => {
    const { name, category, description } = req.body
    const movie = await Movie.create({
        name,
        category,
        description
    })
    res.json({ 
        success: true,
        data: movie
    })
}

exports.find = async (req, res) => {
    // const { id } = req.params

    const movie = await Movie.findById(req.params.id).select('-reviews')

    if(!movie) {
        res.status(404).send()
    }else {
        res.json({ 
            success: true,
            data: movie
        })
    }
}
exports.update = async (req, res) => {
    const { id } = req.params
    const { name, category, description } = req.body

    await Movie.findByIdAndUpdate(id, {
        $set: {
            name,
            category,
            description
        }
    })

    res.json({ success: true})
}

exports.delete = async (req, res) => {
    const { id } =req.params
    await Movie.deleteOne({_id: id})
                
    res.json({ success: true})
}
exports.list = async (req, res) => {
    const page = req.query?.page || 1
    const limit = 2
    const skip = (page - 1) * limit
    const movies = await Movie.find().select('-reviews').skip(skip).limit(limit)
    const total = await Movie.countDocuments()
    const pages = Math.ceil(total / limit)

    res.json({
        success :true ,
        pages: pages,
        data: movies
    })
}

exports.reviews = async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findById(id).select('-reviews._id')
    if (!movie) return res.status(404).send({success: false, msg:'Movie not found'})

    res.json({
        success: true,
        data: movie.reviews
    })
}

exports.addReview = async (req, res) => {
    const { id } = req.params;
    const { comment, rate} = req.body

    const movie = await Movie.findById(id)
    if (!movie) return res.status(404).send()

    const isRated = movie.reviews.findIndex(m => m.user == req.userId)
    if (isRated != -1) return res.status(400).send("You already rated this movie")

    const totalRate = movie.reviews.reduce((sum, review) => sum + review.rate, 0)
    const finalRate = (totalRate + rate ) / (movie.reviews.length + 1)
    await Movie.updateOne(
        { _id: id },
        {
            $push: {
                reviews: {
                    user: req.userId, comment, rate
                }
            },
            $set: { rate: finalRate }
        }
    )
    res.status(201).json({
        success: true
    })
}