const usersRepository = require('../repositories/users.repository');

class UsersService {
  async list() {
    return await usersRepository.list();
  }

  async signup() {
    return {};
  }

  async signin() {
    return {};
  }
}

module.exports = new UsersService();
