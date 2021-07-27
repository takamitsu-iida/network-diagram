/* global cytoscape, iida */

(function () {

    iida.nwdiagram = function () {

        var DEFAULT_NODE_WIDTH = 200;
        var DEFAULT_NODE_HEIGHT = 120;
        var DEFAULT_PORT_WIDTH = 60;
        var DEFAULT_PORT_HEIGHT = 20;
        var DEFAULT_OUTSIDE_OFFSET = 20;

        var create_node = function (id) {

            // for router node
            var _id = id;
            var _label = id;
            var _position = { x: 0, y: 0 };
            var _classes = [];
            var _width = DEFAULT_NODE_WIDTH;
            var _height = DEFAULT_NODE_HEIGHT;
            var _drag_with = [];
            var _grabbable = true;  // only router is grabbable

            // for port node
            var _router_id = undefined;
            var _align = ['L', 'T'];  // Left, Top
            var _offset_x = 0;
            var _offset_y = 0;

            // for grouping
            var _parent = undefined;

            function exports() {
                return this;
            };

            exports.toObject = function () {
                var data = {};

                // for router and port common parameters
                data['id'] = _id;
                data['label'] = _label;
                data['width'] = _width;
                data['height'] = _height;
                data['drag_with'] = _drag_with;
                data['initial_position'] = Object.assign({}, _position);  // store initial position to revert to preset position

                // for port only parameters
                if (_router_id) {
                    data['router_id'] = _router_id;
                    data['align'] = _align;
                    data['offset_x'] = _offset_x;
                    data['offset_y'] = _offset_y;
                    if (_parent) {
                        data['parent'] = _parent;
                    }
                    _grabbable = false;
                }

                if (_classes.includes('parent')) {
                    _grabbable = false;
                }

                return {
                    'data': data,
                    'position': _position,
                    'classes': _classes,
                    'grabbable': _grabbable
                };
            }

            exports.id = function (_) {
                if (!arguments.length) { return _id; }
                _id = _;
                return this;
            };

            exports.label = function (_) {
                if (!arguments.length) {
                    return _label;
                }
                _label = _;
                return this;
            };

            exports.position = function (_) {
                if (!arguments.length) {
                    return _position;
                }
                _position = _;
                return this;
            };

            exports.width = function (_) {
                if (!arguments.length) {
                    return _width;
                }
                _width = _;
                return this;
            };

            exports.height = function (_) {
                if (!arguments.length) {
                    return _height;
                }
                _height = _;
                return this;
            };

            exports.classes = function (_) {
                if (!arguments.length) {
                    return _classes;
                }
                _classes = _;
                return this;
            };

            exports.drag_with = function (_) {
                if (!arguments.length) {
                    return _drag_with;
                }
                if (typeof (_) === "string") {
                    _drag_with = [_];
                } else {
                    _drag_with = _;
                }
                return this;
            };

            // for port node
            exports.router_id = function (_) {
                if (!arguments.length) { return _router_id; }
                _router_id = _;
                return this;
            };

            // for port node
            exports.align = function (_) {
                if (!arguments.length) {
                    return _align;
                }
                _align = _;
                return this;
            };

            // for port node
            exports.parent = function (_) {
                if (!arguments.length) {
                    return _parent;
                }
                _parent = _;
                return this;
            };


            exports.fit = function (router_position, router_width, router_height) {
                var nw = router_width / 2;
                var nh = router_height / 2;
                var pw = _width / 2;
                var ph = _height / 2;
                var oo = DEFAULT_OUTSIDE_OFFSET;

                switch (_align[0]) {
                    case 'L':  // Left
                        _offset_x = -1 * (nw - pw);
                        break;
                    case 'OL':  // Outside Left
                        _offset_x = -1 * (nw + oo);
                        break;
                    case 'C':  // Center
                        _offset_x = 0;
                        break;
                    case 'R':  // Right
                        _offset_x = nw - pw;
                        break;
                    case 'OR':  // Outside Right
                        _offset_x = nw + oo;
                        break;
                    case 'ORR':  // Outside Right Right
                        _offset_x = nw + oo + oo;
                        break;
                }

                switch (_align[1]) {
                    case 'T':  // Top
                        _offset_y = -1 * (nh - ph);
                        break;
                    case 'T2':  // 2nd Top
                        _offset_y = -1 * (nh - ph) + _height;
                        break;
                    case 'OT':  // Outside Top
                        _offset_y = -1 * (nh + oo);
                        break;
                    case 'C':  // Center
                        _offset_y = 0;
                        break;
                    case 'B':  // Bottom
                        _offset_y = nh - ph;
                        break;
                    case 'OB':  // Outside Bottom
                        _offset_y = nh + oo;
                        break;
                }
                _position = { x: router_position.x + _offset_x, y: router_position.y + _offset_y }

                return this;
            };

            return exports;
        };


        var create_edge = function (id) {
            var _id = id;
            var _source;
            var _target;
            var _label = "";
            var _classes = ['autorotate'];

            function exports() {
                return this;
            };

            exports.toObject = function () {
                return {
                    'data': {
                        'id': _id,
                        'source': _source,
                        'target': _target,
                        'label': _label
                    },
                    'classes': _classes
                }
            }

            exports.id = function (_) {
                if (!arguments.length) { return _id; }
                _id = _;
                return this;
            };

            exports.source = function (_) {
                if (!arguments.length) {
                    return _source;
                }
                _source = _;
                return this;
            };

            exports.target = function (_) {
                if (!arguments.length) {
                    return _target;
                }
                _target = _;
                return this;
            };

            exports.label = function (_) {
                if (!arguments.length) {
                    return _label;
                }
                _label = _;
                return this;
            };

            exports.classes = function (_) {
                if (!arguments.length) {
                    return _classes;
                }
                _classes = _;
                return this;
            };

            return exports;
        };

        //
        // iida.appdata.physical_graph配列から足りないデータを補完してcytoscape.js用のデータelesを作成する
        //
        var create_physical_data = function () {
            var eles = []
            iida.appdata.physical_graph.forEach(element => {
                if (element.source && element.target) {
                    // edge
                    var source = element.source;
                    var target = element.target;
                    var label = element.label || "";
                    var edge = create_edge(source + target).source(source).target(target).label(label);
                    eles.push(edge.toObject());
                } else {
                    // router node
                    var position = element.position || { x: 0, y: 0 };
                    var router_id = element.id;
                    var label = element.label || '';
                    var node_width = element.width || DEFAULT_NODE_WIDTH;
                    var node_height = element.height || DEFAULT_NODE_HEIGHT;
                    var classes = element.classes || ['router', 'physical_router'];
                    var ports = element.ports || [];
                    var drag_with = element.drag_with || [];
                    var router_node = create_node(router_id).position(position).label(label).width(node_width).height(node_height).classes(classes).drag_with(drag_with);
                    eles.push(router_node.toObject());

                    // port node
                    ports.forEach(element => {
                        var port_id = element.id;
                        var label = element.label || port_id;
                        var align = element.align || 'TL';
                        var port_width = element.width || DEFAULT_PORT_WIDTH;
                        var port_height = element.height || DEFAULT_PORT_HEIGHT;
                        var classes = element.classes || ['port', 'physical_port'];
                        var parent = element.parent || undefined;
                        var port = create_node(router_id + port_id).router_id(router_id).align(align).label(label).width(port_width).height(port_height).classes(classes).parent(parent).fit(position, node_width, node_height);
                        eles.push(port.toObject());
                    });
                }

            });
            return eles;
        };

        var physical_eles = create_physical_data();

        var create_logical_data = function () {
            return iida.appdata.logical_graph;
        };

        var logical_eles = create_logical_data();

        var basic_style = [
            {
                'selector': "edge",
                'style': {
                    'curve-style': "bezier", // "taxi" "bezier" "segments",
                    'width': 2,
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
                    'source-endpoint': "outside-to-node-or-label",
                    'target-endpoint': "outside-to-node-or-label",
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
                    'background-color': "#87ceeb",
                    'label': "data(label)",
                    'width': DEFAULT_PORT_WIDTH,
                    'height': DEFAULT_PORT_HEIGHT,
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
                'selector': ".parent",
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
            minZoom: 1,
            maxZoom: 5,
            boxSelectionEnabled: false,
            autounselectify: true,
            layout: {
                name: 'preset'
            },
            style: basic_style,
            elements: physical_eles
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

            var targets = this.data('drag_with');
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

        var get_initial_position = function (node) { return node.data('initial_position'); };

        var animate_to_initial_position = function () {
            Promise.all(cy.nodes('.router').map(node => {
                return node.animation({
                    position: get_initial_position(node),
                    duration: 1000,
                    easing: 'ease'
                }).play().promise();
            }));
        };

        var CyLayout = (function () {
            var _set_layout = function (cy, layout_name) {
                if (layout_name === 'preset') {
                    animate_to_initial_position();
                    return;
                }
                var layout = {
                    name: layout_name,
                    fit: true,
                    animate: true,
                };
                // cy.layout(layout).run();
                cy.$('.router').layout(layout).run();
            };
            return {
                set_layout: _set_layout
            };
        })();

        document.getElementById('Layout').addEventListener('change', function (event) {
            CyLayout.set_layout(cy, event.target.value);
        });

        var CyData = (function () {
            var _set_data = function (cy, data_name) {
                var eles = [];
                if (data_name === 'physical') {
                    eles = physical_eles;
                } else if (data_name === 'logical') {
                    eles = logical_eles;
                }
                cy.elements().remove();
                cy.add(eles);
            };
            return {
                set_data: _set_data
            };
        })();

        document.getElementById('Data').addEventListener('change', function (event) {
            CyData.set_data(cy, event.target.value);
        });



    };
    //
})();
