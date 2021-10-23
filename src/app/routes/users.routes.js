const routes = require('express').Router();
const usersController = require('../controllers/users.controller');

routes.post('/users', usersController.signup);

routes.post('/users/signin', usersController.signin);

routes.get('/users/:id', usersController.getById);

routes.get('/users/list', usersController.list);

module.exports = routes;
