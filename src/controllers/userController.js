const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

const getAll = async (req, res) => {
  UserSchema.find(function (err, users) {
    //procurando o usuário com o mongoose
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(users);
  });
};

const createUser = async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  try {
    const newUser = new UserSchema(req.body);

    const savedUser = await newUser.save();

    res.status(200).json({
      message: "User adicionado com sucesso!",
      savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id);

    res.status(200).json({
      message: "User atualizado com sucesso!",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    await UserSchema.findByIdAndDelete(req.params.id);

    res.status(200).json({
      mensagem: `User deletado com sucesso!`,
    });
  } catch (err) {
    res.status(400).json({
      mensagem: err.message,
    });
  }
};

module.exports = {
  getAll,
  createUser,
  updateUserById,
  deleteUserById,
};