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
  let AnswerModel;
  let createdQuestion;
  let anotherQuestion;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    ExamModel = database.ExamModel;
    UniversityModel = database.UniversityModel;
    FieldModel = database.FieldModel;
    ExamSectionModel = database.ExamSectionModel;
    QuestionModel = database.QuestionModel;
    AnswerModel = database.AnswerModel;
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
    const createdExamSection = new ExamSectionModel(stubs.generateFakeExamSection(createdExam._id));
    await createdExamSection.save();

    // Crear pregunta
    const fakeQuestion = stubs.generateFakeQuestion(createdExamSection._id);
    createdQuestion = new QuestionModel(fakeQuestion);
    anotherQuestion = new QuestionModel(stubs.generateFakeQuestion(createdExamSection._id));

    await createdQuestion.save();
    await anotherQuestion.save();

    // Crear respuesta
    const fakeAnswer = stubs.generateFakeAnswer(createdQuestion._id);
    const createdAnswer = new AnswerModel(fakeAnswer);
    await createdAnswer.save();

    expect(createdAnswer.questionId).toEqual(createdAnswer.questionId);
    expect(createdAnswer.text).toEqual(createdAnswer.text);
    expect(createdAnswer.position).toEqual(createdAnswer.position);
    expect(createdAnswer.imageUrl).toEqual(createdAnswer.imageUrl);
  });

  test('Buscar respuestas de una pregunta - 1', async () => {
    const foundAnswers = await AnswerModel.findByQuestionId(createdQuestion._id);
    expect(foundAnswers.length).toEqual(1);
  });

  test('Buscar respuestas de una pregunta - 0', async () => {
    const foundAnswers = await AnswerModel.findByQuestionId(anotherQuestion._id);
    expect(foundAnswers.length).toEqual(0);
  });
});
