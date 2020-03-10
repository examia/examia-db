// Importar dependencias
const setupDatabase = require('../')

let database

module.exports = async function (databaseUrl) {
  // Iniciar base de datos si no se ha iniciado
  if (!database) {
    database = await setupDatabase(databaseUrl)
  }

  return database
}