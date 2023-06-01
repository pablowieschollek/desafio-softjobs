const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const res = require('express')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'chapalapachala69',
    database: 'softjobs',
    allowExitOnIdle: true

})

const userRegister = async (user) => {
        let { email, password } = user
        const encryptedPassword = bcrypt.hashSync(password)
        password = encryptedPassword
        const values = [email, encryptedPassword]
        const query = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2)"
        await pool.query(query, values)
        res.status(400).send("Okay")
 }

const credentialsChecking = async (email, password) => {
        const values = [email]
        const query = "SELECT * FROM usuarios WHERE email = $1"
        const { rows: [user], rowCount } = await pool.query(query, values)
        const { password: encryptedPassword } = user
        const passwordIsCorrect = bcrypt.compareSync(password, encryptedPassword)
    
        if (!passwordIsCorrect || !rowCount)
            throw {code: 401, message: "Email o contraseña incorrecta"}
}

const getUser = async (email) => {
        const values = [email]
        const query = "SELECT * FROM usuarios WHERE email = $1"
        await pool.query(query, values)
}

module.exports = {
    userRegister,
    credentialsChecking, 
    getUser
}