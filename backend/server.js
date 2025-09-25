const express = require('express')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { log } = require('console')
 
const app = express();
const port = 5001;
 
const SECRET_KEY = '12345678910'
 
 
const localDados = path.join(__dirname, 'data/usuarios.json')
 
 
 
const consultarUsuarios = ()=>{
    const data = fs.readFileSync(localDados, 'utf-8');
    return JSON.parse(data)
}
 
const salvarUsuarios = ()=>{
    fs.writeFileSync(localDados, JSON.stringify(users, null, 2))
}
 
 
app.post('/register', async(req, res)=>{
    const {email, senha} = req.body;
   
    if(!email || !senha){
        return res.status(400).json({message: "Campos obrigatorios"})
    }
    const users = consultarUsuarios();
    if(users.find(user=>user.email == email)){
        return res.status(400).json({message: 'email ja cadastrado no banco de dados'})
    }
 
    const hashSenha = await bcrypt.hash(senha, 10)
    const novoUsuario = {id:Date.now, email, senha:hashSenha}
    users.push(novoUsuario)
    salvarUsuarios(users)
    res.status(200).json({message: 'Usuario registrado com suceso'})
})
 
app.post("/login", async (req, res)=>{
    const {email, senha} = req.body
    const users = consultarUsuarios();
    const user = users.find(user=>user.email === email)
 
    if (!user){
        return res.status(400).json({message: 'usuario ou senha invalidos'})
    }
 
    const senhavalida = await bcrypt.compare(senha, user.senha);
    if(!senhavalida){
        return res.status(400).json({message: ' senha invalida'})
    }
 
    const token = jwt.sign({id:user.id,email:user.email}, SECRET_KEY, {expiresIn:'10m'})
})
 
app.use(cors())
app.use(express.json())
 
app.listen(port, ()=>{
    console.log(`servidor rodando http://localhost:${port}`);
   
})