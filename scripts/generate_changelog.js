const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Начало генерации changelog...');

try {
  // Получаем коммиты
  const gitLog = execSync('git log --oneline -10', { encoding: 'utf8' }).trim();
  
  if (!gitLog) {
    console.log('Коммитов не найдено');
    return;
  }
  
  console.log('Найдены коммиты:', gitLog.split('\n').length);
  
  // Создаем простой changelog
  let content = '# История изменений\n\n';
  content += 'Дата создания: ' + new Date().toLocaleDateString('ru-RU') + '\n\n';
  content += '## Последние изменения\n\n';
  
  // Добавляем каждый коммит
  const commits = gitLog.split('\n');
  commits.forEach(commit => {
    content += `- ${commit}\n`;
  });
  
  // Сохраняем файл
  const filePath = path.join(process.cwd(), 'changes.md');
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log('Файл changes.md создан успешно!');
  console.log('Путь:', filePath);
  
} catch (error) {
  console.error('Ошибка:', error.message);
  process.exit(1);
}