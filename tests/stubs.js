// Importar dependencias
const faker = require('faker');

function generateFakeUniversity() {
  return {
    title: faker.random.arrayElement(['UNAM', 'Politécnico Nacional']),
  };
}

module.exports = {
  generateFakeUniversity,
};
