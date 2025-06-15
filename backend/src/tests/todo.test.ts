import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

const MONGO_TEST_URI = process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/todo_test';

// Use a higher timeout for slow DB operations
describe('ToDo API', () => {
  let server: any;
  let todoId: string;
  const todoData = {
    name: 'Test Todo',
    shortDescription: 'Test Desc',
    dateTime: new Date().toISOString(),
  };

  beforeAll(async () => {
    await mongoose.connect(MONGO_TEST_URI);
    server = app.listen(0); // random available port
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    server.close();
  });

  it('should add a todo', async () => {
    const res = await request(server).post('/api/todos').send(todoData);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(todoData.name);
    todoId = res.body._id;
  }, 10000);

  it('should list todos', async () => {
    const res = await request(server).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a todo', async () => {
    const res = await request(server)
      .put(`/api/todos/${todoId}`)
      .send({ name: 'Updated Todo' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Todo');
  });

  it('should delete a todo', async () => {
    const res = await request(server).delete(`/api/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Todo deleted');
  });
}); 