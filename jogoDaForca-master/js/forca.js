let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];
let jogoAutomatico = true;

carregaListaAutomatica();

criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() * palavras.length)
    
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    palavraSecretaDica = palavras[indexPalavra].dica;  // Adicionando a dica
    // console.log(palavraSecretaSorteada);
}

montarPalavraNaTela();
function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const dica = document.getElementById("dica");
    dica.innerHTML = palavraSecretaDica; // Mostra a dica o tempo todo

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for (let i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] === undefined) {
            if (palavraSecretaSorteada[i] === " ") {
                listaDinamica[i] = " ";
                palavraTela.innerHTML += "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>";
            } else {
                listaDinamica[i] = "&nbsp;";
                palavraTela.innerHTML += "<div class='letras'>" + listaDinamica[i] + "</div>";
            }
        } else {
            palavraTela.innerHTML += "<div class='letras'>" + listaDinamica[i] + "</div>";
        }
    }
}



function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();
    }    
}

function mudarStyleLetra(tecla, condicao){
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#515484";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#4d17bc";
        document.getElementById(tecla).style.color = "#ffffff";
    }

    
}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0){
            abreModal("TENTE NOVAMENTE!", "A palavra secreta era <br>" + palavraSecretaSorteada);
            piscarBotaoJogarNovamente(true);
        }
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
            }
        }
    }
    
    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false;
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você acertou a palavra secreta.");
        tentativas = 0;
        piscarBotaoJogarNovamente(true);
    }
}

// async function piscarBotaoJogarNovamente(){
//     while (jogarNovamente == true) {
//         document.getElementById("btnReiniciar").style.backgroundColor = 'red';
//         document.getElementById("btnReiniciar").style.scale = 1.3;
//         await atraso(500)
//         document.getElementById("btnReiniciar").style.backgroundColor = 'yellow';
//         document.getElementById("btnReiniciar").style.scale = 1;
//         await atraso(500)
//     }
// }

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))     
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background  = "url('./img/forca01.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background  = "url('./img/forca02.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background  = "url('./img/forca03.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background  = "url('./img/forca04.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background  = "url('./img/forca05.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background  = "url('./img/forca06.png')";
            break;
        default:
            document.getElementById("imagem").style.background  = "url('./img/forca.png')";
            break;
    }
}

function abreModal(titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel");
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});



const modal = document.getElementById("modal-alerta");

const btnAbreModal = document.getElementById("abreModalAddPalavra");
btnAbreModal.onclick = function(){
    modal.style.display = "block";
}

const btnFechaModal = document.getElementById("fechaModal");
btnFechaModal.onclick = function(){ 
    modal.style.display = "none";
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = ""; 
}

window.onclick = function(){ 
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = ""; 
    }  
}

function carregaListaAutomatica(){
    palavras = [
        palavra001 = {
            nome: "NEFRON",
            categoria: "PALAVRA 1",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra002 = {
            nome: "UREIA",
            categoria: "PALAVRA 2",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra003 = {
            nome: "BEXIGA",
            categoria: "PALAVRA 3",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra004 = {
            nome: "SISTEMA EXCRETOR",
            categoria: "PALAVRA 4",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra005 = {
            nome: "HOMEOSTASE",
            categoria: "PALAVRA 5",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra006 = {
            nome: "RINS",
            categoria: "PALAVRA 6",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra007 = {
            nome: "URETERES",
            categoria: "PALAVRA 7",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra008 = {
            nome: "URETRA",
            categoria: "PALAVRA 8",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra009 = {
            nome: "SECREÇÃO",
            categoria: "PALAVRA 9",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra010 = {
            nome: "EXCREÇÃO",
            categoria: "PALAVRA 10",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra011 = {
            nome: "MÚSCULO ",
            categoria: "PALAVRA 11",
            dica: "TRABALHO DE BIOLOGIA"
        },
        palavra012 = {
            nome: "ESFÍNCTER ",
            categoria: "PALAVRA 12",
            dica: "TRABALHO DE BIOLOGIA"
        },
    ];
}


function adicionarPalavra(){
    let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
    let addCategoria = document.getElementById("addCategoria").value.toUpperCase();
    let addDica = document.getElementById("addDica").value.toUpperCase();

    if (isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || isNullOrWhiteSpace(addDica) || addPalavra.length < 3 || addCategoria.length < 3 || addDica.length < 3) {
        abreModal("ATENÇÃO", "Palavra, Categoria e/ou Dica inválidos");
        return;
    }

    let palavra = {
        nome: addPalavra,
        categoria: addCategoria,
        dica: addDica
    };

    palavras.push(palavra);
    sortear();
    
    document.getElementById("addPalavra").value = "";
    document.getElementById("addCategoria").value = "";
    document.getElementById("addDica").value = "";
}


function isNullOrWhiteSpace(input){
    return !input || !input.trim();
}

function sortear(){
    if(jogoAutomatico == true){
        location.reload();  
    }
    else{
        if(palavras.length > 0){
            listaDinamica=[];
            criarPalavraSecreta();
            montarPalavraNaTela();
            resetaTeclas();
            tentativas = 6;
            piscarBotaoJogarNovamente(false);
        }
    }
}

function resetaTeclas(){
    let teclas = document.querySelectorAll(".teclas > button")
    teclas.forEach((x) =>{
        x.style.background = "#FFFFFF";
        x.style.color = "#8B008B";
        x.disabled = false;
    });
}


async function piscarBotaoJogarNovamente(querJogar){
    if(querJogar){
        document.getElementById("jogarNovamente").style.display = "block";
    }
    else{
        document.getElementById("jogarNovamente").style.display = "none";
    }
}


