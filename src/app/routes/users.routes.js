const routes = require('express').Router();
const usersController = require('../controllers/users.controller');

routes.post('/users/signup', usersController.signup);

routes.post('/users/signin', usersController.signin);

routes.get('/users/:id', usersController.list);

module.exports = routes;
