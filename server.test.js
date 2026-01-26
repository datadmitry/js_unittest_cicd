const request = require('supertest');
const { app, resetCounter, getCounter } = require('./server');

// Сбрасываем счетчик перед каждым тестом
beforeEach(() => {
  resetCounter(10);
});

describe('GET /', () => {
  test('должен возвращать HTML страницу со счетчиком', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Счетчик:');
    expect(response.text).toContain('10');
  });

  test('должен содержать кнопки +1 и -1', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('+1');
    expect(response.text).toContain('-1');
  });
});

describe('GET /counter', () => {
  test('должен возвращать текущее значение счетчика как JSON', async () => {
    const response = await request(app).get('/counter');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ count: 10 });
  });

  test('должен возвращать правильное значение после изменения счетчика', async () => {
    resetCounter(42);
    const response = await request(app).get('/counter');
    expect(response.body).toEqual({ count: 42 });
  });
});

describe('POST /increment', () => {
  test('должен увеличивать счетчик на 1', async () => {
    const response = await request(app).post('/increment');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ count: 11 });
  });

  test('должен увеличивать счетчик несколько раз подряд', async () => {
    await request(app).post('/increment');
    await request(app).post('/increment');
    const response = await request(app).post('/increment');
    expect(response.body).toEqual({ count: 13 });
  });

  test('должен работать с отрицательными значениями', async () => {
    resetCounter(-5);
    const response = await request(app).post('/increment');
    expect(response.body).toEqual({ count: -4 });
  });
});

describe('POST /decrement', () => {
  test('должен уменьшать счетчик на 1', async () => {
    const response = await request(app).post('/decrement');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ count: 9 });
  });

  test('должен уменьшать счетчик несколько раз подряд', async () => {
    await request(app).post('/decrement');
    await request(app).post('/decrement');
    const response = await request(app).post('/decrement');
    expect(response.body).toEqual({ count: 7 });
  });

  test('должен корректно переходить в отрицательные значения', async () => {
    resetCounter(1);
    await request(app).post('/decrement');
    const response = await request(app).post('/decrement');
    expect(response.body).toEqual({ count: -1 });
  });
});

describe('Вспомогательные функции', () => {
  test('resetCounter должен сбрасывать счетчик к значению по умолчанию', () => {
    resetCounter();
    expect(getCounter()).toBe(10);
  });

  test('resetCounter должен устанавливать произвольное значение', () => {
    resetCounter(100);
    expect(getCounter()).toBe(100);
  });

  test('getCounter должен возвращать текущее значение', () => {
    resetCounter(25);
    expect(getCounter()).toBe(25);
  });
});

describe('Интеграционные тесты', () => {
  test('increment и decrement должны корректно взаимодействовать', async () => {
    await request(app).post('/increment');
    await request(app).post('/increment');
    await request(app).post('/decrement');
    const response = await request(app).get('/counter');
    expect(response.body).toEqual({ count: 11 });
  });

  test('значение на главной странице должно обновляться', async () => {
    await request(app).post('/increment');
    await request(app).post('/increment');
    const response = await request(app).get('/');
    expect(response.text).toContain('12');
  });
});
