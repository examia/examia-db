// Importar dependencias
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo University
 * @class UniversityModel
 * @mixes {UniversitySchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {string} title - El nombre de la universidad
 * @property {Array.<mongoose.Types.ObjectId>} fields - Las áreas de la universidad
 * @property {boolean} isActive - Indica si la universidad está activa y puede ser usada
 */
const UniversitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  fields: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.field }],
    required: true,
    default: [],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { timestamps: true });

/** @mixin */
UniversitySchema.statics;

// Configurar uniqueValidator para el Schema
UniversitySchema.plugin(uniqueValidator);

/**
 * Agrega una área a una universidad
 * @param {mongoose.Types.ObjectId} universityId - Id de la universidad
 * @param {mongoose.Types.ObjectId} fieldId  - Id del área
 */
// eslint-disable-next-line consistent-return
UniversitySchema.statics.addField = async (universityId, fieldId) => {
  // Obtener unviersidad y sus áreas
  const university = await University.findById(universityId);
  const { fields } = university;

  // Asegurarse de que no existe la área
  if (university.fields.indexOf(fieldId) === -1) {
    // Actualizar campos 'fields' de la universidad
    return University.findOneAndUpdate({ _id: universityId }, {
      fields: fields.concat([fieldId]),
    });
  }
  // TODO: Lanzar un error
};

/**
 *  Obtiene todas las universidades activas
 */
UniversitySchema.statics.getActiveUniversities = async () => University.find({ isActive: true });

/**
 *  Obtiene todas las universidades inactivas
 */
UniversitySchema.statics.getInactiveUniversities = async () => University.find({ isActive: false });

/**
 * Modifica el estado de actividad de una universidad
 * @param {mongoose.Types.ObjectId} universityId - Id de la universidad que se desea modificar
 * @param {mongoose.Types.ObjectId} isActive - Indica si la universidad está activa
 */
UniversitySchema.statics.changeActiveStatus = async (universityId, isActive) => University
  .findOneAndUpdate({ _id: universityId }, { isActive });

// Exportar modelo
const University = mongoose.model(config.schemasNames.university, UniversitySchema);
module.exports = University;
