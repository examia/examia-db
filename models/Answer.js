// Importar dependencias
const mongoose = require('mongoose');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo Answer
 * @class Answer
 * @mixes {AnswerSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {mongoose.Types.ObjectId} questionId - Id de la sección del examen
 * @property {string} text - Texto de la pregunta
 * @property {number} position - Posición de la pregunta
 * @property {string} imageUrl - URL de la imagen asociada a la pregunta
 * @property {boolean} isCorrect - Indica si la respuesta es correcta
 */
const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.question,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    min: 0,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

/** @mixin */
AnswerSchema.statics;

/**
 * Busca las respuestas de una pregunta
 * @param {mongoose.Types.ObjectId} questionId - Id del examen
 */
AnswerSchema.statics.findByQuestionId = function (questionId) {
  return Answer.find({ questionId });
};

// Exportar modelo
const Answer = mongoose.model(config.schemasNames.answer, AnswerSchema);
module.exports = Answer;
