// Importar dependencias
const mongoose = require('mongoose');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo ExamSection
 * @class ExamSection
 * @mixes {ExamSectionSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {mongoose.Types.ObjectId} examId - Id del examen
 * @property {number} position - Posición de la sección den el examen
 */
const ExamSectionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

/** @mixin */
ExamSectionSchema.statics;

/**
 * Busca las secciones de un examen
 * @param {mongoose.Types.ObjectId} examId - Id del examen
 */
ExamSectionSchema.statics.findByExamId = (examId) => ExamSection.find({ examId });

// Exportar modelo
const ExamSection = mongoose.model(config.schemasNames.examSection, ExamSectionSchema);
module.exports = ExamSection;
