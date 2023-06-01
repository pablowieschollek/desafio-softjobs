const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { userRegister, credentialsChecking, getUser } = require('./queries')

app.use(express.json())
app.use(cors())

app.listen(3000, () => console.log("Servidor encendido"))

app.post("/usuarios", async (req, res) => {
    try {
        const user = req.body
        await userRegister(user)
        res.send("Usuario registrado exitosamente")
        userRegister()
    } catch (err) {
        res.status(500).send(err)
    }
})
app.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body
        await credentialsChecking(email, password)
        const token = jwt.sign({email}, "az_AZ")
        res.send(token)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get("/usuarios", async (req, res) => {
    try {
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token, "az_AZ")
        const { email } = jwt.decode(token)
        await getUser(email)
        res.send(`El usuario ${email} está logeado correctamente`)
    } catch (err) {
        res.status(500).send(err) 
    }
})