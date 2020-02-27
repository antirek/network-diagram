
const Diagram = function(id, elements, options) {
  let edges;
  let nodes;
  let groups;
  let positions;
  let optLayout = options ? options.layout : null;

  const addGroups = function(groupsIn) {
    groups = groupsIn.map(item => {
      return {data: item};
    })
  }

  const addPositions = function(positionsIn) {
    positions = positionsIn;
  }

  const findPositionForNodeById = function(id) {
    if (!positions) return;
    return positions.find(position=> position.id === id);
  }

  const appendPositionsToNodes = function(nodes) {
    if (!positions) return nodes;
    return nodes.map(node => {
      const position = findPositionForNodeById(node.data.id);      
      if (position) {
        node.position = {row: position.row, col:position.col,};
      }
      return node;
    })
  }

  const addEdges = function(edgesIn) {
    edges = edgesIn.map(item => {
      return {data: item};
    })
  }

  const addNodes = function(nodesIn) {
    nodes = nodesIn.map(item=> {
      return {data: {
        id: item.id, 
        label: item.label,
        parent: item.group,
      }, classes: [item.type]};
    })
  }

  const addElements = function ({groups, edges, nodes, positions}) {
    addGroups(groups);
    addNodes(nodes);
    addEdges(edges);
    addPositions(positions);
  }

  const autoDefaultParams = function() {
    return {
      name: 'fcose',
      idealEdgeLength: 150,
      edgeElasticity: 0.7,
      nestingFactor: 0.7,
      samplingType: true,
      sampleSize: 75,
      nodeSeparation: 950,
      tile: true,  
      tilingPaddingVertical: 30,
      tilingPaddingHorizontal: 30,
    };
  }

  const gridDefaultParams = function() {
    return {
      name: 'grid',
      rows: 5,
      cols: 5,
      position: function(node) {
        return {
         row: node.position('row'),
         col: node.position('col'),
        };
      }
    }
  }

  const layouts = {
    'auto': autoDefaultParams(),
    'grid': gridDefaultParams(),
  };

  const prepareStylesheet = function() {
    let sheet = cytoscape.stylesheet()
      .selector('node')
        .css({
          'height': 30,
          'width': 30,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 0,
          'content': 'data(label)',
          'text-valign': 'top',
          'text-halign': 'center',
        })          
      .selector('edge')
        .css({
          'width': 2,
          'target-arrow-shape': 'triangle',
          'line-color': '#ffaaaa',
          'target-arrow-color': '#ffaaaa',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'text-background': '#FFF',
        });

    const appendIconClass = function (stylesheet, cssClass) {
      return stylesheet.selector('.' + cssClass)
        .css({
          'background-image': icons[cssClass],
          'background-opacity': 0,
          'border-width': 0,
          'background-clip': 'none',
        });
    };
    
    for (const prop in icons) {
      sheet = appendIconClass(sheet, prop);
    }

    return sheet;
  };

  const render = function(element, layout = 'auto') {
    optLayout = optLayout || layout;

    const renderDiagram = function () {
      
      Array.prototype.push.apply(nodes, groups);
      nodes = appendPositionsToNodes(nodes);
      
      const elements = {
        nodes,
        edges,
      };
      console.log('elements', elements);
      var cy = cytoscape({
        container: document.getElementById(element),      
        boxSelectionEnabled: true,
        autounselectify: true,
        style: prepareStylesheet(),
        elements,
        layout: layouts[optLayout]
      });

    };

    if (document.readyState == "complete") {
      renderDiagram();
    } else {
      document.addEventListener("DOMContentLoaded", function(event) {         
        renderDiagram();
      });
    }
  }

  if (id && elements) {
    addElements(elements);
    render(id);
    return;
  }

  return {
    render,
    edges: addEdges,
    nodes: addNodes,
    groups: addGroups,
    positions: addPositions,
    elements: addElements,
  };
};
