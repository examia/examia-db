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
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true
  }
}, { timestamps: true })

// Configurar uniqueValidator para el Schema
UniversitySchema.plugin(uniqueValidator)

// Agregar una área a una universidad
UniversitySchema.statics.addField = async function (universityId, fieldId) {
  // Obtener unviersidad y sus áreas
  const university = await University.findById(universityId)
  const fields = university.fields

  // Asegurarse de que no existe la área
  if (university.fields.indexOf(fieldId) == -1) {
    // Actualizar campos 'fields' de la universidad
    return University.findOneAndUpdate({ _id: universityId }, {
      fields: fields.concat([fieldId])
    })
  } else {
    // TODO: Lanzar un error
  }
}

// Obtener todas las universidades
UniversitySchema.statics.getUniversities = async function () {
  return University.find({ isActive: true })
}

// Exportar modelo
const University = mongoose.model(config.schemasNames.university, UniversitySchema)
module.exports = University