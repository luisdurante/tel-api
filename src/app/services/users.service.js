const usersRepository = require('../repositories/users.repository');

class UsersService {
  async list() {
    return await usersRepository.list();
  }
}

module.exports = new UsersService();
