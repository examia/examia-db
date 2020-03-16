// Importar dependencias
const mongoose = require('mongoose');
const errorMessages = require('../errorHandling/errorMessages');
const errors = require('../errorHandling/errors');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo Field
 * @class FieldModel
 * @mixes {FieldSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {string} title - El nombre del área
 * @property {Array.<mongoose.Types.ObjectId>} exams - Los exámenes del área
 * @property {boolean} isActive - Indica si la área está activa y puede ser usada
 */
const FieldSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  exams: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.exam }],
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
FieldSchema.statics;

/**
 * Agrega un examen a una área
 * @param {mongoose.Types.ObjectId} fieldId - Id del área
 * @param {mongoose.Types.ObjectId} examId  - Id del examen
 */
FieldSchema.statics.addExam = async (fieldId, examId) => {
  // Obtener área y sus exámenes
  const field = await Field.findById(fieldId);
  const { exams } = field;

  // Asegurarse de que el examen no está en la lista de exámenes
  if (field.exams.indexOf(examId) === -1) {
    // Actualizar campo 'exams' del área
    return Field.findOneAndUpdate({ _id: fieldId }, {
      exams: exams.concat([examId]),
    }, { new: true });
  }

  // Lanzar un error
  throw new errors.DuplicatedId(errorMessages.field.duplicatedExamId.message);
};

/**
 * Remueve un examen de una área
 * @param {mongoose.Types.ObjectId} fieldId - Id del área
 * @param {mongoose.Types.ObjectId} examId -Id del examen
 */
FieldSchema.statics.removeExam = async (fieldId, examId) => {
  // Obtener área y sus exámenes
  const field = await Field.findById(universityId);
  const { exams } = field;

  // Obtener índice del id del examen
  const examIndex = field.exams.indexOf(examId);

  // Asegurarse de que el examen está en la lista de exámenes
  if (examIndex !== -1) {
    // Remover examen
    exams.splice(examIndex, 1);

    // Actualizar campo 'exams' del área
    return Field.findOneAndUpdate({ _id: fieldId }, {
      exams,
    }, { new: true });
  }

  // TODO: Modificar el manejo de errores
  throw new Error('El examen no está en la área');
};

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
