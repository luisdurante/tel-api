const usersService = require('../services/users.service');
const signupHelper = require('../_shared/helpers/signup.helper');
const signinHelper = require('../_shared/helpers/signin.helper');

class UsersController {
  async list(req, res) {
    const users = await usersService.list();
    return res.json({ data: users });
  }

  async signup(req, res) {
    try {
      const transformedPayload = signupHelper.transformPayload(req.body);
      const response = await usersService.signup(transformedPayload);
      return res.status(201).json(response);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.message });
    }
  }

  async signin(req, res) {
    try {
      const transformedPayload = signinHelper.transformPayload(req.body);
      const response = await usersService.signin(transformedPayload);
      return res.json(response);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.message });
    }
  }
}

module.exports = new UsersController();
