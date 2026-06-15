let numeroRecibo = localStorage.getItem("numeroRecebido") || 1;

let historicoRecibos = 

    JSON.parse(localStorage.getItem("historicoRecibos")) || [] ;

const hoje = new Date();

const dataHoje = hoje.toISOString().split("T")[0];

document.getElementById("data").value = dataHoje;

const buscar = document.getElementById("buscar");

const mostrarTodos = document.getElementById("mostrarTodos");

const pesquisar = document.getElementById("pesquisar");

const historico = document.getElementById("historico");

const exportar = document.getElementById("exportar");

const limparHistorico = document.getElementById("limparHistorico");

const botao = document.getElementById("gerar");

      botao.addEventListener("click", function () {

                  const nome = document.getElementById("nome").value;

                  const valor = document.getElementById("valor").value;

                  const valorNumero = Number(valor);

                  const servico = document.getElementById("servico").value;

                  const data = document.getElementById("data").value;

                  const botao = document.getElementById("imprimir");

                  const numeroFormatado = numeroRecibo.toString().padStart(4, "0");


                  if (nome == "" || valor == "" || servico == "" || data == "") {
                        alert("Preencha todos os campos !");
                        return;
                  }

                  const nomeFormatado = nome[0].toUpperCase() + nome.slice(1);

                  const servicoFormatado = servico[0].toUpperCase() + servico.slice(1);

                  const valorFormatado = valorNumero.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2
                  });

                  const resumo = numeroFormatado + 
                  " - " + 
                  nomeFormatado + 
                  " - " +
                  servicoFormatado +
                  " - R$ " + 
                  valorFormatado;

                  const partes = data.split("-");

                  const dataFormatada = partes[2] + "/" +
                        partes[1] + "/" +
                        partes[0];

                        const reciboHistorico = {

                        numero: numeroFormatado,

                        nome: nomeFormatado,

                        servico: servicoFormatado,

                        valor: valorFormatado,

                        data: dataFormatada

                         };



                  historicoRecibos.push(reciboHistorico);

                  localStorage.setItem(
                        "historicoRecibos",

                        JSON.stringify(historicoRecibos)

                  );

                  document.getElementById("nome").value = "";

                  document.getElementById("valor").value = "";

                  document.getElementById("servico").value = "";

                  document.getElementById("data").value = "";

                  botao.addEventListener("click", function () {

                        window.print();

                  });

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
                  for (let i = 0; i < historicoRecibos.length; i++) {

                        let item = historicoRecibos[i];

                        historico.innerHTML +=

                        "<p>" + 

                        "<span onclick='abrirRecibo(" + i + ")'>"+
                        item.numero + 
                        " - " + 
                        item.nome + 
                        " - " + 
                        item.servico + 
                        " - R$ " + 
                        item.valor + 

                        "</span> " + 

                        "<button class='btnExcluir' onclick='excluirRecibo(" + i + ")'>X</button" + 

                        "</p>";
                  }
                  numeroRecibo++;
                  localStorage.setItem("numeroRecebido", numeroRecibo);
            });

          historico.innerHTML = "<h2>Últimos Recibos</h2>";

          for (let i = 0; i < historicoRecibos.length; i++)

          {

            let item = historicoRecibos[i];

            historico.innerHTML +=
                        "<span onclick='abrirRecibo(" + i + ")'>" + 
                        item.numero + 
                        " - " + 
                        item.nome + 
                        " - " + 
                        item.servico + 
                        " - R$ " + 
                        item.valor + 

                        "</span>" + 

                        "<button class='btnExcluir' onclick='excluirRecibo(" + i + ")'>X</button>" + 
                        "</p>";
      
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

mostrarTodos.addEventListener("click", function(){

      historico.innerHTML = "<h2>Últimos Recibos</h2>";
      
      for (let item of historicoRecibos) {

            historico.innerHTML += "<p>" + item + "</p>"
      }

});

exportar.addEventListener("click", function() {

      const texto = historicoRecibos.join("/n"); 

      const blob = new Blob([texto], {type: "text/plain"});

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.download = "historico-recibos.txt";

      link.click();

});

function abrirRecibo(indice)
{

    const item = historicoRecibos[indice];

    recibo.innerHTML =

    "<img src='logo.png' id='logo'>" +

    "<h3>Natan Informatica</h3>" +

    "<p>Araranguá - SC</p>" +

    "<p>(48) 99995 - 9046</p>" +

    "<h2>RECIBO Nº " + item.numero + "</h2>" +

    "Recebi de " + item.nome +

    " a quantia de R$ " + item.valor +

    " referente ao serviço de " + item.servico + "." +

    "<br><br>Data: " + item.data +

    "<br><br><br>" +

    "<div id='assinatura'>_______________</div>";

}

function excluirRecibo(indice) {

      historicoRecibos.splice(indice, 1);

      localStorage.setItem(
            "historicoRecibos",

            JSON.stringify(historicoRecibos)

      );

      location.reload();
}