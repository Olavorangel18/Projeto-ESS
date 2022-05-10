const router = require('express').Router()

const User = require('../models/User')

router.post('/', async (req, res) => {
    const { id, tipo, nome, email, password, cadastroPessoa, cadastroEmpresa, candidatado, vagas } = req.body
  
    const user = {
      id,
      tipo,
      nome,
      email,
      password,
      cadastroPessoa,
      cadastroEmpresa,
      candidatado,
      vagas
    }
    
    
    try {
      let usuario = await User.find({email:user.email})

      if(usuario.length == 0){
        await User.create(user)
        res.status(201).json({ message: 'Usuario inserido no sistema com sucesso!'})
      }else{
        res.status(401).json({ message: 'Usuario já existe!'})
      }

    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const usuario = await User.find()
  
      res.status(200).json(usuario)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const user = await User.findOne({ id: id })
  
      if (!user) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.put('/:id', async (req, res) => {
    const ids = req.params.id
  
    const { id, tipo, nome, email, password, cadastroPessoa, cadastroEmpresa, candidatado, vagas } = req.body
  
    const user = {
      id,
      tipo,
      nome,
      email,
      password,
      cadastroPessoa,
      cadastroEmpresa,
      candidatado,
      vagas
    }
    try {
      const updateduser = await User.updateOne({ id: ids }, user)
  
      if (updateduser.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  module.exports = router;