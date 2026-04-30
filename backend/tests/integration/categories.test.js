import { describe, it, expect, beforeEach, afterAll } from "vitest";
import request from 'supertest';
import app from "../../server.js";
import { clearDatabase, closeDatabase } from "../helpers/db.js";
import { adminToken, userToken } from "../helpers/auth.js";

async function createcategoria(token, data = {}) {
  return request(app)
  .post('/api/categories')
  .set('authorization', `Bearer ${token}`)
  .send({name: 'Categoria padrão', description: 'descrição padrão', ...data});
  
}

describe('Categories - CRUD', () => {
  beforeEach(async()=> {
    await clearDatabase()
  })


  afterAll(closeDatabase);

  it('deve criar uma categoria como admin e retorna 201', async() =>{
    const res = await createcategoria(adminToken(), {name:'Futebol'});

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Futebol');
    expect(res.body).toHaveProperty('id');
  });

  it('deve retornar 403 ao tentar criar categoria como user', async() => {
    const res = await createcategoria(userToken());
    expect(res.status).toBe(403)
  });

  it('deve retornar 400 quando name está ausente', async() => {
    const res = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${adminToken()}`)
      .send({description: 'Descrição aleatória'});

    expect(res.status).toBe(400);

  });

  it('deve listar categorias com paginação', async() => {
    await createcategoria(adminToken(), {name: 'futebol'})
    await createcategoria(adminToken(), {name: 'ação'})

    const res = await request(app)
      .get('/api/categories?page=1&limit=10')
      .set('authorization', `Bearer ${userToken()}`);
    
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(2)
});

it('deve retornar 404 ao buscar categoria inexistente', async() => {
  const res = await request(app)
    .get('/api/categories/9999999')
    .set('Authorization', `Bearer ${userToken()}`);

  expect(res.status).toBe(404)
})

it('deve atualizar um autor como admin', async() => {
  const created = await createcategoria(adminToken(), {name: 'Nome antigo'});
  const id = created.body.id


  const res = await request(app)
    .put(`/api/categories/${id}`)
    .set('Authorization', `Bearer ${adminToken()}`)
    .send({name: 'categoria nova'})
  
  expect(res.status).toBe(200);

})

  it('deve deletar uma categoria como admin e retornar 204', async () => {
    const created = await createcategoria(adminToken());
    const id = created.body.id;

    const res = await request(app)
      .delete(`/api/categories/${id}`)
      .set('Authorization', `Bearer ${adminToken()}`);

    expect(res.status).toBe(204);
  });
});

