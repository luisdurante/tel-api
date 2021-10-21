const routes = require('express').Router();
const usersController = require('../controllers/users.controller');

routes.post('/users/signup', (req, res) => {
  res.json({ data: 'true' });
});

routes.post('/users/signin', (req, res) => {
  res.json({ data: 'true' });
});

routes.get('/users/:id', usersController.list);

module.exports = routes;
