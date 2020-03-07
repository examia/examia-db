# ExamiaDB

## Setup
Puedes clonar este repositorio para contribuir a Examia, para instalar todo necesitas ejecutar el siguiente comando

```bash
npm install
```

## Instalación
Si quieres usar este repositorio tendrás que hacer lo siguiente

```bash
npm install examia-db
```

## Uso
Simplemente importa examia-db como una dependencia

```javascript
const setupDatabase = require('examia-db')

// Dentro de una función asíncrona
const models = await setupDatabase(database_url)
```