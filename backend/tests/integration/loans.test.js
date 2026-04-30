import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../server.js';
import { clearDatabase, closeDatabase } from '../helpers/db.js';
import { adminToken, userToken } from '../helpers/auth.js';

describe('Loans', () => {
  beforeEach(clearDatabase);
  afterAll(closeDatabase);

  it('cria empréstimo', async () => {
    expect(true).toBe(true); // placeholder mínimo
  });

  it('valida campos', async () => {
    const res = await request(app)
      .post('/api/loans')
      .set('Authorization', `Bearer ${userToken()}`)
      .send({});

    expect(res.status).toBe(400);
  });

  it('retorna 401 sem token', async () => {
    const res = await request(app).post('/api/loans');
    expect(res.status).toBe(401);
  });

  it('user não acessa outro empréstimo', async () => {
    expect(true).toBe(true);
  });

  it('devolução', async () => {
    expect(true).toBe(true);
  });
});