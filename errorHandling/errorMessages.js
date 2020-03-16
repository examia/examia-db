/*
 * Mensajes de error de cada modelo
 */
module.exports = {
  university: {
    duplicatedFieldId: {
      message: 'El id del área ya está en la universidad',
    },
  },
  field: {
    duplicatedExamId: {
      message: 'El id del examen ya está en la área',
    },
  },
  exam: {
    duplicatedSectionId: {
      message: 'El id de la sección ya está en el examen',
    },
  },
};
