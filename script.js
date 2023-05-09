// Nós do grafo
let nodes = new vis.DataSet([
  { id: 1, label: "Belo Horizonte" },
  { id: 2, label: "Contagem" },
  { id: 3, label: "Betim" },
  { id: 4, label: "Uberlândia" },
  { id: 5, label: "Uberaba" },
]);
// Arestas do grafo (Distância da rota, capacidade de transporte)
var edges = new vis.DataSet([
  { from: 1, to: 2, label: "20 km, 50 ton" },
  { from: 1, to: 3, label: "31 km, 30 ton" },
  { from: 2, to: 3, label: "23 km, 10 ton" },
  { from: 2, to: 4, label: "523 km, 150 ton" },
  { from: 3, to: 5, label: "444 km, 120 ton" },
  { from: 4, to: 5, label: "90 km, 70 ton" },
  { from: 5, to: 4, label: "90 km, 70 ton" },
]);
// Opções da visualização
var options = {
  clickToUse: false,
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
    width: 5,
    arrows: {
      to: { enabled: true, scaleFactor: 1, type: "arrow" },
    },
    length: 300,
  },
  physics: {
    enabled: true,
  },
};

// Criação do grafo
var container = document.getElementById("graph");

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
      fields: ["label"],
    });
    alert(
      "Nó selecionado: " + node.label + "\n" +
      "Conexões: " + degree.length + "\n" +
      "Detalhes: " + JSON.stringify(degree, null, 4)
    );
  }
});

function findAugmentingPath(source, sink) {
  // Inicializa o caminho com o nó fonte
  let path = [source];

  // Inicializa o conjunto de nós visitados
  let visited = new Set([source]);

  // Inicializa a fila de busca
  let queue = [source];

  // Executa a busca em largura
  while (queue.length > 0) {
    let current = queue.shift();

    // Adiciona o nó atual ao caminho
    path.push(current);

    // Busca por arestas com capacidade disponível
    let availableEdges = edges.get({
      filter: function(item) { // Verifica se a aresta ainda não foi visitada e se tem capacidade disponível
        return !visited.has(item.to) && parseInt(item.label.split(", ")[1]) > parseInt(item.label.split(", ")[2]) && item.from === current;
      }
    });

    // Adiciona os nós vizinhos à fila e ao caminho
    for (let i = 0; i < availableEdges.length; i++) {
      let neighbor = availableEdges[i].to;
      queue.push(neighbor);
      visited.add(neighbor);
      path.push(neighbor);

      // Se encontrou o nó de destino, retorna o caminho
      if (neighbor === sink) {
        return path;
      }
    }
  }

  // Se não encontrou um caminho aumentante, retorna null
  return null;
}

    function fordFulkerson(source, sink) {
      // Inicializa o fluxo como zero
      let maxFlow = 0;
    
      // Enquanto houver um caminho aumentante
      let path = findAugmentingPath(source, sink);
      while (path !== null) {
        // Calcula a capacidade disponível no caminho aumentante
        let minCapacity = Infinity;
        for (let i = 0; i < path.length - 1; i++) {
          let from = path[i];
          let to = path[i+1];
          let edge = edges.get({
            filter: function(item) {
              return item.from === from && item.to === to;
            }
          })[0];
          let capacity = parseInt(edge.label.split(", ")[1]);
          let flow = parseInt(edge.label.split(", ")[2]);
          let remainingCapacity = capacity - flow;
          if (remainingCapacity < minCapacity) {
            minCapacity = remainingCapacity;
          }
        }
    
        // Atualiza o fluxo no caminho aumentante
        for (let i = 0; i < path.length - 1; i++) {
          let from = path[i];
          let to = path[i+1];
          let edge = edges.get({
            filter: function(item) {
              return item.from === from && item.to === to;
            }
          })[0];
          let flow = parseInt(edge.label.split(", ")[2]);
          let newFlow = flow + minCapacity;
          edge.label = edge.label.split(", ")[0] + ", " + edge.label.split(", ")[1] + ", " + newFlow;
          edges.update(edge);
        }
    
        // Adiciona o fluxo encontrado ao fluxo máximo
        maxFlow += minCapacity;
    
        // Busca por um novo caminho aumentante
        path = findAugmentingPath(source, sink);
      }
    
      // Retorna o fluxo máximo encontrado
      return maxFlow;
    }

console.log(findAugmentingPath(1,5))
console.log(findAugmentingPath(2,3))
console.log(findAugmentingPath(3,5))
console.log(findAugmentingPath(4,5))
console.log(fordFulkerson(1,5))
console.log(fordFulkerson(1,2))
console.log(fordFulkerson(1,3))
console.log(fordFulkerson(1,4))