// Importar dependencias
const mongoose = require('mongoose');
const config = require('./config');

/**
 * Genera el modelo Question
 * @class Question
 * @mixes {QuestionSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {mongoose.Types.ObjectId} examSectionId - Id de la sección del examen
 * @property {number} position - Posición de la pregunta
 * @property {string} text - Texto de la pregunta
 * @property {string} imageUrl - URL de la imagen asociada a la pregunta
 */
const QuestionSchema = new mongoose.Schema({
  examSectionId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
}, { timestamps: true });

/** @mixin */
QuestionSchema.statics;

/**
 * Busca las preguntas de una sección
 * @param {mongoose.Types.ObjectId} examSectionId - Id del examen
 */
QuestionSchema.statics.findByExamSectionId = function (examSectionId) {
  return Question.find({ examSectionId });
};

// Exportar modelo
const Question = mongoose.model(config.schemasNames.question, QuestionSchema);
module.exports = Question;
