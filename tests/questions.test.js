// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');

describe('Preguntas', () => {
  // Variables globales que se usarán para las pruebas
  let ExamModel;
  let UniversityModel;
  let FieldModel;
  let ExamSectionModel;
  let QuestionModel;
  let createdExamSection;
  let anotherExamSection;
  let createdQuestion;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    ExamModel = database.ExamModel;
    UniversityModel = database.UniversityModel;
    FieldModel = database.FieldModel;
    ExamSectionModel = database.ExamSectionModel;
    QuestionModel = database.QuestionModel;
  });

  // Limpiar base de datos después de las pruebas
  afterAll(async () => {
    // Limpiar colleciones
    await eraseCollections();
    // Cerrar sesión de mongoose
    await mongoose.connection.close();
  });

  test('Crear una pregunta', async () => {
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
    const createdExam = new ExamModel(fakeExam);
    await createdExam.save();

    // Crear una sección de un examen
    createdExamSection = new ExamSectionModel(stubs.generateFakeExamSection(createdExam._id));
    anotherExamSection = new ExamSectionModel(stubs.generateFakeExamSection(createdExam._id));

    await createdExamSection.save();
    await anotherExamSection.save();

    // Crear pregunta
    const fakeQuestion = stubs.generateFakeQuestion(createdExamSection._id);
    createdQuestion = new QuestionModel(fakeQuestion);

    await createdQuestion.save();

    expect(createdQuestion.examSectionId).toEqual(fakeQuestion.examSectionId);
    expect(createdQuestion.text).toEqual(fakeQuestion.text);
    expect(createdQuestion.position).toEqual(fakeQuestion.position);
    expect(createdQuestion.imageUrl).toEqual(fakeQuestion.imageUrl);
  });

  test('Buscar preguntas de una sección - 1', async () => {
    const foundQuestions = await QuestionModel.findByExamSectionId(createdExamSection._id);
    expect(foundQuestions.length).toEqual(1);
  });

  test('Buscar preguntas de una sección - 0', async () => {
    const foundQuestions = await QuestionModel.findByExamSectionId(anotherExamSection._id);
    expect(foundQuestions.length).toEqual(0);
  });
});
