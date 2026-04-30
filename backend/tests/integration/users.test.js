import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../server.js';
import { clearDatabase, closeDatabase } from '../helpers/db.js';
import { adminToken, userToken } from '../helpers/auth.js';

describe('Users', () => {
  beforeEach(clearDatabase);
  afterAll(closeDatabase);

  it('user não acessa listagem', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken()}`);

    expect(res.status).toBe(403);
  });

  it('admin acessa listagem', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken()}`);

    expect(res.status).toBe(200);
  });

  it('retorna 401 sem token', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(401);
  });

  it('respeita paginação', async () => {
    const res = await request(app)
      .get('/api/users?limit=1')
      .set('Authorization', `Bearer ${adminToken()}`);

    expect(res.body.limit).toBe(1);
  });

  it('retorna 404 user inexistente', async () => {
    const res = await request(app)
      .get('/api/users/999')
      .set('Authorization', `Bearer ${adminToken()}`);

    expect(res.status).toBe(404);
  });
});