// Подключаем библиотеку express для создания сервера
const express = require('express');
const app = express();

// Счетчик (переменная, которая будет меняться)
let counter = 10;

// Функция для сброса счетчика (для тестов)
function resetCounter(value = 10) {
  counter = value;
}

// Функция для получения значения счетчика (для тестов)
function getCounter() {
  return counter;
}

// 1. Главная страница - показывает счетчик
app.get('/', (req, res) => {
  res.send(`<h1>Счетчик: ${counter}</h1>
           <button onclick="increment()">+1</button>
           <button onclick="decrement()">-1</button>
           <script>
             async function increment() {
               await fetch('/increment', {method: 'POST'});
               location.reload();
             }
             async function decrement() {
               await fetch('/decrement', {method: 'POST'});
               location.reload();
             }
           </script>`);
});

// 2. Получить значение счетчика
app.get('/counter', (req, res) => {
  res.json({ count: counter });
});

// 3. Увеличить счетчик на 1
app.post('/increment', (req, res) => {
  counter++;
  res.json({ count: counter });
});

// 4. Уменьшить счетчик на 1
app.post('/decrement', (req, res) => {
  counter--;
  res.json({ count: counter });
});

// Запускаем сервер только если файл запущен напрямую
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Сервер запущен!');
    console.log('Открой в браузере: http://localhost:3000');
  });
}

// Экспортируем для тестов
module.exports = { app, resetCounter, getCounter };
