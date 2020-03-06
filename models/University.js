// Importar dependencias
const mongoose = require('mongoose')
const config = require('./config')

// Crear modelo University
const UniversitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fields: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.field }],
    required: true,
    default: []
  }
}, { timestamps: true })

// Exportar modelo
const University = mongoose.model(config.schemasNames.university, UniversitySchema)
module.exports = University