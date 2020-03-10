// Importar dependencas
const mongoose = require('mongoose')
const stubs = require('./stubs')
const config = require('./config')
const setupDatabase = require('./setupDatabase')
const eraseCollections = require('./eraseCollections')

describe('Universidades', () => {
  // Variables globales que se usarán para las pruebas
  let UniversityModel

  // Inicializar la base de datos antes de empezar las pruebas
  beforeAll(async () => {
    const database = await setupDatabase(config.databaseUrl)
    UniversityModel = database.UniversityModel
  })

  // Limpiar base de datos después de las pruebas
  afterAll(async () => {
    // Limpiar colleciones
    await eraseCollections()
    // Cerrar sesión de mongoose
    await mongoose.connection.close()
  })

  // Prueba para crear una universidad
  test('Crear una universidad', async () => {
    const fakeUniversity = stubs.generateFakeUniversity()

    // Guardar universidad en la base de datos
    const savedUniversity = new UniversityModel(fakeUniversity)
    await savedUniversity.save()

    expect(savedUniversity.title).toEqual(fakeUniversity.title)
    expect(savedUniversity.fields).toEqual([])
  })
})