const usersRepository = require('../repositories/users.repository');
const createError = require('../_shared/helpers/error-handler.helper');
const signupHelper = require('../_shared/helpers/signup.helper');
const signinHelper = require('../_shared/helpers/signin.helper');
const moment = require('moment');

class UsersService {
  async list() {
    return await usersRepository.list();
  }

  async signup(userPayload) {
    if (await usersRepository.getByEmail(userPayload.email)) {
      throw createError(409, 'Email já existente');
    }

    userPayload.data_criacao = moment().toISOString();
    userPayload.data_atualizacao = userPayload.data_criacao;
    userPayload.ultimo_login = userPayload.data_criacao;
    userPayload.senha = await signupHelper.hashPassword(userPayload.senha);

    const createdUser = usersRepository.create(userPayload);

    /*
      token -> persistir
    */
    return createdUser;
  }

  async signin(userPayload) {
    const user = await usersRepository.getByEmail(userPayload.email);

    if (!user) {
      throw createError(401, 'Usuário e/ou senha inválidos');
    }

    if (!(await signinHelper.comparePassword(userPayload.senha, user.senha))) {
      throw createError(401, 'Usuário e/ou senha inválidos');
    }

    try {
      await usersRepository.findOneAndUpdate(user._id, {
        ultimo_login: moment().toISOString(),
      });

      const updatedUser = await usersRepository.getById(user._id);

      return updatedUser;
    } catch (mongodbError) {
      throw createError(500, mongodbError.message);
    }
  }
}

module.exports = new UsersService();
