// Importar dependencias
const mongoose = require('mongoose');
const config = require('./config');

/**
 * Genera el modelo Exam
 * @class ExamModel
 * @mixes {ExamSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {number} year - Año del examen
 * @property {Array.<mongoose.Types.ObjectId>} questions - Preguntas del examen
 * @property {boolean} isActive - Indica si la universidad está activa y puede ser usada
 */
const ExamSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  questions: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.question }],
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
ExamSchema.statics;

/**
 * Agrega una pregunta a un examen
 * @param {mongoose.Types.ObjectId} examId - Id del examen
 * @param {mongoose.Types.ObjectId} questionId  - Id de la pregunta
 */
ExamSchema.statics.addQuestion = async (examId, questionId) => {
  // Obtener examen y sus preguntas
  const exam = await Exam.findById(examId);
  const { questions } = exam;

  // Asegurarse de que la pregunta no está en el examen
  if (exam.questions.indexOf(questionId) === -1) {
    // Actualizar campo 'questions' del examen
    return exam.findOneAndUpdate({ _id: examId }, {
      questions: questions.concat([questionId]),
    });
  }

  // TODO: Modificar el manejo de errores
  throw new Error('La pregunta ya está en el examen');
};

/**
 * Obtener exámenes por su año
 * @param {number} year - Año del que se buscan exámenes
 */
ExamSchema.statics.findByYear = async (year) => Exam.find({ year });

/**
 *  Obtiene todos los exámenes activos
 */
ExamSchema.statics.getActiveExams = async () => Exam.find({ isActive: true });

/**
 *  Obtiene todos los exámens inactivos
 */
ExamSchema.statics.getInactiveExams = async () => Exam.find({ isActive: false });


// Exportar modelo
const Exam = mongoose.model(config.schemasNames.exam, ExamSchema);
module.exports = Exam;
