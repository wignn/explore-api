import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';


jest.setTimeout(30000);

describe('authControler', () => {
  let app: INestApplication;
  let logger: Logger;
  let testService: TestService;
  let accessToken: string;
  let id: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    logger = app.get(WINSTON_MODULE_PROVIDER);
    testService = app.get(TestService);
  });
  afterEach(async () => {
    await app.close();
  });



  describe('POST /api/users', () => {
    afterAll(async () => {
      await testService.deleteAll();
    });

    beforeAll(async () => {
      await testService.deleteUser();
    });

    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: '',
          password: '',
          email: '',
          name: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    }, 30000);


    it('should be able to register', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'test',
          password: 'test1234',
          email: 'test@gmail.com',
          name: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
    }, 30000);

    it('should be rejected if users exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({
          username: 'test',
          password: 'test1234',
          email: 'test@gmail.com',
          name: 'test',
        });

      logger.info(response.body);
      expect(response.status).toBe(409);
    }, 30000);
  });

  describe('PATCH /api/auth/login', () => {
    beforeAll(async () => {
      await testService.createUser();
    });

    afterAll(async () => {
      await testService.deleteUser();
    });
    it('should be rejected if request is invalid', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/auth/login')
        .send({
          username: '',
          password: '',
        });

      logger.info(response.body);
      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    }, 30000);

    it('should be able to login', async () => {
      const response = await request(app.getHttpServer())
        .patch('/api/auth/login')
        .send({
          username: 'test',
          password: 'test1234',
        });

      logger.info(response.body);
      expect(response.status).toBe(200);
      expect(response.body.data.username).toBe('test');
      expect(response.body.data.name).toBe('test');
      expect(response.body.data.token).toBeDefined();
      accessToken = response.body.data.backendTokens.accessToken;
      id = response.body.data.id;
    }, 30000);
  });
});