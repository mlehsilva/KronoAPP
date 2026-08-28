const inputUpload = document.getElementById('uploadImg');
const inputNome = document.getElementById("nome");
const button = document.getElementById("btn");
const avatarPreview = document.getElementById('avatar-preview'); // Referência para a tag img do preview

let url_imagem = "";
let nome = "";

// Pega o arquivo de imagem selecionado, converte para Base64 E atualiza a visualização na hora
inputUpload.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
        const leitor = new FileReader();
        leitor.onload = function(e) {
            url_imagem = e.target.result; // String completa com a imagem (Base64)
            avatarPreview.src = url_imagem; // Atualiza a imagem na tela instantaneamente!
            console.log("Imagem carregada com sucesso!");
        };
        leitor.readAsDataURL(arquivo);
    } else {
        url_imagem = "";
        console.log("Nenhum arquivo selecionado.");
    }
});

// Evento de clique no botão Salvar Perfil
button.addEventListener("click", async (e) => {
    e.preventDefault(); // Evita que a página recarregue
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
            const mensagemEl = document.getElementById('mensagem');
            if (mensagemEl) mensagemEl.innerText = "Perfil salvo com sucesso!";

            // Exibe a imagem recém-salva na galeria do HTML (se existir a galeria na página)
            const galeria = document.getElementById('galeria');
            if (url_imagem && galeria) {
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
            
            // Opcional: Reseta a foto para o template padrão após salvar
            // avatarPreview.src = "url_do_icone_padrao.svg"; 

        } else {
            const mensagemEl = document.getElementById('mensagem');
            if (mensagemEl) mensagemEl.innerText = "Erro ao salvar perfil no servidor.";
        }

    } catch (error) {
        console.error("Erro ao enviar para o servidor:", error);
        const mensagemEl = document.getElementById('mensagem');
        if (mensagemEl) mensagemEl.innerText = "Erro ao conectar com o servidor.";
    }
}
