const createError = require('./error-handler.helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function transformPayload(body) {
  if (!body.email || !body.senha) {
    return createError(401, 'Usuário e/ou senha inválidos');
  }

  return {
    email: `${body.email}`,
    senha: `${body.senha}`,
  };
}

async function comparePassword(password, hashedPassword) {
  const foundPassword = await bcrypt.compare(password, hashedPassword);

  return foundPassword;
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 1800 });
}

module.exports = { comparePassword, transformPayload, generateToken };
