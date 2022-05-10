const router = require('express').Router()

const Vaga = require('../models/Vaga')

router.post('/', async (req, res) => {
    const { id, nome, modalidade, salario, area, descricao, senioridade, idEmpresa, pessoas, cadastrado } = req.body
  
    const vaga = {
        id,
        nome,
        modalidade,
        salario,
        area,
        descricao,
        senioridade,
        idEmpresa,
        pessoas,
        cadastrado,
    }
  
    try {
      await Vaga.create(vaga)
  
      res.status(201).json({ message: 'Vaga inserida no sistema com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const vaga = await Vaga.find()
  
      res.status(200).json(vaga)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  router.post('/filtro', async (req, res) => {

    const {modalidade, salario, senioridade} = req.body
  
    let vagaFiltrada = {
      modalidade,
      salario,
      senioridade
    }

    function construirFiltro(){

      if(vagaFiltrada.modalidade && vagaFiltrada.salario==undefined && vagaFiltrada.senioridade == undefined)
        vagaFiltrada = {
          modalidade
        }
      else if (vagaFiltrada.modalidade == undefined && vagaFiltrada.salario && vagaFiltrada.senioridade == undefined)
      vagaFiltrada = {
        salario
      }
      else if (vagaFiltrada.modalidade == undefined && vagaFiltrada.salario == undefined && vagaFiltrada.senioridade){
        vagaFiltrada = {
          senioridade
        }
      }
      else if (vagaFiltrada.modalidade && vagaFiltrada.senioridade && vagaFiltrada.salario == undefined)
      vagaFiltrada = {
        modalidade,
        senioridade
      }
      else if (vagaFiltrada.modalidade == undefined && vagaFiltrada.senioridade && vagaFiltrada.salario)
      vagaFiltrada = {
        senioridade,
        salario
      }
      else if (vagaFiltrada.modalidade && vagaFiltrada.senioridade==undefined && vagaFiltrada.salario){
        vagaFiltrada = {
          modalidade,
          salario
        }
      }
      else if (vagaFiltrada.modalidade && vagaFiltrada.senioridade && vagaFiltrada.salario){
        vagaFiltrada = {
          modalidade,
          salario,
          senioridade,
        }
      }

    }
    try {
      construirFiltro(vagaFiltrada)
      console.log(vagaFiltrada)
      const vaga = await Vaga.find(vagaFiltrada)
      
      res.status(200).json(vaga)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.get('/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const vaga = await Vaga.findOne({ id: id })
  
      if (!vaga) {
        res.status(422).json({ message: 'Vaga não encontrada!' })
        return
      }
  
      res.status(200).json(vaga)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.put('/:id', async (req, res) => {
    const ids = req.params.id
  
    const { id, nome, modalidade, salario, area, descricao, senioridade, idEmpresa, pessoas, cadastrado } = req.body
  
    const vaga = {
        id,
        nome,
        modalidade,
        salario,
        area,
        descricao,
        senioridade,
        idEmpresa,
        pessoas,
        cadastrado,
    }
    try {
      const updatedvaga = await Vaga.updateOne({ id: ids }, vaga)
  
      if (updatedvaga.matchedCount === 0) {
        res.status(422).json({ message: 'Vaga não encontrada!' })
        return
      }
  
      res.status(200).json(vaga)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  
  router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const vaga = await Vaga.findOne({ id: id })
  
    if (!vaga) {
      res.status(422).json({ message: 'Vaga não encontrada!' })
      return
    }
  
    try {
      await Vaga.deleteOne({ id: id })
  
      res.status(200).json({ message: 'Vaga removida com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })

  module.exports = router;