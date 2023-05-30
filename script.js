function grafo_principal(source, target){
  // Cria o grafo e faz as arestas
    var g = new jsgraphs.FlowNetwork(5);
    g.addEdge(new jsgraphs.FlowEdge(0, 1, 30));
    g.addEdge(new jsgraphs.FlowEdge(1, 0, 30));
    g.addEdge(new jsgraphs.FlowEdge(0, 2, 50));
    g.addEdge(new jsgraphs.FlowEdge(2, 0, 50));
    // g.addEdge(new jsgraphs.FlowEdge(2, 1, 10));
    g.addEdge(new jsgraphs.FlowEdge(1, 2, 10));
    g.addEdge(new jsgraphs.FlowEdge(1, 3, 120));
    g.addEdge(new jsgraphs.FlowEdge(3, 1, 120));
    g.addEdge(new jsgraphs.FlowEdge(2, 4, 150));
    g.addEdge(new jsgraphs.FlowEdge(4, 2, 150));
    g.addEdge(new jsgraphs.FlowEdge(3, 4, 70));
    g.addEdge(new jsgraphs.FlowEdge(4, 3, 70));
    var distances = [
      [0, 19.4, 31, 0, 0],  // Distâncias da cidade 0 para as outras cidades
      [0, 0, 0, 462, 0],       // Distâncias da cidade 1 para as outras cidades
      [0, 18, 0, 444, 0],       // Distâncias da cidade 2 para as outras cidades
      [0, 0, 0, 0, 0],       // Distâncias da cidade 3 para as outras cidades
      [0, 0, 0, 0, 0]        // Distâncias da cidade 4 para as outras cidades
    ];


    var source = source;
    var target = target;
    var ff = new jsgraphs.FordFulkerson(g, source, target);
    console.log('Fluxo Máximo: ' + ff.value);
    let fluxoMaximo = ff.value;
    let texto = `O Fluxo Máximo de carga é de ${fluxoMaximo} kg`;
    let elemento = document.getElementById('fluxo-maximo');
    elemento.textContent = texto;
    var minCut = ff.minCut(g);
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

    console.log(g.V); // display 5, which is the number of vertices in g
    
    var nodes = new vis.DataSet(g_nodes);

    // Cria uma lista com as arestas
    var edges = new vis.DataSet(g_edges);

    // create a network
    var container = document.getElementById('mynetwork');
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);
  
};

function atualizarSource() {
  var selectElement = document.getElementById("select-source");
  var source = parseInt(selectElement.value);
  var selectElement = document.getElementById("select-target");
  var target = parseInt(selectElement.value);
  grafo_principal(source,target);
}

grafo_principal(0,0);
