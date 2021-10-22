const createError = require('./error-handler.helper');

function transformPayload(body) {
  if (!body.email || !body.senha) {
    return createError(401, 'Usuário e/ou senha inválidos');
  }

  return {
    email: `${body.email}`,
    senha: `${body.senha}`,
  };
}

module.exports = { transformPayload };
