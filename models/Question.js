// Importar dependencias
const mongoose = require('mongoose')
const config = require('./config')

// Crear modelo
const QuestionSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    required: false
  },
  answers: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.answer }],
    required: true,
    default: []
  },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.comment }],
    required: true,
    default: []
  },
  suggestedContent: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.suggestedContent }],
    required: true,
    default: []
  }
}, { timestamps: true })

// Exportar modelo
const Question = mongoose.model(config.schemasNames.question, QuestionSchema)
module.exports = Question