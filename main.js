// DIFICULDADE DO JOGO
const DIFICULDADE = 2; // 1 = facil, 2 = dificil, 3 = impossivel/quebrado

// variaveis globais de controle
let carta_marcada = null;
let local_marcado = null;
let forca_local1_aliado = 0;
let forca_local2_aliado = 0;
let forca_local3_aliado = 0;
let forca_local1_inimigo = 0;
let forca_local2_inimigo = 0;
let forca_local3_inimigo = 0;
let turno = 0;
let energia_padrao = 0;
let energia_atual = 0;
let local_marcado_inimigo = null;
let energia_padrao_inimigo = 0;

// constantes globais de controle
const TURNO_MAXIMO = 7;
const ENERGIA_MAXIMA = 6;
const MAX_CARTAS_POR_LOCAL = 4;

// classe de cartas
class carta {
    constructor(imagem, id, poder, custo, nome, valor) {
        this.imagem = imagem;
        this.id = id;
        this.poder = poder;
        this.custo = custo;
        this.nome_id = id;
        this.nome_real = nome;
        this.valor = valor;
    }
}

// deck padrao
const deck = [
    new carta("./images/charmander.png", "carta_0", "1", "1", "Charmander", "0"),
    new carta("./images/charmander.png", "carta_1", "1", "1", "Charmander", "1"),
    new carta("./images/charmander_shiny.png", "carta_2", "2", "1", "Charmander", "2"),
    new carta("./images/charmilion.png", "carta_3", "2", "2", "Charmilion", "3"),
    new carta("./images/charmilion.png", "carta_4", "2", "2", "Charmilion", "4"),
    new carta("./images/charizard.png", "carta_5", "3", "3", "Charizard", "5"),
    new carta("./images/charizard.png", "carta_6", "4", "4", "Charizard", "6"),
    new carta("./images/ninetales.png", "carta_7", "3", "2", "Ninetales", "7"),
    new carta("./images/ninetales.png", "carta_8", "4", "3", "Ninetales", "8"),
    new carta("./images/moltres.png", "carta_9", "6", "4", "Moltres", "9"),
    new carta("./images/entei.png", "carta_10", "8", "5", "Entei", "10"),
    new carta("./images/hooh.png", "carta_11", "10", "6", "Ho-Oh", "11"),
];

// deck do jogador
let deck_aliado = [
    new carta("./images/charmander.png", "carta_0", "1", "1", "Charmander", "0"),
    new carta("./images/charmander.png", "carta_1", "1", "1", "Charmander", "1"),
    new carta("./images/charmander_shiny.png", "carta_2", "2", "1", "Charmander", "2"),
    new carta("./images/charmilion.png", "carta_3", "2", "2", "Charmilion", "3"),
    new carta("./images/charmilion.png", "carta_4", "2", "2", "Charmilion", "4"),
    new carta("./images/charizard.png", "carta_5", "3", "3", "Charizard", "5"),
    new carta("./images/charizard.png", "carta_6", "4", "4", "Charizard", "6"),
    new carta("./images/ninetales.png", "carta_7", "3", "2", "Ninetales", "7"),
    new carta("./images/ninetales.png", "carta_8", "4", "3", "Ninetales", "8"),
    new carta("./images/moltres.png", "carta_9", "6", "4", "Moltres", "9"),
    new carta("./images/entei.png", "carta_10", "8", "5", "Entei", "10"),
    new carta("./images/hooh.png", "carta_11", "10", "6", "Ho-Oh", "11"),
];


// deck da maquina
let deck_inimigo = [
    new carta("./images/charmander.png", "carta_0", "1", "1", "Charmander", "0"),
    new carta("./images/charmander.png", "carta_1", "1", "1", "Charmander", "1"),
    new carta("./images/charmander_shiny.png", "carta_2", "2", "1", "Charmander", "2"),
    new carta("./images/charmilion.png", "carta_3", "2", "2", "Charmilion", "3"),
    new carta("./images/charmilion.png", "carta_4", "2", "2", "Charmilion", "4"),
    new carta("./images/charizard.png", "carta_5", "3", "3", "Charizard", "5"),
    new carta("./images/charizard.png", "carta_6", "4", "4", "Charizard", "6"),
    new carta("./images/ninetales.png", "carta_7", "3", "2", "Ninetales", "7"),
    new carta("./images/ninetales.png", "carta_8", "4", "3", "Ninetales", "8"),
    new carta("./images/moltres.png", "carta_9", "6", "4", "Moltres", "9"),
    new carta("./images/entei.png", "carta_10", "8", "5", "Entei", "10"),
    new carta("./images/hooh.png", "carta_11", "10", "6", "Ho-Oh", "11"),
];

