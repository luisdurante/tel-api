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

  async getById(userId) {
    const db = await mongodb.connect();
    return await db.collection('users').findOne({ _id: ObjectId(userId) });
  }

  async create(user) {
    const db = await mongodb.connect();
    return await db.collection('users').insertOne(user);
  }

  async findOneAndUpdate(userId, fieldsToUpdate) {
    const db = await mongodb.connect();
    return await db
      .collection('users')
      .findOneAndUpdate(
        { _id: ObjectId(userId) },
        { $set: fieldsToUpdate },
        { returnNewDocument: true }
      );
  }
}

module.exports = new UsersRepository();
