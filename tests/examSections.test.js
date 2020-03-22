// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');

describe('Secciones de exámenes', () => {
  // Variables globales que se usarán para las pruebas
  let ExamModel;
  let UniversityModel;
  let FieldModel;
  let ExamSectionModel;
  let createdExam;
  let anotherExam;
  let createdExamSection;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    ExamModel = database.ExamModel;
    UniversityModel = database.UniversityModel;
    FieldModel = database.FieldModel;
    ExamSectionModel = database.ExamSectionModel;
  });

  // Limpiar base de datos después de las pruebas
  afterAll(async () => {
    // Limpiar colleciones
    await eraseCollections();
    // Cerrar sesión de mongoose
    await mongoose.connection.close();
  });

  test('Crear una sección de un examen', async () => {
    // Generar una universidad
    const createdUniversity = new UniversityModel(stubs.generateFakeUniversity());
    await createdUniversity.save();

    // Generar una área
    const fakeField = stubs.generateFakeField(createdUniversity._id);

    // Guardar área en la base de datos
    const createdField = new FieldModel(fakeField);
    await createdField.save();

    // Generar un examen
    const fakeExam = stubs.generateFakeExam(createdField._id);

    // Guardar área en la base de datos
    createdExam = new ExamModel(fakeExam);
    anotherExam = new ExamModel(stubs.generateFakeExam(createdField._id));

    await createdExam.save();
    await anotherExam.save();

    // Crear una sección de un examen
    const fakeExamSection = stubs.generateFakeExamSection(createdExam._id);

    createdExamSection = new ExamSectionModel(fakeExamSection);
    await createdExamSection.save();

    expect(createdExamSection.examId).toEqual(createdExam._id);
    expect(createdExamSection.title).toEqual(fakeExamSection.title);
    expect(createdExamSection.position).toEqual(fakeExamSection.position);
  });

  test('Buscar secciones de un examen - 1', async () => {
    const foundSections = await ExamSectionModel.findByExamId(createdExam._id);
    expect(foundSections.length).toEqual(1);
  });

  test('Buscar secciones de un examen - 0', async () => {
    const foundSections = await ExamSectionModel.findByExamId(anotherExam._id);
    expect(foundSections.length).toEqual(0);
  });
});
