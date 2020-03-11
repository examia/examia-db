// Importar dependencias
const mongoose = require('mongoose');
const config = require('./config');

// Crear modelo
const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.user,
    required: true,
  },
  commentAbove: {
    type: mongoose.Types.ObjectId,
    ref: config.schemasNames.comment,
    required: true,
  },
  upVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  downVotes: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: {
    type: [{ type: mongoose.Types.ObjectId, ref: config.schemasNames.comment }],
    required: true,
    default: [],
  },
}, { timestamps: true });

// Exportar modelo
const Comment = mongoose.model(config.schemasNames.comment, CommentSchema);
module.export = Comment;
