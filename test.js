console.log('=== Начало тестов ===');

// Простой тест 1
console.log('Тест 1: Проверка математики...');
if (2 + 2 === 4) {
  console.log('✅ 2 + 2 = 4 - правильно!');
} else {
  console.log('❌ Ошибка в математике!');
  process.exit(1);
}

// Простой тест 2
console.log('Тест 2: Проверка строк...');
const hello = 'Привет';
if (hello.length === 6) {
  console.log('✅ Длина слова "Привет" = 6 - правильно!');
} else {
  console.log('❌ Ошибка со строками!');
  process.exit(1);
}

console.log('=== Все тесты пройдены успешно! ===');