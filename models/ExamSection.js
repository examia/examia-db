// Importar dependencias
const mongoose = require('mongoose');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo ExamSection
 * @class ExamSection
 * @mixes {ExamSectionSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {number} position - Posición de la sección den el examen
 * @property {Array.<mongoose.Types.ObjectId>} questions - Preguntas de la sección
 */
const ExamSectionSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true,
  },
  questions: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.question }],
    required: true,
    default: [],
  },
}, { timestamps: true });

/** @mixin */
ExamSectionSchema.statics;

/**
 * Agrega una pregunta a un examen
 * @param {mongoose.Types.ObjectId} examId - Id del examen
 * @param {mongoose.Types.ObjectId} questionId  - Id de la pregunta
 */
ExamSectionSchema.statics.addQuestion = async (examId, questionId) => {
  // Obtener examen y sus preguntas
  const examSection = await ExamSection.findById(examId);
  const { questions } = examSection;

  // Asegurarse de que la pregunta no está en el examen
  if (examSection.questions.indexOf(questionId) === -1) {
    // Actualizar campo 'questions' del examen
    return ExamSection.findOneAndUpdate({ _id: examId }, {
      questions: questions.concat([questionId]),
    }, { new: true });
  }

  // TODO: Modificar el manejo de errores
  throw new Error('La pregunta ya está en el examen');
};

// Exportar modelo
const ExamSection = mongoose.model(config.schemasNames.examSection, ExamSectionSchema);
module.exports = ExamSection;
