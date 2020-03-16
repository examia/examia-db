// Importar dependencias
const mongoose = require('mongoose');
const errorMessages = require('../errorHandling/errorMessages');
const errors = require('../errorHandling/errors');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo Exam
 * @class ExamModel
 * @mixes {ExamSchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {number} year - Año del examen
 * @property {Array.<mongoose.Types.ObjectId>} questions - Preguntas del examen
 */
const ExamSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  sections: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.examSection }],
    required: true,
    default: [],
  },
}, { timestamps: true });

/** @mixin */
ExamSchema.statics;

/**
 * Agrega una sección a un examen
 * @param {mongoose.Types.ObjectId} examId - Id del examen
 * @param {mongoose.Types.ObjectId} sectionId  - Id de la sección del examen
 */
ExamSchema.statics.addSection = async (examId, sectionId) => {
  // Obtener examen y sus secciones
  const examSection = await ExamSchema.findById(examId);
  const { sections } = examSection;

  // Asegurarse de que la sección no está en el examen
  if (examSection.sections.indexOf(sectionId) === -1) {
    // Actualizar campo 'sections' del examen
    return ExamSchema.findOneAndUpdate({ _id: examId }, {
      sections: sections.concat([sectionId]),
    }, { new: true });
  }

  // Lanzar un error
  throw new errors.DuplicatedId(errorMessages.exam.duplicatedSectionId);
};

/**
 * Obtener exámenes por su año
 * @param {number} year - Año del que se buscan exámenes
 */
ExamSchema.statics.findByYear = async (year) => Exam.find({ year });

// Exportar modelo
const Exam = mongoose.model(config.schemasNames.exam, ExamSchema);
module.exports = Exam;
