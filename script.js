let numeroRecibo = localStorage.getItem("numeroRecebido") || 1;

const hoje = new Date();

const dataHoje = hoje.toISOString().split("T")[0];

document.getElementById("data").value = dataHoje;

const botao = document.getElementById("gerar");

      botao.addEventListener("click", function() {
        
const nome = document.getElementById ("nome").value;

const valor = document.getElementById ("valor").value;

const servico = document.getElementById ("servico").value;

const data = document.getElementById ("data").value;

const botao = document.getElementById ("imprimir");

const numeroFormatado = numeroRecibo.toString().padStart(4,"0");

document.getElementById("nome").value = "";

document.getElementById("valor").value = "";

document.getElementById("servico").value = "";

document.getElementById("data").value = "";

      botao.addEventListener("click",function() {

        window.print();

});

const partes = data.split("-");

const dataFormatada = 
partes[2] +"/"+
partes[1] + "/"+
partes[0];


const recibo = document.getElementById("recibo");
recibo.innerHTML =
"<h2>RECIBO Nº" + numeroFormatado + "</h2>" + 
"Recebi de " + nome + 
" a quantia de R$ " + valor + 
" referente ao serviço de " + servico + "." +
"<br><br>Data: " + dataFormatada + 
"<br><br><br>" +
"<div id='assinatura'>_______________</div>";
numeroRecibo++;
localStorage.setItem("numeroRecebido", numeroRecibo);
    });