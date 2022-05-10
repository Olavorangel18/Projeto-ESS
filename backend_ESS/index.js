// config inicial
const express = require('express')
var cors = require('cors')
const app = express()

var cors = require ('cors');

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

// depois do db
const mongoose = require('mongoose')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas

const userRoutes = require('./routes/userRoute')
app.use('/user', userRoutes)

const vagaRoutes = require('./routes/vagasRoute')
app.use('/vaga', vagaRoutes)

const notificacaoRoutes = require('./routes/notificacaoRoute')
app.use('/notificacao', notificacaoRoutes)

/* const notificacaoRoutes = require('./routes/notificacaoRoute')
app.use('/notificacao', notificacaoRoutes) */

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

//ESS@2022

mongoose
  .connect(
    'mongodb+srv://ESSProjett:ESS%402022@cluster0.qf8cy.mongodb.net/AgenciaEmprego?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
