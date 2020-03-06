// Importar dependencias
const mongoose = require('mongoose')
const config = require('./config')

// Crear modelo User
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  university: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.university,
    required: true
  },
  field: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.field,
    required: true
  },
  exams: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.exam }],
    required: true,
    default: []
  }
}, { timestamps: true })

// Obtener un usuario por su email
UserSchema.statics.findByEmail = function (email) {
  return User.findOne({ email })
}

// Verificar si un usuario necesita confirmar su correo
UserSchema.methods.requiresEmailVerification = function () {
  return !this.isEmailVerified
}

// Exportar modelo
const User = mongoose.model(config.schemasNames.user, UserSchema)
module.exports = User