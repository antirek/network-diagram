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
              'content': 'data(id)',
              'text-valign': 'top',
              'text-halign': 'center',
            })
          .selector('.eating')
            .css({
              'border-color': 'red'
            })
          .selector('.eater')
            .css({
              'border-width': 9
            })
          .selector('edge')
            .css({
              'width': 6,
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
          .selector('#cat')
            .css({
              'background-image': 'https://farm2.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
            })
          .selector('#ladybug')
            .css({
              'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
            })
        .selector('#aphid')
            .css({
              'background-image': 'https://farm9.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
            })
        .selector('#rose')
            .css({
              'background-image': 'https://farm6.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
            })
        .selector('#grasshopper')
            .css({
              'background-image': 'https://farm7.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
            })
        .selector('#plant')
            .css({
              'background-image': 'https://farm1.staticflickr.com/231/524893064_f49a4d1d10_z.jpg'
            })
        .selector('#wheat')
            .css({
              'background-image': 'https://farm3.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
            }),
        
        elements,
        
        layout: {
          name: 'breadthfirst',
          directed: true,
          padding: 20,
          // roots: ['cat'],
        }
      }); // cy init
    }

    return {
      render,
      addEdges,
      addNodes,
      addGroups,
    };
  };

  const e = [
    { source: 'cat', target: 'birds', label: 'hunger' },

    /* { data: { source: 'bird', target: 'ladybug' } },
    { data: { source: 'bird', target: 'grasshopper' } },
    { data: { source: 'grasshopper', target: 'plant' } },
    { data: { source: 'grasshopper', target: 'wheat' } },
    { data: { source: 'ladybug', target: 'aphid' } },
    { data: { source: 'aphid', target: 'rose' } },
    { data: { source: 'rose', target: 'cat' } },
    { data: { source: 'grasshopper', target: 'cat' } }, */
  ];

  const g = [
    { id: 'birds', label: 'Birds'},
  ];
  const n = [
    { id: 'cat', label: 'Cat Meow'},
    { id: 'bird1', type: 'bird', group: 'birds'},
    { id: 'bird2', type: 'bird', group: 'birds'},
    { id: 'bird3', type: 'bird', group: 'birds'},
    
    /* { data: { id: 'ladybug', parent: 'b' } },
    { data: { id: 'aphid' } },
    { data: { id: 'rose' } },
    { data: { id: 'c' } },
    { data: { id: 'grasshopper', parent: 'c' } },
    { data: { id: 'plant' } },
    { data: { id: 'wheat', parent: 'c' } } */
  ]

  const n2 = [
    { id: 'cat', label: 'Cat Meow'},
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
  r2.addEdges(e);
  r2.addNodes(n2);
  r2.addGroups(g);
  r2.render('cy2');
  
}); // on dom ready