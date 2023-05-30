function grafo_principal(){
  var g = new jsgraphs.FlowNetwork(5);
  g.addEdge(new jsgraphs.FlowEdge(0, 1, 30));
  g.addEdge(new jsgraphs.FlowEdge(0, 2, 50));
  g.addEdge(new jsgraphs.FlowEdge(2, 1, 10));
  g.addEdge(new jsgraphs.FlowEdge(1, 3, 120));
  g.addEdge(new jsgraphs.FlowEdge(2, 4, 150));
  g.addEdge(new jsgraphs.FlowEdge(3, 4, 70));
  g.addEdge(new jsgraphs.FlowEdge(4, 3, 70));


  var source = 0;
  var target = 3;
  var ff = new jsgraphs.FordFulkerson(g, source, target);
  console.log('Fluxo Máximo: ' + ff.value);
  let fluxoMaximo = ff.value;
  let texto = `O Fluxo Máximo de carga é ${fluxoMaximo}`;
  let elemento = document.getElementById('fluxo-maximo');
  elemento.textContent = texto;
  var minCut = ff.minCut(g);
  console.log('Printou?')

  var g_nodes = [];
  var g_edges = [];
  g.node(1).label = 'Belo Horizonte';
  for(var v=0; v < g.V; ++v){
      if(v == 0){
          g.node(v).label = 'Belo Horizonte ' + v; 
      }
      else if(v == 1){
          g.node(v).label = 'Contagem ' + v; 
      }
      else if(v == 2){
          g.node(v).label = 'Betim ' + v; 
      }
      else if(v == 3){
          g.node(v).label = 'Uberlândia' + v; 
      }
      else if(v == 4){
          g.node(v).label = 'Uberaba ' + v; 
      }
      //g.node(v).label = 'Cidade ' + v; // assigned 'Node {v}' as label for node v
      if(v == source) g.node(v).label = 'Belo Horizonte ' + v;
      if(v == target) g.node(v).label = 'Uberaba ' + v;
      g_nodes.push({
         id: v,
         label: g.node(v).label,
         group: (v == source || v == target ? 2 : 5) 
      });
  }
  
  for(var i = 0; i < minCut.length; ++i) {
      var e = minCut[i];
      e.highlighted = true;
      console.log('min-cut: (' + e.from() + ", " + e.to() + ')');
      var v = e.from();
      var w = e.to();
      g_edges.push({
          from: v,
          to: w,
          label: '' + e.flow + '/' + e.capacity,
          arrows:'to',
          color: '#ff0000'
      });
  }

  
  for(var v = 0; v < g.V; ++v) {
      var adj_v = g.adj(v);
      for(var i = 0; i < adj_v.length; ++i) {
          var e = adj_v[i];
          var w = e.other(v);
          if(w != e.to()) continue;
          if(e.highlighted) continue;
          g_edges.push({
              from: v,
              to: w,
              label: '' + e.flow + '/' + e.capacity,
              arrows:'to'
          });
      };
  }

  console.log(g.V); // display 6, which is the number of vertices in g
  console.log(g.adj(0)); // display [5, 1, 2], which is the adjacent list to vertex 0
  
  var nodes = new vis.DataSet(g_nodes);

  // create an array with edges
  var edges = new vis.DataSet(g_edges);

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
      nodes: nodes,
      edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);
  // Seletor para escolher os valores de source e target
  var selectSource = document.getElementById('select-source');
  var selectTarget = document.getElementById('select-target');

  // selectSource.addEventListener('change', function() {
  //   source = parseInt(selectSource.value);
  //   ff.compute(source, target);
  // });

  // selectTarget.addEventListener('change', function() {
  //   target = parseInt(selectTarget.value);
  //   ff.compute(source, target); ;
  // });

};

grafo_principal();
var selectElement = document.getElementById("select-source");
  
  // Adicionar um ouvinte de evento ao elemento select
  selectElement.addEventListener("change", function() {
    // Capturar o valor selecionado
    var valorSelecionado = selectElement.value;
    
    // Exibir o valor selecionado no console
    console.log(valorSelecionado);
  });