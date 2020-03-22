// Importar dependencas
const mongoose = require('mongoose');
const stubs = require('./stubs');
const config = require('./config');
const setupDatabase = require('./setupDatabase');
const eraseCollections = require('./eraseCollections');

describe('Administradores', () => {
  // Variables globales que se usarán para las pruebas
  let AdminModel;
  let createdAdmin;

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl);
    AdminModel = database.AdminModel;
  });

  // Limpiar base de datos después de las pruebas
  afterAll(async () => {
    // Limpiar colleciones
    await eraseCollections();
    // Cerrar sesión de mongoose
    await mongoose.connection.close();
  });

  test('Crear un administrador', async () => {
    const fakeAdmin = stubs.generatefakeAdmin();

    // Guardar administrador en la base de datos
    createdAdmin = new AdminModel(fakeAdmin);
    await createdAdmin.save();

    expect(createdAdmin.firstName).toEqual(fakeAdmin.firstName);
    expect(createdAdmin.lastName).toEqual(fakeAdmin.lastName);
    expect(createdAdmin.email).toEqual(fakeAdmin.email);
    expect(createdAdmin.password).toEqual(fakeAdmin.password);
  });

  test('Buscar un administrador por su email - 1', async () => {
    const foundAdmin = await AdminModel.findByEmail(createdAdmin.email);
    expect(foundAdmin.email).toEqual(createdAdmin.email);
  });

  test('Buscar un administrador por su email - 0', async () => {
    const foundAdmin = await AdminModel.findByEmail('ivnxyz@gmail.com');
    expect(foundAdmin).toEqual(null);
  });

  test('Actualizar la contraseña de un administrador', async () => {
    const newPassword = 'contraseña';
    const updatedAdmin = await AdminModel.updatePassword(createdAdmin._id, newPassword);
    expect(updatedAdmin.password).toEqual(newPassword);
  });
});
