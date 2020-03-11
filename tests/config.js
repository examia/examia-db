// Importar dependencias
const dotenv = require('dotenv');

// Configurar dotenv si no se está en el entorno de producción
if (!process.env.PRODUCTION) {
  dotenv.config();
}

// Exportar objeto con la configuración
module.exports = {
  databaseUrl: process.env.DATABASE_URL,
};
