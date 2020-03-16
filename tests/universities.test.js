// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');

describe('Universidades', () => {
  // Variables globales que se usarán para las pruebas
  let UniversityModel;
  let fakeUniversity;
  let createdUniversity;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    UniversityModel = database.UniversityModel;
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
});
