// Importar dependencias
const mongoose = require('mongoose');

module.exports = async function removeAllCollections() {
  // Obtener todas las collectiones
  const collections = Object.keys(mongoose.connection.collections)

  // Iterar por las collectiones
  for (const collectionName of collections) {
    // Borrar la colección
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}