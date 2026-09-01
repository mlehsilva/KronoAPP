const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const usuarios = [];

app.post('/usuarios', (req, res) => {
    const { nome, url } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: "O nome é obrigatório." });
    }

    const novoPerfil = {
        id: usuarios.length + 1,
        nome: nome,
        url: url || null
    };

    usuarios.push(novoPerfil);
    console.log("Novo perfil cadastrado no Krono:", novoPerfil);

    return res.status(201).json(novoPerfil);
});

app.get('/usuarios/db', (req, res) => {
    db.query("SELECT id, nome, senha FROM usuarios", (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Erro ao buscar usuários no banco de dados" });
        }
        res.json(results);
    });
});

app.get('/usuarios', (req, res) => {
    return res.status(200).json(usuarios);
});

app.listen(port, () => {
    console.log(`Servidor Krono rodando com sucesso em http://localhost:${port}`);
});
