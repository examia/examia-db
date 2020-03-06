// Importar dependencias
const mongoose = require('mongoose')
const config = require('./config')

// Crear modelo
const SuggestedContentSchema = new mongoose.Schema({
  text: {
    type: String,
    requied: true
  }
}, { timestamps: true })

// Exportar modelo
const SuggestedContent = mongoose.model(config.schemasNames.suggestedContent, SuggestedContentSchema)
module.exports = SuggestedContent