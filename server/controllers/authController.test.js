import express from 'express';
import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import routes from '../routes/routes.js';
import User from '../models/userModel';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.create({
    userName: 'Testfirst',
    password: '$2b$10$E/HfVr36yaj/dSp.z5xQ1uz.VtoesM5v9HTwt46KWiGl7qSACv4OW',
    tokens: [],
  });
});

describe('POST /registration', () => {
  it('should register a user successfully', async () => {
    const res = await request(app).post('/registration').send({
      userName: 'Testsecond',
      password: '1111',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('user is registered');
  });
});
