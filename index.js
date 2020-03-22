// Importar dependencias
const mongoose = require('mongoose');

// Importar modelos
const AnswerModel = require('./models/Answer');
const CommentModel = require('./models/Comment');
const ExamModel = require('./models/Exam');
const ExamSessionModel = require('./models/ExamSession');
const FieldModel = require('./models/Field');
const ExamSectionModel = require('./models/ExamSection');
const QuestionModel = require('./models/Question');
const SessionQuestionModel = require('./models/SessionQuestion');
const UniversityModel = require('./models/University');
const UserModel = require('./models/User');

/**
 * Conectarse a la base de datos y obtener los modelos
 * @param {String} databaseUrl
 */
module.exports = async function connect(databaseUrl) {
  // Conectarse a la base de datos
  await mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  // Configurar mongoose
  await mongoose.set('useCreateIndex', true);

  // Regresar los modelos
  return {
    AnswerModel,
    CommentModel,
    ExamModel,
    ExamSessionModel,
    FieldModel,
    ExamSectionModel,
    QuestionModel,
    SessionQuestionModel,
    UniversityModel,
    UserModel,
  };
};
