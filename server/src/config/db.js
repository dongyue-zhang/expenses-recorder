const mongoose = require('mongoose')

module.exports = connectMongoDB = async () => {
    try {
        await mongoose.connect(
            'mongodb+srv://kloseta:zdy15994357865@cluster0.4h7eat9.mongodb.net/?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                keepAliveInitialDelay: 300000
            }
        )
    } catch (error) {
        console.error(error.message)
    }
}