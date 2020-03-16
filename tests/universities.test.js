// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');
const errorKeys = require('../errorHandling/errorKeys');

describe('Universidades', () => {
  // Variables globales que se usarán para las pruebas
  let UniversityModel;
  let FieldModel;
  let fakeUniversity;
  let createdUniversity;
  let createdField;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
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

  test('Crear una universidad', async () => {
    fakeUniversity = stubs.generateFakeUniversity();

    // Guardar universidad en la base de datos
    createdUniversity = new UniversityModel(fakeUniversity);
    await createdUniversity.save();

    expect(createdUniversity.title).toEqual(fakeUniversity.title);
    expect(Array.from(createdUniversity.fields)).toEqual([]);
  });

  test('Crear una universidad ya existente', async () => {
    try {
      // Guardar universidad en la base de datos
      const university = new UniversityModel(fakeUniversity);
      await university.save();
    } catch (err) {
      expect(err.name).toEqual('ValidationError');
    }
  });

  test('Obtener universidades activas - 1', async () => {
    const universities = await UniversityModel.getActiveUniversities();
    expect(universities.length).toEqual(1);
  });

  test('Modificar el estado de actividad de una universidad', async () => {
    const isActive = false;
    // Actualizar universidad
    await UniversityModel.changeActiveStatus(createdUniversity._id, isActive);
    // Obtener universidad
    const updatedUniversity = await UniversityModel.findById(createdUniversity._id);

    expect(updatedUniversity.isActive).toEqual(isActive);
  });

  test('Obtener universidades activas - 0', async () => {
    const universities = await UniversityModel.getActiveUniversities();
    expect(universities.length).toEqual(0);
  });

  test('Obtener universidades inactivas - 1', async () => {
    const universities = await UniversityModel.getInactiveUniversities();
    expect(universities.length).toEqual(1);
  });

  test('Agregar un área a una universidad - área no existente', async () => {
    // Guardar área en la base de datos
    createdField = new FieldModel(stubs.generateFakeField());
    await createdField.save();

    // Guardar área en la universidad
    const updatedUniversity = await UniversityModel.addField(
      createdUniversity._id,
      createdField._id,
    );

    expect(Array.from(updatedUniversity.fields)).toEqual([createdField._id]);
  });

  test('Agregar un área a una universidad - área existente', async () => {
    try {
      // Guardar área en la universidad
      const updatedUniversity = await UniversityModel.addField(
        createdUniversity._id,
        createdField._id,
      );

      expect(Array.from(updatedUniversity.fields)).toEqual([createdField._id]);
    } catch (err) {
      expect(err.name).toEqual(errorKeys.duplicatedId);
    }
  });
});
