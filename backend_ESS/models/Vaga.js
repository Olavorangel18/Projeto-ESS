const mongoose = require('mongoose')

const Vaga = mongoose.model('Vaga', {
    id:String,
    nome:String,
    modalidade:String,
    salario:String,
    area:String,
    descricao:String,
    senioridade:String,
    idEmpresa:String,
    pessoas:Array,
    cadastrado:Boolean,
})

module.exports = Vaga