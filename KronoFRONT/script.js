const inputUpload = document.getElementById('uploadImg');
const inputNome = document.getElementById("nome");
const button = document.getElementById("btn");

let url_imagem = "";
let nome = "";

// Pega o arquivo de imagem selecionado e converte para Base64
inputUpload.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            url_imagem = e.target.result; // String completa com a imagem
            console.log("Imagem carregada com sucesso!");
        };
        leitor.readAsDataURL(arquivo);
    } else {
        url_imagem = "";
        console.log("Nenhum arquivo selecionado.");
    }
});

// Evento de clique no botão Salvar Perfil
button.addEventListener("click", async () => {
    nome = inputNome.value.trim();

    // Validação básica
    if (!nome) {
        alert("Por favor, digite o nome do usuário.");
        return;
    }

    // Chama a função de envio
    await criar();
});

async function criar() {
    const novo = { "nome": nome, "url": url_imagem };

    try {
        // CORRIGIDO: Rota alterada para /usuarios
        const resposta = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(novo)
        });

        if (resposta.ok) {
            const resultado = await resposta.json();
            console.log('Criado com sucesso:', resultado);
            
            // Exibir mensagem de sucesso na tela
            document.getElementById('mensagem').innerText = "Perfil salvo com sucesso!";

            // Exibe a imagem recém-salva na galeria do HTML
            if (url_imagem) {
                const galeria = document.getElementById('galeria');
                galeria.innerHTML += `
                    <div class="imagem-card">
                        <img src="${url_imagem}" alt="Foto de ${nome}">
                    </div>
                `;
            }

            // Limpa os campos após salvar
            inputNome.value = "";
            inputUpload.value = "";
            url_imagem = "";
        } else {
            document.getElementById('mensagem').innerText = "Erro ao salvar perfil no servidor.";
        }

    } catch (error) {
        console.error("Erro ao enviar para o servidor:", error);
        document.getElementById('mensagem').innerText = "Erro ao conectar com o servidor.";
    }
}