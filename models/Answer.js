// Importar dependencias
const mongoose = require('mongoose')
const config = require('./config')

// Crear modelo
const AnswerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: false
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

// Exportar modelo
const Answer = mongoose.model(config.schemasNames.answer, AnswerSchema)
module.exports = Answer