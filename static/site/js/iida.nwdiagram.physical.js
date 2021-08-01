/* global cytoscape, iida */

(function () {

    iida.nwdiagram = function () {

        var basic_style = [
            {
                'selector': "edge",
                'style': {
                    'width': 2,
                    'curve-style': "bezier",  // "taxi" "bezier" "segments",
                    'line-color': "#a9a9a9",  // darkgray
                    // 'target-arrow-color': "#a9a9a9",  // darkgray
                    // 'source-arrow-color': "#a9a9a9",  // darkgray
                    // 'target-arrow-shape': "circle",
                    // 'source-arrow-shape': "circle",
                    // 'label': "data(label)",
                    'text-wrap': "wrap",  // wrap is needed to work \n
                    'label': edge => edge.data('label') ? `\u2060${edge.data('label')}\n\n\u2060` : '',
                    'font-size': "8px",
                    'edge-text-rotation': "autorotate",
                    // 'source-text-offset': 10,
                    // 'target-text-offset': 10,
                }
            },

            {
                'selector': "edge.highlighted",
                'style': {
                    'width': 4,
                    'line-color': '#0000ff',  // blue
                    // 'background-color': "#a9a9a9",  // darkgray
                    // 'transition-property': "background-color, line-color",
                    // 'transition-duration': "0.5s"
                }
            },

            {
                'selector': ".physical_router",
                'style': {
                    'border-color': "#000",
                    'border-width': 1,
                    'shape': 'rectangle',
                    'background-color': "#ffffff",
                    'label': "data(label)",
                    'width': "data(width)",
                    'height': "data(height)",
                    'font-size': "8px",
                    'text-wrap': "wrap",
                    'text-valign': "center",
                    'text-halign': "center",
                    'opacity': 0.8,
                    'border-opacity': 1.0,
                }
            },

            {
                'selector': ".physical_port",
                'style': {
                    'border-color': "#000",
                    'border-width': 1,
                    'shape': "rectangle",
                    'background-color': "#87ceeb",  // skyblue
                    'label': "data(label)",
                    'width': "data(width)",
                    'height': "data(height)",
                    'font-size': "8px",
                    'text-wrap': "wrap",
                    'text-valign': "center",
                    'text-halign': "center",
                    'opacity': 0.8,
                    'border-opacity': 1.0
                }
            },

            {
                'selector': ".physical_connector",
                'style': {
                    'shape': "rectangle",
                    'background-color': "#a9a9a9",  // darkgray
                    'width': 2,  // this must be same as line width
                    'height': 2,  // this must be same as line width
                }
            },

            {
                'selector': ".bundle_ether",
                'style': {
                    'shape': "rectangle",
                    'label': "data(label)",
                    'text-wrap': "wrap",
                    'text-valign': "center",
                    'text-halign': "center",
                    'font-size': "8px",
                    'background-color': "#f0e68c",  // khaki
                    'border-width': 0,
                    'opacity': 1
                }
            },

            {
                'selector': ".logical_router.P",
                'style': {
                    'border-color': "#000",
                    'border-width': 1,
                    'shape': "round-rectangle",
                    'background-color': "#20b2aa",  // lightseagreen
                    'label': "data(label)",
                    'width': "data(width)",
                    'height': "data(height)",
                    'font-size': "8px",
                    'text-wrap': "wrap",
                    'text-valign': "center",
                    'text-halign': "center",
                    'opacity': 0.8,
                    'border-opacity': 1.0,
                }
            },

            {
                'selector': ".logical_router.PE",
                'style': {
                    'border-color': "#000",
                    'border-width': 1,
                    'shape': "round-rectangle",
                    'background-color': "#40e0d0",  // turquoise
                    'label': "data(label)",
                    'width': "data(width)",
                    'height': "data(height)",
                    'font-size': "8px",
                    'text-wrap': "wrap",
                    'text-valign': "center",
                    'text-halign': "center",
                    'opacity': 0.8,
                    'border-opacity': 1.0,
                }
            },

            {
                'selector': ".router.highlighted",
                'style': {
                    'border-color': "#0000ff",  // blue
                    'border-width': 4,
                }
            },

            {
                selector: '.loop',
                style: {
                    'control-point-step-size': 90,
                }
            },

            {
                'selector': ".img_router",
                'style': {
                    'background-image': "https://takamitsu-iida.github.io/network-diagram/static/site/img/router.jpg"
                }
            },

            {
                'selector': ".img_firewall",
                'style': {
                    'background-image': "https://takamitsu-iida.github.io/network-diagram/static/site/img/firewall.jpg"
                }
            }
        ]

        var cy = window.cy = cytoscape({
            container: document.getElementById('cy'),
            minZoom: 0.5,
            maxZoom: 3,
            boxSelectionEnabled: false,
            autounselectify: true,
            layout: { 'name': "preset" },
            style: basic_style,
            elements: iida.appdata.get_elements()
        });

        var cy2 = {};
        var cy2_container = document.getElementById('cy2');
        if (cy2_container) {
            cy2 = window.cy2 = cytoscape({
                container: cy2_container,
                minZoom: 0.5,
                maxZoom: 3,
                boxSelectionEnabled: false,
                autounselectify: true,
                style: cytoscape.stylesheet()
                    .selector(".logical_router.P")
                    .style({
                        'border-color': "#000",
                        'border-width': 1,
                        'shape': "round-rectangle",
                        'background-color': "#20b2aa",  // lightseagreen
                        'label': "data(id)",
                        'width': 100,
                        'height': 100,
                        'font-size': "10px",
                        'text-valign': "center",
                        'text-halign': "center",
                    })
                    .selector(".logical_router.PE")
                    .style({
                        'border-color': "#000",
                        'border-width': 1,
                        'shape': "round-rectangle",
                        'background-color': "#40e0d0",  // turquoise
                        'label': "data(id)",
                        'width': 100,
                        'height': 100,
                        'font-size': "10px",
                        'text-valign': "center",
                        'text-halign': "center",
                    })
                    .selector('edge')
                    .style({
                        "curve-style": "straight",
                        'line-color': "#0000ff",  // blue
                        'target-arrow-color': "#0000ff",  // blue
                        'source-arrow-color': "#0000ff",  // blue
                        'target-arrow-shape': "circle",
                        'source-arrow-shape': "circle",
                        'width': 2,
                        'text-wrap': "wrap",
                        'label': edge => edge.data('weight') ? `\u2060${edge.data('weight')}\n\n\u2060` : '',
                        'font-size': "20px",
                    }),

                elements: [],
                layout: { 'name': "grid" }
            });
        }

        // add the panzoom control with default parameter
        // https://github.com/cytoscape/cytoscape.js-panzoom
        cy.panzoom({});

        // get edge between two nodes
        var get_edge_by_nodes = function (cy, start_node_id, end_node_id) {
            var edges = cy.edges().filter(edge => {
                var source_id = edge.source().data('id');
                var target_id = edge.target().data('id');
                return (start_node_id === source_id || start_node_id === target_id) && (end_node_id === source_id || end_node_id === target_id);
            });
            if (edges && edges.length > 0) {
                return edges[0];
            }
            return undefined;
        };

        // on grab, all router node save own position
        cy.on('grab', '.router', function (evt) {
            evt.target.data('grab_x', evt.target.position().x);
            evt.target.data('grab_y', evt.target.position().y);

            cy.$('.router').forEach(function (n) {
                n.data('old_x', n.position().x);
                n.data('old_y', n.position().y);
            });
        });

        // on drag, find drag_with nodes and set new position
        cy.on('drag', '.router', function (evt) {
            var delta_x = evt.target.position().x - evt.target.data('grab_x');
            var delta_y = evt.target.position().y - evt.target.data('grab_y');

            var targets = evt.target.data('drag_with') || [];
            targets.forEach(function (target) {
                var n = cy.$id(target);
                if (n && !n.grabbed()) {
                    var old_x = n.data('old_x');
                    var old_y = n.data('old_y');
                    n.position({ x: old_x + delta_x, y: old_y + delta_y });
                }
            });
        });

        // on position, fix physical port position
        cy.on('position', '.router', function (evt) {
            var router = evt.target;
            var router_position = router.position();

            var ports = cy.nodes().filter(function (n) {
                if (n.data('router_id') === router.id()) {
                    return n;
                }
            });
            ports.forEach(port => {
                var offset_x = port.data('offset_x');
                var offset_y = port.data('offset_y');
                port.position({ x: router_position.x + offset_x, y: router_position.y + offset_y })
            });
        });

        // the button to revert to initial position
        var initial_position = document.getElementById('idInitialPosition');
        if (initial_position) {
            initial_position.addEventListener('click', function (evt) {
                animate_to_initial_position();
            });
        };

        var get_initial_position = function (node) { return node.data('initial_position'); };

        var animate_to_initial_position = function () {
            Promise.all(cy.nodes('.router').map(node => {
                return node.animation({
                    position: get_initial_position(node),
                    duration: 1000,
                    easing: "ease"
                }).play().promise();
            }));
        };

        // the dropdown list to change layout
        var layout_change = document.getElementById('idLayout');
        if (layout_change) {
            layout_change.addEventListener('change', function (evt) {
                CyLayout.set_layout(cy, evt.target.value);
            });
        }

        var CyLayout = (function () {
            var _set_layout = function (cy, layout_name) {
                if (layout_name === 'preset') {
                    animate_to_initial_position();
                    return;
                }

                if (layout_name === 'fcose') {
                    if (iida.appdata.current === "logical") {
                        cy.layout(iida.appdata.logical_fcose_option).run();
                    }
                    return;
                }

                var layout = {
                    name: layout_name,
                    fit: true,
                    animate: true,
                };

                if (iida.appdata.current === "physical") {
                    cy.$('.router').layout(layout).run();
                } else if (iida.appdata.current === "logical") {
                    cy.layout(layout).run();
                }
            };
            return {
                set_layout: _set_layout
            };
        })();

        // currently not used
        // change data dynamically
        var data_change = document.getElementById('idData');
        if (data_change) {
            data_change.addEventListener('change', function (evt) {
                CyData.set_data(cy, evt.target.value);
            });
        };

        var CyData = (function () {
            var _set_data = function (cy, data_name) {
                iida.appdata.current = data_name;
                var eles = iida.appdata.get_elements();
                cy.elements().remove();
                cy.add(eles);
            };
            return {
                set_data: _set_data
            };
        })();

        var CyShortestPath = (function () {
            var _dijkstra = function (cy, start_node_id, end_node_id) {

                // get start node by id
                var start_node = cy.filter('node[id="' + start_node_id + '"]');
                if (!start_node) {
                    return;
                }
                // get end node by id
                var end_node = cy.filter('node[id="' + end_node_id + '"]');
                if (!end_node) {
                    return;
                }

                // eles.dijkstra( options )
                // options
                //    root: The root node (selector or collection) where the algorithm starts.
                //    weight: function(edge) [optional] A function that returns the positive numeric weight for the edge. The weight indicates the cost of going from one node to another node.
                //    directed: [optional] A boolean indicating whether the algorithm should only go along edges from source to target (default false).
                var dijkstra = cy.elements().dijkstra(start_node, function (node) {
                    return node.data('weight');
                }, false);

                var results = dijkstra.pathTo(end_node);

                // set cy2 elements
                cy2.elements().remove();
                cy2.add(results);
                cy2.layout({ 'name': "grid" }).run();

                var step = 0;
                var highlight_next = function () {
                    var el = results[step];
                    if (el/* && el.isEdge()*/) {
                        // console.log(el.id());
                        el.addClass('highlighted');
                    }
                    if (step < results.length) {
                        step++;
                        // setTimeout(highlight_next, 500);
                        highlight_next();
                    }
                };

                highlight_next();
            }

            var _clear = function (cy) {
                cy.elements().removeClass('highlighted');
                cy2.elements().remove();
            }

            return {
                dijkstra: _dijkstra,
                clear: _clear,
                is_running: false
            }
        })();

        var start_end_matrix = document.getElementById('start_end_matrix');
        if (start_end_matrix) {
            // add '' before router_id list
            var routers = [''].concat(iida.appdata.logical_router_ids);

            var table = document.createElement('table');
            table.setAttribute('style', "font-size: 8pt;");
            table.setAttribute('cellspacing', 0);

            // <tr> loop
            for (var tr_index = 0; tr_index < routers.length; tr_index++) {
                var tr = document.createElement('tr');

                // <td> loop
                for (var td_index = 0; td_index < routers.length; td_index++) {
                    var td = document.createElement('td');

                    if (tr_index === 0) {
                        // the first row
                        td.setAttribute('style', "vertical-align: top");
                        var span = document.createElement('span');
                        span.className = "vertical";
                        span.textContent = routers[td_index];
                        td.appendChild(span);
                    } else {
                        td.setAttribute('style', "text-align: center");
                        // first column
                        if (td_index === 0) {
                            td.setAttribute('style', "text-align: left");
                            var span = document.createElement('span');
                            span.textContent = routers[tr_index];
                            td.appendChild(span);
                        } else {
                            if (td_index === tr_index) {
                                // start is same as end
                                var span = document.createElement('span');
                                span.textContent = "-";
                                td.appendChild(span);
                            } else if (td_index > tr_index) {
                                var input = document.createElement('input');
                                input.id = routers[tr_index] + routers[td_index];
                                input.type = 'radio';
                                input.name = 'start_end_matrix';
                                input.start_node = routers[tr_index];  // store original key 'start_node'
                                input.end_node = routers[td_index];  // store original key 'end_node'
                                input.onchange = function (evt) {
                                    CyShortestPath.clear(cy);
                                    CyShortestPath.dijkstra(cy, evt.target.start_node, evt.target.end_node);
                                };
                                // check if this is the first radio
                                if (tr_index === 1 && td_index === 2) {
                                    input.checked = true;
                                }
                                td.appendChild(input);
                            } else {
                                var edge = get_edge_by_nodes(cy, routers[tr_index], routers[td_index]);
                                if (edge !== undefined) {
                                    var input = document.createElement('input');
                                    input.id = 'text_' + routers[tr_index] + routers[td_index];
                                    input.type = 'text';
                                    input.name = 'start_end_edge';
                                    input.value = edge.data('weight') || -1;
                                    input.disabled = true;
                                    input.maxLength = 2;
                                    input.setAttribute('style', "width:20px;");
                                    input.start_node = routers[tr_index];  // store original key 'start_node'
                                    input.end_node = routers[td_index];  // store original key 'end_node'
                                    td.appendChild(input);
                                }
                            }

                        }

                    }
                    tr.appendChild(td);

                }

                table.appendChild(tr);
            }

            // 生成したtable要素を追加する
            start_end_matrix.appendChild(table);
        };

        var dijkstra_start_all = document.getElementById('idStartStop');
        if (dijkstra_start_all) {
            dijkstra_start_all.addEventListener('change', function () {
                CyShortestPath.is_running = dijkstra_start_all.checked;
                start_all_func();
            });
        };

        var start_all_func = function () {
            var router_ids = iida.appdata.logical_router_ids;
            var row_index = 0;
            var col_index = 0;

            var move_to_checked = function () {
                var radio_id = router_ids[row_index] + router_ids[col_index];
                var radio = document.getElementById(radio_id);
                if (radio && radio.checked) {
                    return;
                }
                if (col_index < router_ids.length) {
                    col_index++;
                    move_to_checked();
                } else {
                    col_index = 0;
                    if (row_index < router_ids.length) {
                        row_index++;
                        move_to_checked();
                    }
                }
            };
            move_to_checked();

            var check_next = function () {
                if (!CyShortestPath.is_running) {
                    return;
                }
                var radio_id = router_ids[row_index] + router_ids[col_index];
                var radio = document.getElementById(radio_id);
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                }

                if (col_index < router_ids.length) {
                    col_index++;
                    var radio_id = router_ids[row_index] + router_ids[col_index];
                    if (document.getElementById(radio_id)) {
                        setTimeout(check_next, 1000);
                    } else {
                        check_next();
                    }
                } else {
                    col_index = 0;
                    if (row_index < router_ids.length) {
                        row_index++;
                        var radio_id = router_ids[row_index] + router_ids[col_index];
                        if (document.getElementById(radio_id)) {
                            setTimeout(check_next, 1000);
                        } else {
                            check_next();
                        }
                    } else {
                        console.log("done");
                        CyShortestPath.is_running = false;
                        dijkstra_start_all.checked = false;
                    }
                }
            }
            check_next();
        };

        // clear highlighted class
        var dijkstra_clear = document.getElementById('idDijkstraClear');
        if (dijkstra_clear) {
            dijkstra_clear.addEventListener('click', function (evt) {
                CyShortestPath.clear(cy);
            });
        };

        // slider for edge #1-#1
        var cost_1_1 = document.getElementById('cost_1_1');
        if (cost_1_1) {
            cost_1_1.addEventListener('input', function (evt) {
                var v = evt.target.value;
                document.getElementById('cost_1_1_value').innerText = v;
                set_edge_weight(cy);
            });
        }

        // slider for edge #1-#2
        var cost_1_2 = document.getElementById('cost_1_2');
        if (cost_1_2) {
            cost_1_2.addEventListener('input', function (evt) {
                var v = evt.target.value;
                document.getElementById('cost_1_2_value').innerText = v;
                set_edge_weight(cy);
            });
        }

        // slider for edge #2-#2
        var cost_2_2 = document.getElementById('cost_2_2');
        if (cost_2_2) {
            cost_2_2.addEventListener('input', function (evt) {
                var v = evt.target.value;
                document.getElementById('cost_2_2_value').innerText = v;
                set_edge_weight(cy);
            });
        }

        var set_edge_weight = function (cy) {
            var mod2 = function (node_id) {
                var matched = node_id.match(/#(\d)$/);
                if (matched[1]) {
                    return matched[1] % 2;
                }
                return -1;
            };

            cy.edges().forEach(edge => {
                var source_id = edge.source().data('id');
                var target_id = edge.target().data('id');
                var source_mod2 = mod2(source_id);
                if (source_mod2 < 0) {
                    return;
                }
                var target_mod2 = mod2(target_id);
                if (target_mod2 < 0) {
                    return;
                }
                switch (source_mod2 + target_mod2) {
                    case 0:  // #2-#2 従-従 mod2 0+0=0
                        edge.data('weight', parseInt(cost_2_2.value));
                        break;
                    case 1:  // #1-#2 主-従 mod2 1+0=1
                        edge.data('weight', parseInt(cost_1_2.value));
                        break;
                    case 2:  // #1-#1 主-主 mod2 1+1=2
                        edge.data('weight', parseInt(cost_1_1.value));
                        break;
                }
            });

            var texts = document.getElementsByName('start_end_edge');
            texts.forEach(input => {
                var start_node_id = input.start_node;
                var end_node_id = input.end_node;
                var edge = get_edge_by_nodes(cy, start_node_id, end_node_id);
                if (edge) {
                    input.value = edge.data('weight');
                }
            });

            dijkstra_restart();
        };

        // find selected radio button and dispatch 'change' event
        var dijkstra_restart = function () {
            var radios = document.getElementsByName('start_end_matrix');
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    radios[i].dispatchEvent(new Event('change'));
                    break;
                }
            }
        }

    };
    //
})();
