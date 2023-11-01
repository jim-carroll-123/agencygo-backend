import request from 'supertest';
import { App } from '@/app';
import { ShiftRoute } from '@routes/shift.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Shifts Route', () => {
  describe('[GET] /shifts', () => {
    it('response statusCode 200 / findAll', () => {
      const shiftsRoute = new ShiftRoute();
      const app = new App([shiftsRoute]);

      return request(app.getServer()).get(`${shiftsRoute.path}`).expect(200);
    });
  });

  describe('[POST] /shifts', () => {
    it('response statusCode 201 / create', () => {
      const shiftsRoute = new ShiftRoute();
      const app = new App([shiftsRoute]);

      return request(app.getServer()).post(`${shiftsRoute.path}`).send({}).expect(201);
    });
  });

  describe('[DELETE]/shifts', () => {
    it('response statusCode 200 / delete', () => {
      const shiftsRoute = new ShiftRoute();
      const app = new App([shiftsRoute]);

      return request(app.getServer()).delete(`${shiftsRoute.path}`).expect(200);
    });
  });
});
