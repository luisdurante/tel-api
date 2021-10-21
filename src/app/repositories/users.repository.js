const mongodb = require('../../config/mongodb');

class UsersRepository {
  async list() {
    const db = await mongodb.connect();
    return await db.collection('users').find().toArray();
  }
}

module.exports = new UsersRepository();
