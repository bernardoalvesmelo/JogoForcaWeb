import { JogoForca } from "./jogoForca.js";

export class JogoForcaTela {
    imagem = document.getElementById("imagem");
    palavra = document.getElementById("palavra");
    leitor = document.getElementById("leitor");
    mensagemTentativas = document.getElementById("tentativas");
    btnTentar = document.getElementById("btnTentar");
    btnResetar = document.getElementById("btnResetar");
    mensagem = document.getElementById("mensagem");
    teclado = document.getElementById("teclado");

    jogoForca = new JogoForca();

    constructor() {
        this.iniciar();
    }

    iniciar() {
        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.imagem.src = ".\\imagens\\forca" + this.jogoForca.tentativas + ".png";
        this.palavra.value = this.jogoForca.palavraVisivel.join('');

        this.btnTentar.addEventListener('click', () => this.verificarResultado());
        this.btnResetar.addEventListener('click', () => this.resetar());

        this.criarTeclado();
    }

    criarTeclado() {
        let alfabeto = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,y,z".split(',');
        
        alfabeto.forEach(l => {
            let botao = document.createElement("button");
            botao.textContent = l;
            botao.addEventListener('click', (e) => this.clicarBotao(e));
            this.teclado.appendChild(botao);
        });
    }

    clicarBotao(e) {
        this.leitor.value = e.target.textContent;
        this.verificarResultado();
    }

    verificarResultado() {
        let letra = this.leitor.value.toUpperCase();

        if (letra.length > 1) {
            this.mensagem.textContent = "Digite apenas uma letra!";
            return;
        }

        let ehCorreto = this.jogoForca.verificarLetras(letra);
        this.palavra.textContent = this.jogoForca.palavraVisivel.join("");
        this.leitor.value = "";

        if (ehCorreto) {
            this.mensagem.textContent = "Você acertou!"

            if (this.jogoForca.palavraEstaCerta()) {
                this.mensagem.textContent = "Parabéns você venceu!";
                this.btnTentar.disabled = true;
            }
            return;
        }

        this.imagem.src = ".\\imagens\\forca" + this.jogoForca.tentativas + ".png";

        if (this.jogoForca.jogoAcabou()) {
            this.mensagem.textContent = "Você perdeu!";
            this.palavra.textContent = this.jogoForca.palavraSecreta;
            this.btnTentar.disabled = true;
            return;
        }

        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.mensagem.textContent = "Você errou!";
    }


    resetar() {
        this.jogoForca.resetar();
        this.mensagemTentativas.textContent = "Tentativas: " + this.jogoForca.tentativas;
        this.imagem.src = ".\\imagens\\forca" + this.jogoForca.tentativas + ".png";
        this.leitor.value = "";
        this.palavra.textContent = this.jogoForca.palavraVisivel.join("");
        this.btnTentar.disabled = false;
        this.mensagem.textContent = "Digite uma letra";
    }
}