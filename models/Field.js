// Importar dependencias
const mongoose = require('mongoose');
const config = require('./config');

// Crear modelo
const FieldSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  exams: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.exam }],
    required: true,
    default: [],
  },
}, { timestamps: true });

// Exportar modelo
const Field = mongoose.model(config.schemasNames.field, FieldSchema);
module.exports = Field;
