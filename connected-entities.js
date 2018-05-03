function updateEntities(names,val) {
  drawSvg(names ,val);

  function createNodes(numNodes, radius, names) {
    var nodes = [],
    // entityName = [],
      width = (radius * 2) + 45,
      height = (radius * 2) + 45,
      angle,
      a,
      b,
      i;
      console.log(numNodes, names);
    for (i = 0; i < numNodes; i++) {
      angle = (i / (numNodes / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
      // For a semicircle, we would use (i / numNodes) * Math.PI.
      a = (radius * Math.cos(angle)) + (width / 2); // Calculate the x position of the element.
      b = (radius * Math.sin(angle)) + (width / 2); // Calculate the y position of the element.
      nodes.push({
        'id': i,
        'x': a,
        'y': b,
        'name': names[i],
        'nnode': numNodes
      });
    }
    if (i == numNodes) {
      i = i + 1;
      console.log(nodes);
      a = nodes[0].y;
      b = nodes[0].y;
      nodes.push({
        'id': i,
        'x': a,
        'y': b,
        'name': '',
        'nnode': numNodes
      });
    }
    return nodes;
  }

  function createSvg(radius, callback) {
    var svg = d3.select('#connected-entities').append('svg:svg')
      .attr('viewBox', '-80 -40 500 410');
    callback(svg);
  }

  function createElements(svg, nodes, elementRadius) {
    element = svg.selectAll('circle')
      .data(nodes)
      .enter().append('svg:circle')
      .attr('r', elementRadius)
      .attr('cx', function (d, i) {
        return d.x;
      })
      .attr('cy', function (d, i) {
        return d.y;
      }).attr('stroke', function (d) {
        if (d.id > d.nnode) {
          return 'skyblue';
        } else {
          return 'grey';
        }
      })
      .attr('stroke-width', '5')
      .attr('fill', function (d) {
        if (d.id > d.nnode) {
          return 'skyblue';
        } else {
          return 'white';
        }
      }).style('padding','25px');
  }

  function createText(svg, nodes) {
    ename = [{
      'id': '',
      'x': '',
      'y': '',
      'name': ''
    }];
    ename = nodes;
    element = svg.selectAll('text')
      .data(nodes).enter().append('svg:text')
      .attr('x', function (d, i) {
        return d.x;
      }).attr('y', function (d, i) {
        return d.y;
      }).attr('text-anchor', 'middle')
      .attr('class', 'ctext').text(function (d, i) {
        // console.log(d.name);
        return d.name;
      });

      var text = element.node().getBBox().width;
      // console.log(text, element);
    // $('.ctext').data(nodes).text(
    //   function (d, i) {
    //     return ename[d].name;
    //   }
    // );

  }

  function createPath(svg, nodes) {
    var a, b, j, d;
    var len = nodes.length;
    var r = nodes[0].nnode;
    a = nodes[r].x;
    b = nodes[r].y;
    for (j = 0; j < len; j++) {
      element = svg.selectAll('line').data(nodes).enter().append('svg:line')
        .attr('x1', a).attr('y1', b).attr('x2', function (d) {
          return d.x;
        }).attr('y2', function (d) {
          return d.y;
        }).attr('stroke', 'grey')
        .attr('stroke-width', '2');

    }

  }
  // function wrap(){
  //   d3plus.textwrap().container(d3.selectAll('.ctext')).draw();
  // }
  function drawSvg(names, val) {
    var numNodes = val;
    var radius = 140;
    var nodes = createNodes(numNodes, radius, names);
    createSvg(radius, function (svg) {
      createPath(svg, nodes);
      createElements(svg, nodes, 35);
      createText(svg, nodes);
      // var a ='wrap';
      // (function () {
      //   d3plus.textwrap()
      //   .container(d3.selectAll('.ctext'))
      //   /*.resize(true)*/
      //   .draw();
      // }) ();
    });
  }

}