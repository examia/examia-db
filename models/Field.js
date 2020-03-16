// Importar dependencias
const mongoose = require('mongoose');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo Field
 * @class FieldModel
 * @mixes {FieldSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {mongoose.Types.ObjectId} university_id - Id de la universidad
 * @property {string} title - El nombre del área
 * @property {boolean} isActive - Indica si la área está activa y puede ser usada
 */
const FieldSchema = new mongoose.Schema({
  universityId: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.university,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
}, { timestamps: true });

/** @mixin */
FieldSchema.statics;

/**
 * Obtiene las áreas activas de una universidad
 * @param {mongoose.Types.ObjectId} universityId - Id de la universidad
 */
FieldSchema.statics.getActiveFieldsByUniversityId = (universityId) => Field.find({ universityId, isActive: true })

/**
 * Obtiene las áreas inactivas de una universidad
 * @param {mongoose.Types.ObjectId} universityId - Id de la universidad
 */
FieldSchema.statics.getInactiveFieldsByUniversityId = (universityId) => Field.find({ universityId, isActive: false });

/**
 *  Obtiene todas las áreas activas
 */
FieldSchema.statics.getActiveFields = async () => Field.find({ isActive: true });

/**
 *  Obtiene todas las áreas inactivas
 */
FieldSchema.statics.getInactiveFields = async () => Field.find({ isActive: false });

/**
 * Modifica el estado de actividad de una área
 * @param {mongoose.Types.ObjectId} fieldId - Id del área que se desea modificar
 * @param {mongoose.Types.ObjectId} isActive - Indica si la área está activa
 */
FieldSchema.statics.changeActiveStatus = async (fieldId, isActive) => Field
  .findOneAndUpdate({ _id: fieldId }, { isActive });

// Exportar modelo
const Field = mongoose.model(config.schemasNames.field, FieldSchema);
module.exports = Field;
