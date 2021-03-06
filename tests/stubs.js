// Importar dependencias
const faker = require('faker');

function generateFakeUniversity() {
  return {
    title: faker.random.arrayElement(['UNAM', 'Politécnico Nacional']),
    imageUrl: faker.image.imageUrl(),
  };
}

function generateFakeField(universityId) {
  return {
    universityId,
    title: faker.random.arrayElement(['Área 1', 'Área 2', 'Área 3', 'Área 4']),
  };
}

function generateFakeExam(fieldId) {
  return {
    fieldId,
    year: faker.random.number(2020),
  };
}

function generateFakeExamSection(examId) {
  return {
    examId,
    title: faker.random.arrayElement(['Español', 'Física', 'Matemáticas', 'Biología']),
    position: faker.random.number(5),
  };
}

function generateFakeQuestion(examSectionId) {
  return {
    examSectionId,
    text: faker.company.companyName(),
    position: faker.random.number(5),
    imageUrl: faker.image.imageUrl(),
  };
}

function generateFakeAnswer(questionId) {
  return {
    questionId,
    text: faker.company.companyName(),
    position: faker.random.number(5),
    imageUrl: faker.image.imageUrl(),
    isCorrect: faker.random.arrayElement([true, false]),
  };
}

function generatefakeAdmin() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

module.exports = {
  generateFakeUniversity,
  generateFakeField,
  generateFakeExam,
  generateFakeExamSection,
  generateFakeQuestion,
  generateFakeAnswer,
  generatefakeAdmin,
};
