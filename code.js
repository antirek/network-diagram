const Diagram = function(id, elements, options) {
  // version 0.2.0
  let edges;
  let nodes;
  let groups;
  let positions;

  const addGroups = function(groupsIn) {
    if (!groupsIn) return;
    groups = groupsIn.map((item) => {
      return {data: item};
    });
  };

  const preparePositions = function(positionsIn) {
    if (!positionsIn) return;
    const getCol = function(str) {
      if (!str) return;
      const symbol = str.substr(0, 1).toLowerCase();
      const index = symbol.charCodeAt(0) - 97;
      return (index >= 0 && index <= 26) ? index : 0;
    };
    const getRow = function(str) {
      if (!str) return;
      const symbol = str.substr(1, 2).toLowerCase();
      const index = Number(symbol);
      return (index >= 0 && index <= 50) ? index : 0;
    };
    const positions = positionsIn.map((position) => {
      return {
        id: position.id,
        col: getCol(position.p) || position.col,
        row: getRow(position.p) || position.row,
      };
    });
    return positions;
  };

  const addPositions = function(positionsIn) {
    positions = preparePositions(positionsIn);
  };

  const findPositionForNodeById = function(id) {
    if (!positions) return;
    return positions.find((position)=> position.id === id);
  };

  const appendPositionsToNodes = function(nodes) {
    if (!positions) return nodes;
    return nodes.map((node) => {
      const position = findPositionForNodeById(node.data.id);
      if (position) {
        node.position = {
          row: Number(position.row),
          col: Number(position.col),
        };
      }
      return node;
    });
  };

  const addEdges = function(edgesIn) {
    if (!edgesIn) return;
    edges = edgesIn.map((item) => {
      const classes = [];
      classes.push(item.direction || 'autorotate');
      return {data: item, classes};
    });
  };

  const addNodes = function(nodesIn) {
    if (!nodesIn) return;
    nodes = nodesIn.map((item)=> {
      return {data: {
        id: item.id,
        label: item.label,
        parent: item.group,
      }, classes: [item.type]};
    });
  };

  const addElements = function({groups, edges, nodes, positions}) {
    addGroups(groups);
    addNodes(nodes);
    addEdges(edges);
    addPositions(positions);
  };

  const gridDefaultParams = function() {
    return {
      name: 'grid',
      rows: 5,
      cols: 5,
      fit: true, // whether to fit the viewport to the graph
      padding: 100, // padding used on fit
      position: function(node) {
        return {
          row: node.position('row'),
          col: node.position('col'),
        };
      },
    };
  };

  const layouts = {
    'grid': gridDefaultParams(),
  };

  const prepareStylesheet = function() {
    const getColor = function(ele) {
      return ele.data('color') || '#ffaaaa';
    };
    const getEdgeLabel = function(ele) {
      return ele.data('label') || '';
    };
    const getLineStyle = function(ele) {
      return ele.data('line') || 'solid';
    };
    const getCurveStyle = function(ele) {
      return ele.data('style') || 'bezier';
    };
    const getTextDirection = function(ele) {
      return ele.data('direction') || 'autorotate';
    };
    const getNodeLabel = function(ele) {
      return ele.data('label') || ele.data('id');
    };
    let sheet = cytoscape.stylesheet()
        .selector('node')
        .css({
          'height': 30,
          'width': 30,
          'background-fit': 'cover',
          'border-color': '#000',
          'border-width': 0,
          'content': getNodeLabel,
          'text-valign': 'top',
          'text-halign': 'center',
        })
        .selector('edge')
        .css({
          'width': 2,
          'target-arrow-shape': 'triangle-backcurve',
          'line-color': getColor,
          'target-arrow-color': getColor,
          'curve-style': getCurveStyle,
          'label': getEdgeLabel,
          'line-style': getLineStyle,
          'color': '#000',
          'text-outline-color': '#FFF',
          'text-outline-width': 1,
          'edge-text-rotation': getTextDirection,
        });

    const appendIconClass = function(stylesheet, cssClass) {
      return stylesheet.selector('.' + cssClass)
          .css({
            'background-image': DiagramIcons[cssClass],
            'background-opacity': 0,
            'border-width': 0,
            'background-clip': 'none',
          });
    };

    for (const prop in DiagramIcons) {
      if (Object.prototype.hasOwnProperty.call(DiagramIcons, prop)) {
        sheet = appendIconClass(sheet, prop);
      }
    }

    return sheet;
  };

  const render = function(element) {
    const renderDiagram = function() {
      Array.prototype.push.apply(nodes, groups);
      nodes = appendPositionsToNodes(nodes);

      const elements = {
        nodes,
        edges,
      };
      // console.log('elements', elements);
      const cy = cytoscape({
        container: document.getElementById(element),
        zoom: 0.7,
        pan: {
          x: 100,
          y: 100,
        },
        boxSelectionEnabled: true,
        autounselectify: true,
        style: prepareStylesheet(),
        elements,
        layout: layouts['grid'], // {name: 'preset', }// layouts['grid'],
      });

      cy.gridGuide({
        snapToGridOnRelease: true,
        snapToGridDuringDrag: true,
        gridSpacing: 60,
        snapToGridCenter: true,
        panGrid: true,
        drawGrid: false,
        resize: false,
        zoomDash: false,
        guidelinesStyle: {
          strokeStyle: 'black',
          horizontalDistColor: '#ff0000',
          verticalDistColor: 'green',
          initPosAlignmentColor: '#0000ff',
        },
      });
    };

    if (document.readyState == 'complete') {
      renderDiagram();
    } else {
      document.addEventListener('DOMContentLoaded', function(event) {
        renderDiagram();
      });
    }
  };

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
