// Importar dependencias
const mongoose = require('mongoose')
const config = require('./config')

// Crear modelo
const SessionQuestionSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.question,
    required: true
  },
  selectedAnswer: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.answer,
    required: false
  }
}, { timestamps: true })

// Exportar modelo
const SessionQuestion = mongoose.model(config.schemasNames.sessionQuestion, SessionQuestionSchema)
module.exports = SessionQuestion