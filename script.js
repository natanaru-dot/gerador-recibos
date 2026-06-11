let numeroRecibo = localStorage.getItem("numeroRecebido") || 1;

let historicoRecibos = 

    JSON.parse(localStorage.getItem("historicoRecibos")) || [] ;

const hoje = new Date();

const dataHoje = hoje.toISOString().split("T")[0];

document.getElementById("data").value = dataHoje;

const buscar = document.getElementById("buscar");

const pesquisar = document.getElementById("pesquisar");

const historico = document.getElementById("historico");


const limparHistorico = document.getElementById("limparHistorico");

const botao = document.getElementById("gerar");

      botao.addEventListener("click", function() {
        
const nome = document.getElementById ("nome").value;

const valor = document.getElementById ("valor").value;

const valorNumero = Number(valor);

const servico = document.getElementById ("servico").value;

const data = document.getElementById ("data").value;

const botao = document.getElementById ("imprimir");

const numeroFormatado = numeroRecibo.toString().padStart(4,"0");


if (nome == "" || valor == "" || servico == "" || data == "" )
{
      alert ("Preencha todos os campos !");
return;
}

const nomeFormatado = nome[0].toUpperCase() + nome.slice(1);

const servicoFormatado = servico[0].toUpperCase() + servico.slice(1);

const valorFormatado = valorNumero.toLocaleString("pt-BR", {
        minimumFractionDigits: 2

});

const resumo = numeroFormatado + " - " + nomeFormatado + " - R$ " + valorFormatado ;
    
       historicoRecibos.push(resumo);

      localStorage.setItem(
            "historicoRecibos",

            JSON.stringify(historicoRecibos)
  
      );

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
"<img src='logo.png' id='logo'>" + 
"<h3>Natan Informatica</h3>" + 
"<p>Araranguá - SC</P>" + 
"<p> (48) 99995 - 9046<p>" +
"<h2>RECIBO Nº " + numeroFormatado + "</h2>" + 
"Recebi de " + nomeFormatado + 
" a quantia de R$ " + valorFormatado + 
" referente ao serviço de " + servicoFormatado + "." +
"<br><br>Data: " + dataFormatada + 
"<br><br><br>" +
"<div id='assinatura'>_______________</div>";
historico.innerHTML = "<h2>Últimos Recibos</h2>";
for (let item of historicoRecibos)
{
      historico.innerHTML += "<p>" + item + "</p>";
}
numeroRecibo++;
localStorage.setItem("numeroRecebido", numeroRecibo);
    });

          historico.innerHTML = "<h2>Últimos Recibos</h2>";

          for (let item of historicoRecibos)
          {
            historico.innerHTML +="<p>" + item + "</p>";
      
          }

          limparHistorico.addEventListener("click", function(){

      localStorage.removeItem("historicoRecibos");

      historicoRecibos = [];

      historico.innerHTML = "<h2>Últimos Recibos</h2>";

});

pesquisar.addEventListener("click", function(){

    const textoBuscar = buscar.value;

    historico.innerHTML = "<h2>Últimos Recibos</h2>";

    for (let item of historicoRecibos)
    {
        console.log("ITEM:", item);
        console.log("BUSCA:", textoBuscar);

        if (item.toLowerCase().includes(textoBuscar.toLowerCase()))
        {
            historico.innerHTML += "<p>" + item + "</p>";
        }
    }

});