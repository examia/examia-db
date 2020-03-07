// Importar dependencias
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// Importar configuración
const config = require('./config')

// Crear modelo University
const UniversitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  fields: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.field }],
    required: true,
    default: []
  }
}, { timestamps: true })

// Configurar uniqueValidator para el Schema
UniversitySchema.plugin(UniversitySchema)

// Exportar modelo
const University = mongoose.model(config.schemasNames.university, UniversitySchema)
module.exports = University