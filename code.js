$(function(){ // on dom ready

  // photos from flickr with creative commons license
  const createCY = function() {
    let edges;
    let nodes;
    let groups;

    const addGroups = function(groupsIn) {
      groups = groupsIn.map(item => {
        return {data: item};
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

    const addElements = function ({groups, edges, nodes}) {
      addGroups(groups);
      addNodes(nodes);
      addEdges(edges);
    }

    const render = function(element) {
      Array.prototype.push.apply(nodes, groups);

      const elements = {
        nodes,
        edges,
      };

      // console.log('el', elements);
      var cy = cytoscape({
        container: document.getElementById(element),
        
        boxSelectionEnabled: false,
        autounselectify: false,
        
        style: cytoscape.stylesheet()
          .selector('node')
            .css({
              'height': 50,
              'width': 50,
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
            })
          .selector('.bird')
            .css({
              'background-image': 'https://farm8.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
            })
          .selector('.cat')
            .css({
              'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
            }),        
        elements,
        layout: {
          name: 'breadthfirst',
          directed: true,
          padding: 20,
        },
      });
    }

    return {
      render,
      addEdges,
      addNodes,
      addGroups,
      addElements,
    };
  };

  const e = [
    { source: 'cat1', target: 'birds amazing', label: 'hunger' },
  ];

  const g = [
    { id: 'birds amazing', label: 'Птички'},
  ];
  
  const n = [
    { id: 'cat1', type: 'cat', label: 'Cat Meow'},
    { id: 'bird1', type: 'bird', group: 'birds amazing', label: 'Птичка 1'},
    { id: 'bird2', type: 'bird', group: 'birds amazing', label: 'Птичка 2'},
    { id: 'bird3', type: 'bird', group: 'birds amazing', label: 'Птичка 3'},    
  ];

  const n2 = [
    { id: 'cat1', type: 'cat', label: 'Cat Meow'},
    { id: 'bird1', type: 'bird', group: 'birds'},
    { id: 'bird2', type: 'bird', group: 'birds'},
    { id: 'bird3', type: 'bird', group: 'birds'},
    { id: 'bird4', type: 'bird', group: 'birds'},
    { id: 'bird5', type: 'bird', group: 'birds'},
  ];

  const r = createCY();
  r.addEdges(e);
  r.addNodes(n);
  r.addGroups(g);
  r.render('cy');

  const r2 = createCY();
  r2.addElements({nodes: n2, edges: e, groups: g});
  r2.render('cy2');
  
}); // on dom ready