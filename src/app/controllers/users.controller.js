const usersService = require('../services/users.service');
const signupHelper = require('../_shared/helpers/signup.helper');
const signinHelper = require('../_shared/helpers/signin.helper');
const authHelper = require('../_shared/helpers/auth.helper');

class UsersController {
  async getById(req, res) {
    try {
      const userId = req.params.id;
      const token = authHelper.getAuthToken(req.headers.authorization);
      authHelper.verifyToken(token);

      const user = await usersService.getById(userId);

      if (!user) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
      }

      if (token !== user.token) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
      }

      if (!authHelper.validateSessionTime(user.ultimo_login, 30)) {
        return res.status(401).json({ mensagem: 'Sessão inválida' });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(err.status || 500).json({ mensagem: err.message });
    }
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
