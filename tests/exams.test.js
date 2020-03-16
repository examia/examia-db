// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');

describe('Exámenes', () => {
  // Variables globales que se usarán para las pruebas
  let ExamModel;
  let fakeExam;
  let createdExam;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    ExamModel = database.ExamModel;
  });

  // Limpiar base de datos después de las pruebas
  afterAll(async () => {
    // Limpiar colleciones
    await eraseCollections();
    // Cerrar sesión de mongoose
    await mongoose.connection.close();
  });

  test('Crear un examen', async () => {
    fakeExam = stubs.generateFakeExam();

    // Guardar área en la base de datos
    createdExam = new ExamModel(fakeExam);
    await createdExam.save();

    expect(createdExam.title).toEqual(fakeExam.title);
    expect(Array.from(createdExam.sections)).toEqual([]);
  });

  test('Obtener exámenes de cierto año - 1', async () => {
    const exams = await ExamModel.findByYear(fakeExam.year);
    expect(exams.length).toEqual(1);
  });

  test('Obtener exámenes de cierto año - 0', async () => {
    const exams = await ExamModel.findByYear(fakeExam.year + 1);
    expect(exams.length).toEqual(0);
  });
});
