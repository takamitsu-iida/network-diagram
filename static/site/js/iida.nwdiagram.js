/* global cytoscape, iida */

(function () {

    iida.nwdiagram = function () {

        var basic_style = [
            {
                'selector': "edge",
                'style': {
                    'curve-style': "bezier", // "taxi" "bezier" "segments",
                    'width': 2,
                    // 'line-color': '#2B65EC',  // blue
                    'line-color': "#a9a9a9",
                    // 'target-arrow-color': "#a9a9a9",
                    // 'source-arrow-color': "#a9a9a9",
                    // 'target-arrow-shape': "circle",
                    // 'source-arrow-shape': "circle",
                    // 'label': "data(label)",
                    'label': edge => edge.data('label') ? `\u2060${edge.data('label')}\n\u2060` : '',
                    'text-wrap': "wrap",
                    'font-size': "8px",
                    'edge-text-rotation': "autorotate",
                    'source-endpoint': "outside-to-node",
                    'target-endpoint': "outside-to-node",
                    // 'source-text-offset': 10,
                    // 'target-text-offset': 10,
                }
            },

            {
                'selector': ".highlighted",
                'style': {
                    'background-color': "#a9a9a9",
                    'line-color': '#0000ff',
                    'width': 5,
                    'transition-property': "background-color, line-color",
                    'transition-duration': "0.5s"
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
                    'background-color': "#87ceeb",
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
                    'background-color': "#a9a9a9",
                    'width': 2,
                    'height': 2,
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
                    'background-color': "#f0e68c",
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
                'selector': ".logical_router.PE",
                'style': {
                    'border-color': "#000",
                    'border-width': 1,
                    'shape': "round-rectangle",
                    'background-color': "#30c9bc",
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
            layout: {
                name: 'preset'
            },
            style: basic_style,
            elements: iida.appdata.get_elements()
        });

        // add the panzoom control
        cy.panzoom({
            zoomFactor: 0.05, // zoom factor per zoom tick
            zoomDelay: 45, // how many ms between zoom ticks
            minZoom: 0.1, // min zoom level
            maxZoom: 10, // max zoom level
            fitPadding: 50, // padding when fitting
            panSpeed: 10, // how many ms in between pan ticks
            panDistance: 10, // max pan distance per tick
            panDragAreaSize: 75, // the length of the pan drag box in which the vector for panning is calculated (bigger = finer control of pan speed and direction)
            panMinPercentSpeed: 0.25, // the slowest speed we can pan by (as a percent of panSpeed)
            panInactiveArea: 8, // radius of inactive area in pan drag box
            panIndicatorMinOpacity: 0.5, // min opacity of pan indicator (the draggable nib); scales from this to 1.0
            zoomOnly: false, // a minimal version of the ui only with zooming (useful on systems with bad mousewheel resolution)
            fitSelector: undefined, // selector of elements to fit
            animateOnFit: function () { // whether to animate on fit
                return false;
            },
            fitAnimationDuration: 1000, // duration of animation on fit

            // icon class names
            sliderHandleIcon: 'fa fa-minus',
            zoomInIcon: 'fa fa-plus',
            zoomOutIcon: 'fa fa-minus',
            resetIcon: 'fa fa-expand'
        });

        // on grab, all router node save own position
        cy.on('grab', '.router', function (evt) {
            this.data('grab_x', this.position().x);
            this.data('grab_y', this.position().y);

            cy.$('.router').forEach(function (n) {
                n.data('old_x', n.position().x);
                n.data('old_y', n.position().y);
            });
        });

        // on drag, find drag_with nodes and set position
        cy.on('drag', '.router', function (evt) {
            var delta_x = this.position().x - this.data('grab_x');
            var delta_y = this.position().y - this.data('grab_y');

            var targets = this.data('drag_with') || [];
            targets.forEach(function (target) {
                var n = cy.$id(target);
                if (n && !n.grabbed()) {
                    var old_x = n.data('old_x');
                    var old_y = n.data('old_y');
                    n.position({ x: old_x + delta_x, y: old_y + delta_y });
                }
            });
        });

        // on position, fix port position
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

        var initial_position = document.getElementById('idInitialPosition');
        if (initial_position) {
            initial_position.addEventListener('click', function (event) {
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

        var layout_change = document.getElementById('idLayout');
        if (layout_change) {
            layout_change.addEventListener('change', function (event) {
                console.log("change layout: " + event.target.value);
                CyLayout.set_layout(cy, event.target.value);
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

        var data_change = document.getElementById('idData');
        if (data_change) {
            data_change.addEventListener('change', function (event) {
                CyData.set_data(cy, event.target.value);
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

        var ShortestPath = (function () {
            var _dijkstra = function (cy, start_node_id, end_node_id) {

                var start_node = cy.filter('node[id="' + start_node_id + '"]');
                if (!start_node) {
                    return;
                }
                var end_node = cy.filter('node[id="' + end_node_id + '"]');
                if (!end_node) {
                    return;
                }

                // eles.dijkstra( options )
                //   options
                //      root: The root node (selector or collection) where the algorithm starts.
                //      weight: function(edge) [optional] A function that returns the positive numeric weight for the edge. The weight indicates the cost of going from one node to another node.
                //      directed: [optional] A boolean indicating whether the algorithm should only go along edges from source to target (default false).
                var dijkstra = cy.elements().dijkstra(start_node, function (node) {
                    return node.data('weight');
                }, false);

                var x = 0;
                var bfs = dijkstra.pathTo(end_node);
                var highlightNextEle = function () {
                    var el = bfs[x];
                    if (el && el.isEdge()) {
                        el.addClass('highlighted');
                    }
                    if (x < bfs.length) {
                        x++;
                        // setTimeout(highlightNextEle, 500);
                        highlightNextEle();
                    }
                };

                highlightNextEle();
            }

            var _clear = function (cy) {
                cy.elements().removeClass('highlighted');
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

            // <tr> loop
            for (var tr_index = 0; tr_index < routers.length; tr_index++) {
                var tr = document.createElement('tr');

                // td loop
                for (var td_index = 0; td_index < routers.length; td_index++) {

                    // first low
                    if (tr_index === 0) {
                        var td = document.createElement('td');
                        td.setAttribute('valign', 'top');
                        var span = document.createElement('span');
                        span.className = "vertical";
                        span.textContent = routers[td_index];
                        td.appendChild(span);
                        tr.appendChild(td);
                    } else {
                        // first column
                        if (td_index === 0) {
                            var td = document.createElement('td');
                            var span = document.createElement('span');
                            span.textContent = routers[tr_index];
                            td.appendChild(span);
                            tr.appendChild(td);
                        } else {
                            var td = document.createElement('td');
                            if (td_index > tr_index) {
                                var input = document.createElement('input');
                                input.id = routers[tr_index] + routers[td_index];
                                input.type = 'radio';
                                input.name = 'start_end_matrix';
                                input.value = [routers[tr_index], routers[td_index]];
                                input.onchange = function () {
                                    var radios = document.getElementsByName('start_end_matrix');
                                    for (var i = 0; i < radios.length; i++) {
                                        if (radios[i].checked) {
                                            // console.log(radios[i].value);
                                            var start_end_list = radios[i].value.split(',');
                                            ShortestPath.clear(cy);
                                            ShortestPath.dijkstra(cy, start_end_list[0], start_end_list[1]);
                                        }
                                    }
                                };
                                if (tr_index === 1 && td_index === 2) {
                                    input.checked = true;
                                }
                                td.appendChild(input);
                            }
                            tr.appendChild(td);
                        }
                    }

                }

                table.appendChild(tr);
            }

            // 生成したtable要素を追加する
            start_end_matrix.appendChild(table);
        };


        var dijkstra_start_all = document.getElementById('idStartStop');
        if (dijkstra_start_all) {
            dijkstra_start_all.addEventListener('change', function () {
                ShortestPath.is_running = dijkstra_start_all.checked;
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
                if (!ShortestPath.is_running) {
                    return;
                }
                var radio_id = router_ids[row_index] + router_ids[col_index];
                var radio = document.getElementById(radio_id);
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change'));
                    /*
                    var start_end_list = radio.value.split(',');
                    var start_node = cy.filter('node[id="' + start_end_list[0] + '"]');
                    var end_node = cy.filter('node[id="' + start_end_list[1] + '"]');
                    ShortestPath.clear(cy);
                    ShortestPath.dijkstra(cy, start_node, end_node);
                    */
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
                        ShortestPath.is_running = false;
                    }
                }
            }
            check_next();
        };

        var dijkstra_clear = document.getElementById('idDijkstraClear');
        if (dijkstra_clear) {
            dijkstra_clear.addEventListener('click', function (event) {
                ShortestPath.clear(cy);
            });
        };

        var cost_1_1 = document.getElementById('cost_1_1');
        if (cost_1_1) {
            cost_1_1.addEventListener('input', function (event) {
                var v = event.target.value;
                document.getElementById('cost_1_1_value').innerText = v;
                set_edge_weight();
            });
        }

        var cost_1_2 = document.getElementById('cost_1_2');
        if (cost_1_2) {
            cost_1_2.addEventListener('input', function (event) {
                var v = event.target.value;
                document.getElementById('cost_1_2_value').innerText = v;
                set_edge_weight();
            });
        }

        var cost_2_2 = document.getElementById('cost_2_2');
        if (cost_2_2) {
            cost_2_2.addEventListener('input', function (event) {
                var v = event.target.value;
                document.getElementById('cost_2_2_value').innerText = v;
                set_edge_weight();
            });
        }

        var set_edge_weight = function () {
            cy.edges().forEach(edge => {
                for (var result of edge.id().matchAll(/#(\d).*#(\d)/g)) {
                    switch((result[1] % 2) + (result[2] % 2)) {
                        case 0:
                            // #2-#2 従-従 0+0=0
                            edge.data('weight', Number(cost_2_2.value));
                            break;
                        case 1:
                            // #1-#2 主-従 1+0=1
                            edge.data('weight', Number(cost_1_2.value));
                            break;
                        case 2:
                            // #1-#1 主-主 1+1=2
                            edge.data('weight', Number(cost_1_1.value));
                            break;
                    }

                    console.log(edge.id() + " " + edge.data('weight'));

                }
            });
        };

    };
    //
})();
