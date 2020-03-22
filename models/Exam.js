// Importar dependencias
const mongoose = require('mongoose');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo Exam
 * @class ExamModel
 * @mixes {ExamSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {mongoose.Types.ObjectId} fieldId - Id del área del examen
 * @property {number} year - Año del examen
 */
const ExamSchema = new mongoose.Schema({
  fieldId: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.field,
    required: true,
  },
  year: {
    type: Number,
    min: 0,
    required: true,
  },
}, { timestamps: true });

/** @mixin */
ExamSchema.statics;

/**
 * Obtiene los exámenes de una área
 * @param {mongoose.Types.ObjectId} fieldId - Id de la área
 */
ExamSchema.statics.findByFieldId = (fieldId) => Exam.find({ fieldId });

/**
 * Obtener exámenes por su año
 * @param {number} year - Año del que se buscan exámenes
 */
ExamSchema.statics.findByYear = async (year) => Exam.find({ year });

// Exportar modelo
const Exam = mongoose.model(config.schemasNames.exam, ExamSchema);
module.exports = Exam;
