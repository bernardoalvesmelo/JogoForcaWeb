const imagem = document.getElementById("imagem");
const palavra = document.getElementById("palavra");
const leitor = document.getElementById("leitor");
const mensagemTentativas = document.getElementById("tentativas");
const btnTentar = document.getElementById("btnTentar");
const btnResetar = document.getElementById("btnResetar");
const mensagem = document.getElementById("mensagem");

const palavras =`ABACATE,ABACAXI,ACEROLA,ACAI,ARACA,ABACATE,BACABA,BACURI,
    BANANA,CAJA,CAJU,CARAMBOLA,CUPUAÇU,GRAVIOLA,GOIABA,JABUTICABA,JENIPAPO,
    MACA,MANGABA,MANGA,MARACUJA,MURICI,PEQUI,PITANGA,PITAYA,SAPOTI,TANGERINA,
    UMBU,UVA,UVAIA`;

const listaPalavras = palavras.split(',');

let palavraSecreta = listaPalavras[parseInt(Math.random() * listaPalavras.length)];
let palavraSecretaArray = palavraSecreta.split("");
let palavraVisivel = palavraSecretaArray.map(p => "_");

let tentativas = 5;
mensagemTentativas.textContent = "Tentativas: " + tentativas;

imagem.src = ".\\imagens\\forca" + tentativas + ".png";

btnTentar.addEventListener('click', verificarResultado);
btnResetar.addEventListener('click', resetar);

function verificarResultado() {
    let letra = leitor.value.toUpperCase();

    if(letra.length > 1) {
        mensagem.textContent = "Digite apenas uma letra!";
        return;
    }

    let ehCorreto = false;
    for(let i = 0; i < palavraSecretaArray.length; i++) {
        if(palavraSecretaArray[i] == letra) {
            palavraVisivel[i] = letra;
            ehCorreto = true;
        }
    }

    palavra.textContent = palavraVisivel.join("");

    if(ehCorreto) {

        mensagem.textContent = "Você acertou!"

        if(palavraEstaCerta()) {
            mensagem.textContent = "Parabéns você venceu!";
            btnTentar.disabled = true;
        }

        return;
    }

    tentativas--;
    imagem.src = ".\\imagens\\forca" + tentativas + ".png";

    if(tentativas == 0) {
        mensagem.textContent = "Você perdeu!";
        palavra.textContent = palavraSecreta;
        btnTentar.disabled = true;
        return;
    }

    mensagemTentativas.textContent = "Tentativas: " + tentativas;
    mensagem.textContent = "Você errou!";
}

function palavraEstaCerta() {
    if(palavra.textContent.toUpperCase() == palavraSecreta)
        return true;

    return false;
}

function resetar() {
    palavraSecreta = listaPalavras[parseInt(Math.random() * listaPalavras.length)];
    palavraSecretaArray = palavraSecreta.split("");
    palavraVisivel = palavraSecretaArray.map(p => "_");

    palavra.textContent = palavraVisivel.join("");

    tentativas = 5;
    mensagemTentativas.textContent = "Tentativas: " + tentativas;

    imagem.src = ".\\imagens\\forca" + tentativas + ".png";

    leitor.value = "";
    btnTentar.disabled = false;
    mensagem.textContent = "Digite uma letra";
}
