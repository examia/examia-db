// Importar dependencias
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo User
 * @class UserModel
 * @mixes {Userchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {string} firstName - El nombre del usuario
 * @property {string} lastName - El apellido del usuario
 * @property {string} email - Correo electrónico del usuario
 * @property {boolean} isEmailVerified - Indica si el email del usuario está verificado
 * @property {string} password - Contraseña del usuario encriptada
 * @property {mongoose.Types.ObjectId} univeristy - Universidad del usuario
 * @property {mongoose.Types.ObjectId} field - Área del usuario
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  university: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.university,
    required: true,
  },
  field: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.field,
    required: true,
  },
}, { timestamps: true });

// Configurar uniqueValidator para el Schema
UserSchema.plugin(uniqueValidator);

/**
 * Obtener un usuario por su correo eletrónico
 * @param {string} email - Correo electrónico del usuario
 */
UserSchema.statics.findByEmail = (email) => User.findOne({ email });

/**
 * Obtiene los usuarios que requieren una verificación
 */
UserSchema.statics.requiresEmailVerification = () => User.find({ isEmailVerified });


/**
 * Actualiza el estado que indica si el email del usuario está verificado
 * @param {mongoose.Types.ObjectId} fieldId - Id del usuario
 */
UserSchema.methods.verifyEmail = (userId) => User.findOneAndUpdate({ _id: userId }, { isEmailVerified: true });

// Exportar modelo
const User = mongoose.model(config.schemasNames.user, UserSchema);
module.exports = User;
