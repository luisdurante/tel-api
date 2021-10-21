const routes = require('express').Router();

routes.post('/users/signup', (req, res) => {
  res.json({ data: 'true' });
});

routes.post('/users/signin', (req, res) => {
  res.json({ data: 'true' });
});

routes.get('/users/:id', (req, res) => {
  res.json({ data: 'true' });
});

module.exports = routes;
