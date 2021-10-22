const usersRepository = require('../repositories/users.repository');
const createError = require('../_shared/helpers/error-handler.helper');
const moment = require('moment');

class UsersService {
  async list() {
    return await usersRepository.list();
  }

  async signup(userPayload) {
    if (await usersRepository.getByEmail(userPayload.email)) {
      throw createError(409, 'Email já existente');
    }

    userPayload.data_criacao = moment.utc();
    userPayload.data_atualizacao = userPayload.data_criacao;
    userPayload.ultimo_login = userPayload.data_criacao;

    /*
      hash password
      token -> persistir
    */
    return userPayload;
  }

  async signin() {
    return {};
  }
}

module.exports = new UsersService();
