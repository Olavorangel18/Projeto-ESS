const mongoose = require('mongoose')

const User = mongoose.model('User', {
  id: String,
  tipo:String,
  nome:String,
  email:String,
  password:String,
  cadastroPessoa:Object,
  cadastroEmpresa:Object,
  candidatado:Boolean,
  vagas:Array
})

module.exports = User
