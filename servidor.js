const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())

const modelodeUsuario = mongoose.model('contas', new mongoose.Schema({
    email: String,
    password: String
}))

mongoose.connect("mongodb://localhost:27017/newdeal")
.then(function(){

app.get('/get/:email', async (req,res)=>{
    const usuarioEncontrado = await modelodeUsuario.findOne({email: req.params.email})
    console.log(usuarioEncontrado);
    res.send(usuarioEncontrado)
})
 
app.post('/post',async (req,res) =>{
    const usuarioCriado = await modelodeUsuario.create({email: req.body.email, password: req.body.password})
    res.send(usuarioCriado)
})

app.put('/put', async (req,res)=>{
    const usuarioAtualizado = await modelodeUsuario.findOneAndUpdate({email: req.body.email, password: req.body.password}, {email: req.body.newemail, password: req.body.newpassword})
    res.send(usuarioAtualizado)
})
  
app.delete('/delete', async (req,res)=>{
    const usuarioDeletado = await modelodeUsuario.deleteOne({email: req.body.email, password: req.body.password})
    res.send(usuarioDeletado)
})  

app.use((req,res)=>{
    res.send('Não foi possível encontrar sua rota')
})

app.listen(4000, ()=>console.log(`O servidor rodou :) ${4000}`))

})