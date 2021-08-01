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

        // add the panzoom control with default parameter
        // https://github.com/cytoscape/cytoscape.js-panzoom
        cy.panzoom({});

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


    };
    //
})();
