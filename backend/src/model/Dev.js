const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String, /* Como "bio" não é obrigatório não é preciso criar um objeto dela */
    avatar: {
        type: String,
        required: true,
    },
    likes: [{
        type: Schema.Types.ObjectId, // Tipo do ID que o mongo gera
        ref: 'Dev', // "Referente a que tipo de modelo?" ao Dev, semlhante a uma chave estrangeira
    }],
    deslikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev',
    }],
}, {
        timestamps: true, // Vai criar automaticamente os campos: createdAt  (data da criação) e updateAt(data do update)
    });

module.exports = model('Dev', DevSchema);