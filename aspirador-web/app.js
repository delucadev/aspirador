var eixo_x = null;
var eixo_y = null;
var pos_x_aspirador = null;
var pos_y_aspirador = null;
var percentual_sujos = null;
var matrix = null;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function renderiza(matriz, linhas, colunas){
    for (let linha = 0; linha < linhas; linha++) {
        $('#display').append('<div id = "'+linha+'"class="uk-grid-small uk-margin-small-left uk-margin-remove-vertical uk-child-width-expand@s uk-text-center" uk-grid>');
        for (let coluna = 0; coluna < colunas; coluna++) {
            if(matriz[linha][coluna] == 2){ //Posição do aspirador
                $('#'+linha).append('<div id = "'+linha+coluna+'" class="uk-card uk-background-primary uk-light uk-padding-remove uk-card-body">A</div>');
            }else if(matriz[linha][coluna]==1){ //Posição comoduto sujo
                $('#'+linha).append('<div id = "'+linha+coluna+'" class="uk-card uk-background-secondary uk-light uk-padding-remove uk-card-body">S</div>');
            }else{ //Posição comodo limpo
                $('#'+linha).append('<div id = "'+linha+coluna+'" class="uk-card uk-background-default uk-padding-remove uk-card-body">L</div>');
            }
        }
        $('#display').append('</div>');        
    }
}

function gerarMatriz(linhas, colunas, percentual){
    pos_x_aspirador = getRandomInt(0, linhas);
    pos_y_aspirador = getRandomInt(0, colunas);
    var matriz = Array();

    let p = percentual/100;

    for (let linha = 0; linha < linhas; linha++) {
        let values = Array();
        for (let coluna = 0; coluna < colunas; coluna++) {
            if(linha == pos_x_aspirador && coluna == pos_y_aspirador){
                values[coluna] = 2;
            }else if( Math.random() <= p){
                values[coluna] =  1;
            }else{
                values[coluna] =  0;
            }
        }
        matriz[linha] = values;
    }

    return matriz;    
}

$("#btn-gerar").click(function(e){
    e.preventDefault();
    eixo_x = parseInt($("input[type=number][name=eixo-x]").val());
    eixo_y = parseInt($("input[type=number][name=eixo-y]").val());
    percentual_sujos = parseInt($("input[type=number][name=percentual-sujos]").val());

    matrix = gerarMatriz(eixo_x, eixo_y, percentual_sujos);
    
    console.log(matrix);

    $('#display').html("");

    renderiza(matrix, eixo_x, eixo_y);
});

function moveRobo(){

    // Move para cima
    if(pos_x_aspirador-1 >= 0){
        if(matrix[pos_x_aspirador-1][pos_y_aspirador] == 1){
            console.log("mover pra cima");
            matrix[pos_x_aspirador][pos_y_aspirador] = 0
            pos_x_aspirador = pos_x_aspirador-1
            matrix[pos_x_aspirador][pos_y_aspirador] = 2
            return true;
        }else{
            console.log("em cima tá limpo");
        }
    }

    // Move para baixo
    if(pos_x_aspirador+1 < eixo_x){
        if(matrix[pos_x_aspirador+1][pos_y_aspirador] == 1){
            console.log("mover pra baixo");
            matrix[pos_x_aspirador][pos_y_aspirador] = 0
            pos_x_aspirador = pos_x_aspirador+1
            matrix[pos_x_aspirador][pos_y_aspirador] = 2
            return true;
        }else{
            console.log("em baixo tá limpo");
        }
    }

    // Move para esquerda
    if(pos_y_aspirador-1 >= 0){
        if(matrix[pos_x_aspirador][pos_y_aspirador-1] == 1){
            console.log("mover pra esquerda");            
            matrix[pos_x_aspirador][pos_y_aspirador] = 0
            pos_y_aspirador = pos_y_aspirador-1
            matrix[pos_x_aspirador][pos_y_aspirador] = 2
            return true;
        }else{
            console.log("na esquerda tá limpo");
        }
    }
    // Move para direita
    if(pos_y_aspirador+1 < eixo_y){
        if(matrix[pos_x_aspirador][pos_y_aspirador+1] == 1){
            console.log("mover pra direita");            
            matrix[pos_x_aspirador][pos_y_aspirador] = 0
            pos_y_aspirador = pos_y_aspirador+1
            matrix[pos_x_aspirador][pos_y_aspirador] = 2
            return true;
        }else{
            console.log("na direita tá limpo");
        }
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function limpar(){
    var flag = moveRobo();
    if(flag){
        $('#display').html("");
        renderiza(matrix, eixo_x, eixo_y);
        console.log(matrix);
        await sleep(200);
        limpar();
    }else{
        return false;
    }
}

$("#btn-limpar").click(function(e){
    e.preventDefault();
    limpar();    
});