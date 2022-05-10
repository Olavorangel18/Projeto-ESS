const mongoose = require('mongoose')

const Notificacao = mongoose.model('Notificacao', {
    id: String,
    idEmpresa: String,
    idUsuario: String,
    assunto: String,
    titulo: String,
    mensagem: String
})

module.exports = Notificacao