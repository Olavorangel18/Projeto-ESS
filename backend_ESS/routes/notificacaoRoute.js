const router = require('express').Router()

const Notificacao = require('../models/Notificacao')

router.post('/', async (req, res) => {
    const { id, idEmpresa, idUsuario, assunto, titulo, mensagem} = req.body
  
    const notificacao = {
        id,
        idEmpresa,
        idUsuario,
        assunto,
        titulo,
        mensagem,
    }
  
    try {
      await Notificacao.create(notificacao)
  
      res.status(201).json({ message: 'Notificação inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const notificacao = await Notificacao.find()
  
      res.status(200).json(notificacao)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const notificacao = await Notificacao.findOne({ id: id })
  
      if (!notificacao) {
        res.status(422).json({ message: 'Notificacao não encontrada!' })
        return
      }
  
      res.status(200).json(notificacao)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
   
  module.exports = router;