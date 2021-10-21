const usersService = require('../services/users.service');

class UsersController {
  async list(req, res) {
    const users = await usersService.list();
    return res.json({ data: users });
  }

  async signup(req, res) {
    return {};
  }

  async signin(req, res) {
    return {};
  }
}

module.exports = new UsersController();
