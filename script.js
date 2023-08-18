class JogoForca {
imagem = document.getElementById("imagem");
palavra = document.getElementById("palavra");
leitor = document.getElementById("leitor");
mensagemTentativas = document.getElementById("tentativas");
btnTentar = document.getElementById("btnTentar");
btnResetar = document.getElementById("btnResetar");
mensagem = document.getElementById("mensagem");

palavras =`ABACATE,ABACAXI,ACEROLA,ACAI,ARACA,ABACATE,BACABA,BACURI,
    BANANA,CAJA,CAJU,CARAMBOLA,CUPUAÇU,GRAVIOLA,GOIABA,JABUTICABA,JENIPAPO,
    MACA,MANGABA,MANGA,MARACUJA,MURICI,PEQUI,PITANGA,PITAYA,SAPOTI,TANGERINA,
    UMBU,UVA,UVAIA`;

listaPalavras = this.palavras.split(',');

palavraSecreta = this.listaPalavras[parseInt(Math.random() * this.listaPalavras.length)];
palavraSecretaArray = this.palavraSecreta.split("");
palavraVisivel = this.palavraSecretaArray.map(p => "_");

tentativas = 5;

constructor(){
    this.iniciar();
}

iniciar() {
this.tentativas = 5;
this.mensagemTentativas.textContent = "Tentativas: " + this.tentativas;

this.imagem.src = ".\\imagens\\forca" + this.tentativas + ".png";

this.btnTentar.addEventListener('click', () => this.verificarResultado());
this.btnResetar.addEventListener('click', () => this.resetar());
}

verificarResultado() {
    let letra = this.leitor.value.toUpperCase();

    if(letra.length > 1) {
        this.mensagem.textContent = "Digite apenas uma letra!";
        return;
    }

    let ehCorreto = false;
    for(let i = 0; i < this.palavraSecretaArray.length; i++) {
        if(this.palavraSecretaArray[i] == letra) {
            this.palavraVisivel[i] = letra;
            ehCorreto = true;
        }
    }

    this.palavra.textContent = this.palavraVisivel.join("");
    this.leitor.value = "";
    if(ehCorreto) {

        this.mensagem.textContent = "Você acertou!"

        if(this.palavraEstaCerta()) {
            this.mensagem.textContent = "Parabéns você venceu!";
            this.btnTentar.disabled = true;
        }

        return;
    }

    this.tentativas--;
    this.imagem.src = ".\\imagens\\forca" + this.tentativas + ".png";

    if(this.tentativas == 0) {
        this.mensagem.textContent = "Você perdeu!";
        this.palavra.textContent = this.palavraSecreta;
        this.btnTentar.disabled = true;
        return;
    }

    this.mensagemTentativas.textContent = "Tentativas: " + this.tentativas;
    this.mensagem.textContent = "Você errou!";
}

palavraEstaCerta() {
    if(this.palavra.textContent.toUpperCase() == this.palavraSecreta)
        return true;

    return false;
}

resetar() {
    this.palavraSecreta = 
    this.listaPalavras[parseInt(Math.random() * this.listaPalavras.length)];
    this.palavraSecretaArray = this.palavraSecreta.split("");
    this.palavraVisivel = this.palavraSecretaArray.map(p => "_");

    this.palavra.textContent = this.palavraVisivel.join("");

    this.tentativas = 5;
    this.mensagemTentativas.textContent = "Tentativas: " + this.tentativas;

    this.imagem.src = ".\\imagens\\forca" + this.tentativas + ".png";

    this.leitor.value = "";
    this.btnTentar.disabled = false;
    this.mensagem.textContent = "Digite uma letra";
}

}


window.addEventListener('load', () => new JogoForca());