// Importar dependencias
const mongoose = require('mongoose')
const config = require('./config')

// Crear modelo
const ExamSessionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  questions: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.sessionQuestion }],
    required: true,
    default: []
  },
  finished: {
    type: Boolean,
    required: true,
    default: false
  },
  startedAt: {
    type: Date,
    required: true,
  },
  finishedAt: {
    type: Date,
    required: true,
  }
}, { timestamps: true })

// Exportar modelo
const ExamSession = mongoose.model(config.schemasNames.examSession, ExamSessionSchema)
module.exports = ExamSession