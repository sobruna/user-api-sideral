const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Banco conectado")
    } catch (error) {
        console.error("Erro: ", error.message)
    }
}

module.exports = {
    connect
}