// mao do inimigo
let mao_inimigo = [];

// funcao do inimigo comprar cartas
function comprar_carta_inimigo() {
    if (deck_inimigo.length == 0) {
        return;
    }
    const valor_aleatorio = Math.floor(Math.random() * deck_inimigo.length);
    const carta_comprada = deck_inimigo[valor_aleatorio];
    mao_inimigo.push(carta_comprada);
    deck_inimigo.splice(valor_aleatorio, 1);

    // debug
    // console.log("carta comprada pelo inimigo: " + carta_comprada.nome_real);
}

// comprar varias cartas
function comprar_cartas_inimigo(numero) {
    for (let i = 0; i < numero; i++) {
        comprar_carta_inimigo();
    }
}

// // funcao do clique no botao
function botao_clicado() {

    // debug
    //console.log("botao clicado");

    // efeito "passando turno" do botao
    let botao = document.getElementById("botao");
    botao.innerHTML = "TURNO PASSADO";
    botao.style.backgroundColor = "red";
    setTimeout(function () {
        botao.innerHTML = "FINALIZAR TURNO";
        botao.style.backgroundColor = "#1a0936";
    }, 800);

    // atualiza o turno = turno++
    if (turno < TURNO_MAXIMO) {
        turno++;
        //console.log("turno: " + turno);
    }

    // aumenta energia padrao em +1
    if (energia_padrao < ENERGIA_MAXIMA) {
        energia_padrao++;
        //console.log("energia total: " + energia_padrao);
        energia_atual = energia_padrao;
        //console.log("energia atual: " + energia_atual);
    }

    // O INIMIGO AGIRA QUANTAS VEZES POR TURNO??
    let numero_aleatorio = Math.floor(Math.random() * DIFICULDADE);
    for (let i = 0; i < numero_aleatorio; i++) {
        // coisas do inimigo
        comprar_cartas_inimigo(1);
        inimigo_joga();
    }

    // coisas do inimigo
    comprar_cartas_inimigo(1);
    inimigo_joga();

    // compra carta
    compra_carta();

    // atualiza a tela com as informacoes do turno (TEM QUE SER A ULTIMA COISA A SER FEITA)
    atualiza_tela();
    console.log("atualizando tela");

    if (turno == TURNO_MAXIMO) {
        // fim de jogo
        fim_de_jogo();
    }

}

function atualiza_tela() {

    // atualiza turno
    let turno_atual = document.getElementById("turno");
    turno_atual.textContent = `TURNO: ${turno}/6`;

    // retorna energia para o maximo do turno
    let energia_atual_aux = document.getElementById("energia");
    energia_atual_aux.textContent = `ENERGIA: ${energia_padrao}/${ENERGIA_MAXIMA}`;

    // atualiza forca dos locais
    atualiza_forca();
}

