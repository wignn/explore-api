import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';

describe('UserController', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;
  let acseesToken: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });
  afterAll(async () => {
    await app.close(); 
  });

  

  describe('POST /api/users', () => {
    beforeEach(async () => {
      await testService.deleteAll();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: '',
          password: '',
          email: '',
          name: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test123',
          email: 'test@gmail.com',
          name: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
    });

    it('should be rejected if username already exists', async () => {
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .post('/api/users')
        .send({
          username: 'test',
          password: 'test123',
          email: 'test@gmail.com',
          name: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('PACTH /api/users/login', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/login')
        .send({
          username: '',
          password: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/login')
        .send({
          username: 'test',
          password: 'test123',
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.token).toBeDefined();
    });
  });

  describe('GET /api/users/current/:query', () => {
    const query = 'test';
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      const response = await request(app.getHttpServer())
        .patch('/api/users/login')
        .send({
          username: 'test',
          password: 'test123',
        });

      acseesToken = response.body.data.backendTokens.accessToken;
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/users/current/${query}`)
        .set('authorization', 'wrong');

      logger.info(response.body);

      expect(response.status).toBe(401);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to get user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/users/current/${query}`)
        .set('authorization', `Bearer ${acseesToken}`);

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
    });
  });

  describe('PATCH /api/users/current', () => {
    let id: string;
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
      id = (await testService.getUser()).id;
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('authorization', 'test')
        .send({
          bio: 'test12',
          name: 'test12',
        });

      logger.info(response.body);

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able update name', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/users/current')
        .set('authorization', 'test')
        .send({
          name: 'test updated',
          id: id,
        });

      logger.info(response.body);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.name).toBe('test updated');
    });
  });
  describe('PUT /api/users/current', () => {
    it('should be able reset password', async () => {
      let response = await request(app.getHttpServer())
        .put('/api/users/current')
        .set('authorization', `Bearer ${acseesToken}`)
        .send({
          email: 'test@gmail.com',
          password: 'updated',
          valToken: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
      await testService.deleteAll();
      await testService.createUser();
    });

    it('should be rejected if token is invalid', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .send({
          username: '',
        });

      logger.info(response.body);

      expect(response.status).toBe(404);
      expect(response.body.errors).toBeDefined();
    });

    it('should be able to logout user', async () => {
      const response = await request(app.getHttpServer())
        .delete('/api/users/current')
        .send({
          username: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data).toBe(true);

      const user = await testService.getUser();
      expect(user.token).toBeNull();
    });

    
  });
});
