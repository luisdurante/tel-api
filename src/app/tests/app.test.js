const app = require('../../server');
const mongodb = require('../_shared/config/mongodb.config');
const { ObjectId } = require('mongodb');
const request = require('supertest');

describe('POST /users', () => {
  describe('Given email and password', () => {
    it('Should return 201 Created - with user object', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          nome: 'User Test',
          email: 'usuariotest@hotmail.com',
          senha: '12345',
          telefones: [
            {
              numero: '12342342',
              ddd: '13',
            },
            {
              numero: '132333342',
              ddd: '11',
            },
          ],
        });

      expect(response.statusCode).toBe(201);
    });

    it('Should return 409 Conflict - Email is already in use', async () => {
      const response = await request(app).post('/users').send({
        email: 'usuariotest@hotmail.com',
        senha: '12345',
      });

      expect(response.statusCode).toBe(409);
    });
  });

  describe('Given just the password', () => {
    it('Should return 400 Bad Request - Email must be sent', async () => {
      const response = await request(app).post('/users').send({
        senha: '12345',
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({
        mensagem: 'Email deve ser enviado para o cadastro',
      });
    });
  });
});

describe('POST /users/signin', () => {
  it('Should return 200 OK - email and password matches', async () => {
    const response = await request(app).post('/users/signin').send({
      email: 'usuariotest@hotmail.com',
      senha: '12345',
    });

    expect(response.statusCode).toBe(200);
  });

  it('Should return 401 Unauthorized - Email or password are wrong', async () => {
    const response = await request(app).post('/users/signin').send({
      email: 'esseemailnaoexiste@hotmail.com',
      senha: '12345',
    });

    expect(response.statusCode).toBe(401);
  });
});

describe('GET /users', () => {
  let token;
  let userId;

  it('Should return 200 - Valid Session', async () => {
    const authResponse = await request(app).post('/users/signin').send({
      email: 'usuariotest@hotmail.com',
      senha: '12345',
    });

    token = authResponse.body.token;
    userId = ObjectId(authResponse.body._id).toString();

    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'usuariotest@hotmail.com',
        senha: '12345',
      });

    expect(response.statusCode).toBe(200);
  });

  it('Should return 401 - Unauthorized - Invalid Token', async () => {
    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer 6dsfd8fsdg8s423f`)
      .send({
        email: 'usuariotest@hotmail.com',
        senha: '12345',
      });

    expect(response.statusCode).toBe(401);
  });

  it('Should return 400 - Bad request - Invalid user id', async () => {
    const response = await request(app)
      .get(`/users/55gcg4`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'usuariotest@hotmail.com',
        senha: '12345',
      });

    expect(response.statusCode).toBe(400);
  });
});

afterAll(async () => {
  const db = await mongodb.connect();
  await db.collection('users').deleteOne({ email: 'usuariotest@hotmail.com' });
  await mongodb.close();
});
