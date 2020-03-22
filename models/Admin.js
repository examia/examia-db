// Importar dependencias
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Importar configuración
const config = require('./config');

/**
 * Genera el modelo Admin
 * @class AdminModel
 * @mixes {Adminchema.statics}
 * @param {Object} - Objeto con todas las propiedades
 * @property {string} firstName - El nombre del administrador
 * @property {string} lastName - El apellido del administrador
 * @property {string} email - Correo electrónico del administrador
 * @property {string} password - Contraseña del administrador encriptada
 */
const AdminSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Configurar uniqueValidator para el Schema
AdminSchema.plugin(uniqueValidator);

/**
 * Obtener un administrador por su correo eletrónico
 * @param {string} email - Correo electrónico del usuario
 */
AdminSchema.statics.findByEmail = (email) => Admin.findOne({ email });

/**
 * Actualiza la contraseña de un usuario
 * @param {mongoose.Types.ObjectId} adminId - Id del administrador
 * @param {string} password - Nueva contraseña actualizada
 */
AdminSchema.statics.updatePassword = function (adminId, password) {
  return Admin.findOneAndUpdate({ _id: adminId }, { password }, { new: true });
};

// Exportar modelo
const Admin = mongoose.model(config.schemasNames.admin, AdminSchema);
module.exports = Admin;
