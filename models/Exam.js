// Importar dependencias
const mongoose = require('mongoose');
const config = require('./config');

// Crear modelo
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
}, { timestamps: true });

// Exportar modelo
const Exam = mongoose.model(config.schemasNames.exam, ExamSchema);
module.exports = Exam;
