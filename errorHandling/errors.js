// Importar dependencias
const errorKeys = require('./errorKeys');

// Definir errores
class DuplicatedId extends Error {
  constructor(message) {
    super(message);
    this.name = errorKeys.duplicatedId;
  }
}

module.exports = {
  DuplicatedId,
};
