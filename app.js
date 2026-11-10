const express = require('express')
const mysql = require('mysql2/promise')

const conn = mysql.createPool({
    database:'db_eletro',
    user:'root',
    password: '',
    host:'localhost'
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', './views')

app.listen(3000)

// CATEGORIA
app.post('/categoria/criar', async (req,res) => {
    const {nome, descricao} = req.body

    const cmd = "INSERT INTO categoria (nome, descricao) VALUES (?,?);"
    const sql = await conn.query(cmd, [nome, descricao])

    if(sql[0].affectedRows == 0){

    }

    res.redirect('/categoria/lista')
})

app.get('/categoria/apagar/:id', async (req,res) => {
    const id = req.params.id

    const cmd = "DELETE FROM categoria WHERE id_categoria =?;"
    const sql = await conn.query(cmd, [id])

    if(sql[0].affectedRows == 0){

    }

    res.redirect('/categoria/lista')
})

app.post('/categoria/editar', async (req,res) => {
    const {id, nome, descricao} = req.body

    const cmd = "UPDATE categoria SET nome=?, descricao=? WHERE id_categoria=?;"
    const sql = await conn.query(cmd, [nome, descricao,id])

    if(sql[0].affectedRows == 0){

    }

    res.redirect('/categoria/lista')
})

app.get("/categoria/criar", async (req,res) => {
    await res.render("criar.ejs")
})

app.get("/categoria/editar/:id", async (req,res) => {
    const id = req.params.id
    const cmd = "SELECT * FROM categoria WHERE id_categoria = ?;"
    const sql = await conn.query(cmd, [id])
    
    const dado = sql[0]

    await res.render("editar.ejs", {dado:dado[0]})
})

app.get('/categoria/lista', async (req,res) => {
    let dados = []

    const cmd = "SELECT * FROM categoria;"
    const sql = await conn.query(cmd)

    if(sql[0].length > 0){
        dados = sql[0]
    }

    res.render('lista.ejs', {dados: dados})
})