// funcao do inimigo jogar
function inimigo_joga() {
    energia_padrao_inimigo++;

    // escolhe uma carta aleatoria da mao do inimigo
    const valor_aleatorio = Math.floor(Math.random() * mao_inimigo.length);
    let carta_jogada = mao_inimigo[valor_aleatorio];


    // se a carta custa mais que a energia da rodada = reroll
    // if (carta_jogada.custo > energia_padrao_inimigo) {
    //     for(let i = 0; i < mao_inimigo.length; i++){
    //         if(mao_inimigo[i].custo <= energia_padrao_inimigo){
    //             carta_jogada = mao_inimigo[i];
    //             indice = i;
    //         }
    //     }
    // }

    // escolhe um local aleatorio do tabuleiro com espaço disponivel
    let valor_aleatorio2 = Math.floor(Math.random() * 3);
    let local_marcado_inimigo = document.getElementById("slot_inimigo" + (valor_aleatorio2 + 1));
    let indice = obtem_indice(carta_jogada);
    // verifica se o local ja esta cheio
    if (local_marcado_inimigo.childElementCount < MAX_CARTAS_POR_LOCAL) {
        local_marcado_inimigo.innerHTML += `
            <p>
            ${deck[indice].nome_real} | Poder ${deck[indice].poder}
            </p>
          `;
        // atualiza variavel de forca do local
        if (local_marcado_inimigo.id == "slot_inimigo1") {
            console.log("forca_local1_inimigo: " + forca_local1_inimigo);
            forca_local1_inimigo += parseInt(deck[indice].poder);
            console.log("forca_local1_inimigo: " + forca_local1_inimigo);
        }
        if (local_marcado_inimigo.id == "slot_inimigo2") {
            console.log("forca_local2_inimigo: " + forca_local2_inimigo);
            forca_local2_inimigo += parseInt(deck[indice].poder);
            console.log("forca_local2_inimigo: " + forca_local2_inimigo);
        }
        if (local_marcado_inimigo.id == "slot_inimigo3") {
            console.log("forca_local3_inimigo: " + forca_local3_inimigo);
            forca_local3_inimigo += parseInt(deck[indice].poder);
            console.log("forca_local3_inimigo: " + forca_local3_inimigo);
        }
        mao_inimigo.splice(valor_aleatorio, 1);
    }
    // se estiver cheio, reroll
    // if (local_marcado_inimigo.childElementCount >= MAX_CARTAS_POR_LOCAL) {
    //     valor_aleatorio2 = Math.floor(Math.random() * 3);
    //     local_marcado_inimigo = document.getElementById("slot_inimigo" + (valor_aleatorio2 + 1));
    // }

    // // atualiza variavel de forca do local
    // if (local_marcado_inimigo.id == "slot_inimigo1") {
    //     console.log("forca_local1_inimigo: " + forca_local1_inimigo);
    //     forca_local1_inimigo += parseInt(deck[indice].poder);
    //     console.log("forca_local1_inimigo: " + forca_local1_inimigo);
    // }
    // if (local_marcado_inimigo.id == "slot_inimigo2") {
    //     console.log("forca_local2_inimigo: " + forca_local2_inimigo);
    //     forca_local2_inimigo += parseInt(deck[indice].poder);
    //     console.log("forca_local2_inimigo: " + forca_local2_inimigo);
    // }
    // if (local_marcado_inimigo.id == "slot_inimigo3") {
    //     console.log("forca_local3_inimigo: " + forca_local3_inimigo);
    //     forca_local3_inimigo += parseInt(deck[indice].poder);
    //     console.log("forca_local3_inimigo: " + forca_local3_inimigo);
    // }

    // mao_inimigo.splice(valor_aleatorio, 1);
}

