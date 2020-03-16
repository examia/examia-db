// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');
const errorKeys = require('../errorHandling/errorKeys');

describe('Áreas', () => {
  // Variables globales que se usarán para las pruebas
  let FieldModel;
  let ExamModel;
  let fakeField;
  let createdField;
  let createdExam;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    FieldModel = database.FieldModel;
    ExamModel = database.ExamModel;
  });

  // Limpiar base de datos después de las pruebas
  afterAll(async () => {
    // Limpiar colleciones
    await eraseCollections();
    // Cerrar sesión de mongoose
    await mongoose.connection.close();
  });

  test('Crear una área', async () => {
    fakeField = stubs.generateFakeField();

    // Guardar área en la base de datos
    createdField = new FieldModel(fakeField);
    await createdField.save();

    expect(createdField.title).toEqual(fakeField.title);
    expect(Array.from(createdField.exams)).toEqual([]);
    expect(createdField.isActive).toEqual(true);
  });

  test('Obtener áreas activas - 1', async () => {
    const fields = await FieldModel.getActiveFields();
    expect(fields.length).toEqual(1);
  });

  test('Modificar el estado de actividad de una área', async () => {
    const isActive = false;
    // Actualizar área
    await FieldModel.changeActiveStatus(createdField._id, isActive);
    // Obtener área
    const updatedField = await FieldModel.findById(createdField._id);

    expect(updatedField.isActive).toEqual(isActive);
  });

  test('Obtener áreas activas - 0', async () => {
    const fields = await FieldModel.getActiveFields();
    expect(fields.length).toEqual(0);
  });

  test('Obtener áreas inactivas - 1', async () => {
    const fields = await FieldModel.getInactiveFields();
    expect(fields.length).toEqual(1);
  });

  test('Agregar un examen a una área - examen no existente', async () => {
    // Guardar examen en la base de datos
    createdExam = new ExamModel(stubs.generateFakeExam());
    await createdExam.save();

    // Guardar examen en la área
    const updatedField = await FieldModel.addExam(createdField._id, createdExam._id);

    expect(Array.from(updatedField.exams)).toEqual([createdExam._id]);
  });

  test('Agregar un examen a una área - examen existente', async () => {
    try {
      // Guardar examen en la área
      await FieldModel.addExam(createdField._id, createdExam._id);
    } catch (err) {
      expect(err.name).toEqual(errorKeys.duplicatedId);
    }
  });
});
