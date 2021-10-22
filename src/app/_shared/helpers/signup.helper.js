const createError = require('./error-handler.helper');
const bcrypt = require('bcrypt');

function transformPayload(body) {
  const transformedPayload = {
    nome: body.nome || '',
    email: body.email || '',
    senha: body.senha || '',
    telefones: [],
  };

  if (!transformedPayload.email) {
    throw createError(400, 'Email deve ser enviado para o cadastro');
  }

  if (!transformedPayload.senha) {
    throw createError(400, 'Senha deve ser enviada para o cadastro');
  }

  transformedPayload.nome = `${transformedPayload.nome}`;
  transformedPayload.email = `${transformedPayload.email}`;
  transformedPayload.senha = `${transformedPayload.senha}`;

  if (!body.telefones || (body.telefones && !body.telefones.length)) {
    return transformedPayload;
  }

  body.telefones.forEach((phone) => {
    if (phone.numero && phone.ddd) {
      transformedPayload.telefones.push({
        numero: phone.numero || '',
        ddd: phone.ddd || '',
      });
    }
  });

  return transformedPayload;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hash(password, salt);
}

module.exports = { transformPayload, hashPassword };
