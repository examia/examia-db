// Importar dependencias
const faker = require('faker');

function generateFakeUniversity() {
  return {
    title: faker.random.arrayElement(['UNAM', 'Politécnico Nacional']),
  };
}

function generateFakeField() {
  return {
    title: faker.random.arrayElement(['Área 1', 'Área 2', 'Área 3', 'Área 4']),
  };
}

function generateFakeExam() {
  return {
    year: faker.random.number(2020),
  };
}

module.exports = {
  generateFakeUniversity,
  generateFakeField,
  generateFakeExam,
};
