const express = require('express');
const cors = require('cors');

const app = express();

// Libera o acesso para o front-end
app.use(cors());

// Aceita JSON no corpo das requisições (limite de 10mb para imagens em Base64)
app.use(express.json({ limit: '10mb' }));

// Array temporário para armazenar os cadastros em memória
const usuarios = [];

// Rota POST: Recebe o cadastro do Front-End
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

// Rota GET: Lista todos os perfis salvos
app.get('/usuarios', (req, res) => {
    return res.status(200).json(usuarios);
});

// Inicia o servidor
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor Krono rodando com sucesso em http://localhost:${PORTA}`);
});