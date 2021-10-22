const createError = require('./error-handler.helper');
const bcrypt = require('bcrypt');

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

module.exports = { comparePassword, transformPayload };
