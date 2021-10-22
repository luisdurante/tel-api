const mongodb = require('../_shared/config/mongodb.config');

class UsersRepository {
  async list() {
    const db = await mongodb.connect();
    return await db.collection('users').find().toArray();
  }

  async getByEmail(email) {
    const db = await mongodb.connect();
    return await db.collection('users').findOne({ email });
  }
}

module.exports = new UsersRepository();
