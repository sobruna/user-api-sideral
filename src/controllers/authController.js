const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET = process.env.SECRET

const login = (req, res) => {
    try {
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            if(!user) {
                return res.status(401).send({
                    message: "Usuário não encontrado",
                    email: `${req.body.email}`
                })
            }

            const validPassword = bcrypt.compareSync(req.body.password, user.password)
            // VALIDAÇÃO DA SENHA

            if(!validPassword) {
                return res.status(401).send({
                    message: "Senha ou Usuário incorreto"
                })
            }

            const token = jwt.sign({ name: user.name }, SECRET)

            res.status(200).send({
                message: "Login autorizado",
                token
            })
        })
    } catch(e) {
        console.error(e)
    }
}

module.exports = {
    login
}