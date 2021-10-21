const usersService = require('../services/users.service');

class UsersController {
  async list(req, res) {
    const users = await usersService.list();
    return res.json({ data: users });
  }
}

module.exports = new UsersController();
