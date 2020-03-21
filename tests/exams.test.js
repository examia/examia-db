// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');

describe('Exámenes', () => {
  // Variables globales que se usarán para las pruebas
  let ExamModel;
  let UniversityModel;
  let FieldModel;
  let fakeExam;
  let createdExam;
  let createdField;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    ExamModel = database.ExamModel;
    UniversityModel = database.UniversityModel;
    FieldModel = database.FieldModel;
  });

  // Limpiar base de datos después de las pruebas
  afterAll(async () => {
    // Limpiar colleciones
    await eraseCollections();
    // Cerrar sesión de mongoose
    await mongoose.connection.close();
  });

  test('Crear un examen', async () => {
    // Generar una universidad
    const createdUniversity = new UniversityModel(stubs.generateFakeUniversity());
    await createdUniversity.save();

    // Generar una área
    const fakeField = stubs.generateFakeField(createdUniversity._id);

    // Guardar área en la base de datos
    createdField = new FieldModel(fakeField);
    await createdField.save();

    // Generar un examen
    fakeExam = stubs.generateFakeExam(createdField._id);

    // Guardar área en la base de datos
    createdExam = new ExamModel(fakeExam);
    await createdExam.save();

    expect(createdExam.title).toEqual(fakeExam.title);
  });

  test('Obtener exámenes de cierto año - 1', async () => {
    const exams = await ExamModel.findByYear(fakeExam.year);
    expect(exams.length).toEqual(1);
  });

  test('Obtener exámenes de cierto año - 0', async () => {
    const exams = await ExamModel.findByYear(fakeExam.year + 1);
    expect(exams.length).toEqual(0);
  });

  test('Obtener exámenes de una universidad', async () => {
    const exams = await ExamModel.findByFieldId(createdField._id);
    expect(exams.length).toEqual(1);
  });
});
