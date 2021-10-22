const usersRepository = require('../repositories/users.repository');
const createError = require('../_shared/helpers/error-handler.helper');
const authHelper = require('../_shared/helpers/auth.helper');
const moment = require('moment');
const { ObjectId } = require('mongodb');

class UsersService {
  async list() {
    return await usersRepository.list();
  }

  async getById(userId) {
    try {
      return await usersRepository.getById(userId);
    } catch (mongodbError) {
      throw createError(mongodbError.status || 500, mongodbError.message);
    }
  }

  async signup(userPayload) {
    if (await usersRepository.getByEmail(userPayload.email)) {
      throw createError(409, 'Email já existente');
    }

    userPayload.data_criacao = moment().toISOString();
    userPayload.data_atualizacao = userPayload.data_criacao;
    userPayload.ultimo_login = userPayload.data_criacao;
    userPayload.senha = await authHelper.hashPassword(userPayload.senha);

    try {
      const createdUser = await usersRepository.create(userPayload);
      const userId = ObjectId(createdUser.insertedId).toString();

      const generatedToken = authHelper.generateToken(userId);

      await usersRepository.findOneAndUpdate(userId, {
        token: generatedToken,
      });

      const createdUserWithToken = await usersRepository.getById(userId);

      return createdUserWithToken;
    } catch (mongodbError) {
      throw createError(500, mongodbError.message);
    }
  }

  async signin(userPayload) {
    const user = await usersRepository.getByEmail(userPayload.email);

    if (!user) {
      throw createError(401, 'Usuário e/ou senha inválidos');
    }

    if (!(await authHelper.comparePassword(userPayload.senha, user.senha))) {
      throw createError(401, 'Usuário e/ou senha inválidos');
    }

    const generatedToken = authHelper.generateToken(user._id);

    try {
      await usersRepository.findOneAndUpdate(user._id, {
        ultimo_login: moment().toISOString(),
        token: generatedToken,
      });

      const updatedUser = await usersRepository.getById(user._id);

      return updatedUser;
    } catch (mongodbError) {
      throw createError(500, mongodbError.message);
    }
  }
}

module.exports = new UsersService();
