const mongodb = require('../_shared/config/mongodb.config');
const { ObjectId } = require('mongodb');

class UsersRepository {
  async list() {
    const db = await mongodb.connect();
    return await db.collection('users').find().toArray();
  }

  async getByEmail(email) {
    const db = await mongodb.connect();
    return await db.collection('users').findOne({ email });
  }

  async create(user) {
    const db = await mongodb.connect();
    return await db.collection('users').insertOne(user);
  }

  async update(userId, fieldsToUpdate) {
    const db = await mongodb.connect();
    return await db
      .collection('users')
      .updateOne({ _id: ObjectId(userId) }, fieldsToUpdate);
  }
}

module.exports = new UsersRepository();
