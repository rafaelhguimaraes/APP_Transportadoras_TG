// Dados do grafo
var nodes = new vis.DataSet([
  { id: 1, label: "Belo Horizonte" },
  { id: 2, label: "Contagem" },
  { id: 3, label: "Betim" },
//  { id: 4, label: "Juiz de Fora" },
  { id: 5, label: "Uberlândia" },
//  { id: 6, label: "Ipatinga" },
  { id: 7, label: "Uberaba" },
 // { id: 8, label: "Montes Claros" },
//  { id: 9, label: "Varginha" },
 // { id: 10, label: "Poços de Caldas" },
]);

var edges = new vis.DataSet([
  { from: 1, to: 2, label: "100 km, 50 ton" },
  { from: 1, to: 3, label: "70 km, 30 ton" },
  { from: 2, to: 3, label: "20 km, 10 ton" },
 // { from: 2, to: 4, label: "200 km, 70 ton" },
  { from: 2, to: 5, label: "400 km, 150 ton" },
  { from: 3, to: 5, label: "350 km, 120 ton" },
//  { from: 3, to: 6, label: "150 km, 60 ton" },
//  { from: 4, to: 5, label: "250 km, 100 ton" },
//  { from: 4, to: 7, label: "300 km, 130 ton" },
  { from: 5, to: 7, label: "100 km, 70 ton" },
//  { from: 5, to: 8, label: "450 km, 200 ton" },
  { from: 6, to: 5, label: "200 km, 80 ton" },
  { from: 7, to: 8, label: "350 km, 160 ton" },
//  { from: 8, to: 9, label: "250 km, 100 ton" },
//  { from: 8, to: 10, label: "150 km, 50 ton" },
//  { from: 9, to: 10, label: "80 km, 30 ton" },
]);

// Opções da visualização
var options = {
  nodes: {
    shape: "circle",
    font: {
      size: 18,
      color: "#000000",
    },
    borderWidth: 2,
  },
  edges: {
    font: {
      size: 14,
      color: "#000000",
    },
    width: 2,
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: "arrow" },
    },
    length: 300,
  },
  physics: {
    enabled: false,
  },
};

// Criação do grafo
var container = document.getElementById("graph");

var data = {
  nodes: nodes,
  edges: edges,
};

var options = {
  nodes: {
    shape: "circle",
    font: {
      size: 18,
      color: "#000000",
    },
    borderWidth: 2,
  },
  edges: {
    font: {
      size: 14,
      color: "#000000",
    },
    width: 2,
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: "arrow" },
    },
    length: 300,
  },
  physics: {
    enabled: false,
  },
};

var data = {
  nodes: nodes,
  edges: edges,
};

var network = new vis.Network(container, data, options);

network.on('select', function (params) {
  if (params.nodes.length === 1) {
    var selectedNode = params.nodes[0];
    var node = nodes.get(selectedNode);
    var degree = edges.get({
      filter: function (edge) {
        return edge.from === selectedNode || edge.to === selectedNode;
      },
    }).length;
    var message = "<h2>Cidade " + selectedNode + "</h2>";
    message += "<p>Capacidade: " + node.capacity + "</p>";
    message += "<p>Distância para as outras cidades:</p><ul>";

    edges.get({
      filter: function (edge) {
        return edge.from === selectedNode || edge.to === selectedNode;
      },
    }).forEach(function (edge) {
      var targetNodeId = edge.from === selectedNode ? edge.to : edge.from;
      var targetNode = nodes.get(targetNodeId);
      var distance = edge.distance;
      var weight = edge.weight;
      message +=
        "<li>Cidade " +
        targetNodeId +
        ": " +
        distance +
        " km, " +
        weight +
        " toneladas por hora</li>";
    });

    message += "</ul>";
    document.getElementById("node-details").innerHTML = message;
  } else {
    document.getElementById("node-details").innerHTML =
      "<p>Selecione uma cidade para ver detalhes.</p>";
  }
});

