import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { TestService } from './test.service';
import { TestModule } from './test.module';



jest.setTimeout(30000);

describe('userController', () => {
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
    

    afterAll(async () => {
        await app.close();
    });


    describe('GET /api/users', () => {
        afterAll(async () => {
            await testService.deleteUser();
        });

        beforeAll(async () => {
            await testService.createUser();
        });

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

        it('should be able to get user', async () => {
            const response = await request(app.getHttpServer())
                .get('/api/user/' + id)
                .set('x-api-key', `silvia`)
                .set('Authorization', `Bearer ${accessToken}`);

            logger.info(response.body);
            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
        })

        it('should be dont exist', async () => {
            const response = await request(app.getHttpServer())
                .get('/api/user/123')
                .set('x-api-key', `silvia`)
                .set('Authorization', `Bearer ${accessToken}`);

            logger.info(response.body);
            expect(response.status).toBe(200);
        })


    })

})