// fim de jogo
function fim_de_jogo() {

    let somalocal1 = () => {
        let somalocal1_aux = forca_local1_aliado - forca_local1_inimigo;
        if (somalocal1_aux > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    let somalocal2 = () => {
        let somalocal2_aux = forca_local2_aliado - forca_local2_inimigo;
        if (somalocal2_aux > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    let somalocal3 = () => {
        let somalocal3_aux = forca_local3_aliado - forca_local3_inimigo;
        if (somalocal3_aux > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    let resultado = somalocal1() + somalocal2() + somalocal3();

    // debug
    console.log("resultado_final: " + resultado);
    console.log("somalocal1: " + somalocal1());
    console.log("somalocal2: " + somalocal2());
    console.log("somalocal3: " + somalocal3());

    // verifica se o jogador ganhou ou perdeu
    if (resultado >= 2) {
        alert("Fim de jogo! Você ganhou");
        location.reload();
    }
    else {
        alert("Fim de jogo! Você perdeu");
        location.reload();
    }
}

// atualiza apenas energia na tela
function atualiza_energia() {
    let energia_atual_aux = document.getElementById("energia");
    energia_atual_aux.textContent = `ENERGIA: ${energia_atual}/${ENERGIA_MAXIMA}`;
}

function atualiza_forca() {
    // atualiza forca dos locais
    let forca_local1_tela = document.getElementById("info_local1");
    let forca_local2_tela = document.getElementById("info_local2");
    let forca_local3_tela = document.getElementById("info_local3");
    forca_local1_tela.textContent = `Força do Inimigo = ${forca_local1_inimigo} | Sua Força = ${forca_local1_aliado}`;
    forca_local2_tela.textContent = `Força do Inimigo = ${forca_local2_inimigo} | Sua Força = ${forca_local2_aliado}`;
    forca_local3_tela.textContent = `Força do Inimigo = ${forca_local3_inimigo} | Sua Força = ${forca_local3_aliado}`;
}

// comprar carta
function compra_carta() {
    // Gera valor aleatório para ver qual carta será comprada
    const valor_aleatorio = Math.floor(Math.random() * deck_aliado.length);

    // Seleciona a div mao
    let mao = document.getElementById("mao");

    // Cria a div da carta
    let carta_criada = document.createElement("div");

    carta_criada.innerHTML = `
      <div id=${deck_aliado[valor_aleatorio].id} class="carta" style="background-image: url(${deck_aliado[valor_aleatorio].imagem}); height: 250px; width: 195px" onclick="seleciona_carta(event)">
          <p>${deck_aliado[valor_aleatorio].nome_real}</p>
          <p>Poder ${deck_aliado[valor_aleatorio].poder}</p>
          <p>Custo ${deck_aliado[valor_aleatorio].custo}</p>
      </div>
    `;

    // Adiciona a carta na mao
    mao.appendChild(carta_criada);

    // Remove carta do deck
    deck_aliado.splice(valor_aleatorio, 1);
}

// comprar varias cartas
function compra_cartas(numero) {
    for (let i = 0; i < numero; i++) {
        compra_carta();
        console.log("comprando carta");
    }
}

// seleciona carta
function seleciona_carta(e) {

    // seleciona a carta e acessa os valores originais dela  
    carta_marcada = e.target;
}

// seleciona local
function seleciona_local(e) {
    local_marcado = e.target;
    let indice = obtem_indice(carta_marcada);

    // debug
    console.log("local selecionado: " + local_marcado.id);

    // chama funcao de add
    if (carta_marcada != null) {
        console.log("carta_marcada.id: " + carta_marcada.id + " sendo adicionada ao local_marcado.id: " + local_marcado.id);
        // verifica se tem energia atual para selecionar a carta
        if (energia_atual >= deck[indice].custo) {

            // debug
            console.log("carta selecionada: " + carta_marcada.id);
            // console.log("indice: " + indice);
            // console.log("nome: " + deck[indice].nome_real);
            // console.log("poder: " + deck[indice].poder);

            // diminui energia atual
            energia_atual -= deck[indice].custo;
            atualiza_energia();
            add_carta();
            atualiza_forca();
        }
        else {
            alert("energia insuficiente");
            carta_marcada = null;
        }
    }
}

// add carta ao local
function add_carta() {

    // verifica se o local ja esta cheio
    if (local_marcado.childElementCount < MAX_CARTAS_POR_LOCAL) {
        let indice = obtem_indice(carta_marcada);
        local_marcado.innerHTML += `
        <p>
        ${deck[indice].nome_real} | Poder ${deck[indice].poder}
        </p>
      `;

        // atualiza variavel de forca do local
        if (local_marcado.id == "slot_aliado1") {
            console.log("forca_local1_aliado: " + forca_local1_aliado);
            forca_local1_aliado += parseInt(deck[indice].poder);
            console.log("forca_local1_aliado: " + forca_local1_aliado);
        }
        if (local_marcado.id == "slot_aliado2") {
            console.log("forca_local2_aliado: " + forca_local2_aliado);
            forca_local2_aliado += parseInt(deck[indice].poder);
            console.log("forca_local2_aliado: " + forca_local2_aliado);
        }
        if (local_marcado.id == "slot_aliado3") {
            console.log("forca_local3_aliado: " + forca_local3_aliado);
            forca_local3_aliado += parseInt(deck[indice].poder);
            console.log("forca_local3_aliado: " + forca_local3_aliado);
        }

        // remove carta da mao
        remove_carta_mao();
    }
    else {
        alert("Local Cheio!");
    }
}

// obtem indice
function obtem_indice(carta) {
    return carta.id.replace("carta_", "");
}

// remove carta da mao apos ser jogada
function remove_carta_mao() {
    let mao = document.getElementById("mao");
    console.log("carta_marcada.id: " + carta_marcada.id);
    let carta_a_ser_removida = document.getElementById(carta_marcada.id);
    carta_a_ser_removida.remove();
    carta_marcada = null;
    local_marcado = null;
}

// inicio do jogo = compra 4 cartas
window.onload = compra_cartas(3);
window.onload = comprar_cartas_inimigo(3);
