const express = require('express');
const routes = require('./app/routes/users.routes');
require('dotenv').config();

class App {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());

    this.express.use((err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ mensagem: 'JSON inválido' });
      }
      next();
    });
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
