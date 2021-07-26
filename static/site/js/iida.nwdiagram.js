/* global cytoscape, iida */

(function () {

    iida.nwdiagram = function () {

        var DEFAULT_NODE_WIDTH = 200;
        var DEFAULT_NODE_HEIGHT = 120;
        var DEFAULT_PORT_WIDTH = 60;
        var DEFAULT_PORT_HEIGHT = 20;
        var DEFAULT_OUTSIDE_OFFSET = 30;

        var eles = []

        function get_node_by_id(id) {
            for (let index = 0; index < eles.length; index++) {
                const element = eles[index];
                if (element['data']['id'] === id) {
                    return element;
                }
            }
            return null;
        }

        var create_node = function (id) {

            // for parent node
            var _id = id;
            var _label = id;
            var _position = { x: 0, y: 0 };
            var _classes = [];
            var _width = DEFAULT_NODE_WIDTH;
            var _height = DEFAULT_NODE_HEIGHT;
            var _drag_with = [];

            // for port node
            var _pid = undefined;
            var _align = ['L', 'T'];  // Left, Top
            var _offset_x = 0;
            var _offset_y = 0;

            function exports() {
                return this;
            };

            exports.toObject = function () {
                var data = {};
                data['id'] = _id;
                data['label'] = _label;
                data['width'] = _width;
                data['height'] = _height;
                data['drag_with'] = _drag_with;
                if (_pid) {
                    data['pid'] = _pid;
                    data['align'] = _align;
                    data['offset_x'] = _offset_x;
                    data['offset_y'] = _offset_y;
                }
                return {
                    'data': data,
                    'position': _position,
                    'classes': _classes,
                    'grabbable': _pid ? false : true,
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
                if (typeof(_) === "string") {
                    _drag_with = [_];
                } else {
                    _drag_with = _;
                }
                return this;
            };

            // for port node
            exports.pid = function (_) {
                if (!arguments.length) { return _pid; }
                _pid = _;
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

            exports.fit = function (parent_position, parent_width, parent_height) {
                var nw = parent_width / 2;
                var nh = parent_height / 2;
                var pw = _width / 2;
                var ph = _height / 2;
                var oo = DEFAULT_OUTSIDE_OFFSET;

                switch (_align[0]) {
                    case 'L':  // Left
                        _offset_x = -1 * (nw - pw);
                        break;
                    case 'OL':  // Outside Left
                        _offset_x = -1 * (nw - pw + oo);
                        break;
                    case 'C':  // Center
                        _offset_x = 0;
                        break;
                    case 'R':  // Right
                        _offset_x = nw - pw;
                        break;
                    case 'OR':  // Outside Right
                        _offset_x = nw - pw + oo;
                        break;
                }

                switch (_align[1]) {
                    case 'T':  // Top
                        _offset_y = -1 * (nh - ph);
                        break;
                    case 'OT':  // Outside Top
                        _offset_y = -1 * (nh - ph + oo);
                        break;
                    case 'C':  // Center
                        _offset_y = 0;
                        break;
                    case 'B':  // Bottom
                        _offset_y = nh - ph;
                        break;
                    case 'OB':  // Outside Bottom
                        _offset_y = nh - ph + oo;
                        break;
                }
                _position = { x: parent_position.x + _offset_x, y: parent_position.y + _offset_y }

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

        var graph_data = [
            {
                'position': { x: 300, y: 0 },
                'id': "C棟コアルータ#1",
                'label': "C棟コアルータ#1\nNCS-55A1-36H-B\ntac-his-cr103\nloopback:172.16.11.3\nMgmt 10.100.1.244",
                'width': 200,
                'drag_with': "C棟コアルータ#2",
                'ports': [
                    {
                        'id': "Hu0/0/0/0",
                        'label': "Hu0/0/0/0\n.89",
                        'align': ['L', 'T']
                    },
                    {
                        'id': "Hu0/0/0/16",
                        'label': "Hu0/0/0/16\n.9",
                        'align': ['R', 'T']
                    },
                    {
                        'id': "Hu0/0/0/27",
                        'label': "Hu0/0/0/27\n.42",
                        'align': ['R', 'C']
                    },
                    {
                        'id': "Hu0/0/0/22",
                        'label': "Hu0/0/0/22\n.37",
                        'align': ['R', 'B']
                    },
                    {
                        'id': "Hu0/0/0/1",
                        'label': "Hu0/0/0/1\n.97",
                        'align': ['L', 'C']
                    }
                ],
            },
            {
                'position': { x: 300, y: 200 },
                'id': "C棟コアルータ#2",
                'label': "C棟コアルータ#2\nNCS-55A1-36H-B\ntac-his-cr104\nloopback:172.16.11.4\nMgmt 10.100.1.243",
                'drag_with': "C棟コアルータ#1",
                'ports': [
                    {
                        'id': "Hu0/0/0/0",
                        'label': "Hu0/0/0/0\n.94",
                        'align': ['L', 'T']
                    },
                    {
                        'id': "Hu0/0/0/22",
                        'label': "Hu0/0/0/22\n.38",
                        'align': ['R', 'T']
                    },
                    {
                        'id': "Hu0/0/0/16",
                        'label': "Hu0/0/0/16\n.13",
                        'align': ['R', 'C']
                    },
                    {
                        'id': "Hu0/0/0/27",
                        'label': "Hu0/0/0/27\n.46",
                        'align': ['R', 'B']
                    },
                    {
                        'id': "Hu0/0/0/1",
                        'label': "Hu0/0/0/1\n.101",
                        'align': ['L', 'C']
                    }
                ]
            },
            {
                'position': { x: 0, y: 50 },
                'id': "ユーザ収容ルータ#1",
                'label': "ユーザ収容ルータ#1\nNCS5501\ntac-his-ur527\nloopback:172.16.14.27\nMgmt 10.100.1.86",
                'drag_with': "ユーザ収容ルータ#2",
                'ports': [
                    {
                        'id': "Hu0/0/1/0",
                        'label': "Hu0/0/0/1/0\n.90",
                        'align': ['R', 'C']
                    },
                    {
                        'id': "Hu0/0/1/2",
                        'label': "Hu0/0/1/2\n.45",
                        'align': ['R', 'B']
                    },
                    {
                        'id': "Gi0/0/0/0",
                        'label': "Gi0/0/0/0\nBundle-E1000",
                        'align': ['L', 'C']
                    },
                    {
                        'id': "Hu0/0/1/4",
                        'label': "Hu0/0/1/4",
                        'align': ['L', 'T']
                    },
                    {
                        'id': "Hu0/0/1/4Connector",
                        'classes': ['connector'],
                        'align': ['L', 'OT']
                    },
                    {
                        'id': "Hu0/0/1/5",
                        'label': "Hu0/0/1/5\n.253",
                        'align': ['C', 'T']
                    },
                    {
                        'id': "Hu0/0/1/5Connector",
                        'classes': ['connector'],
                        'align': ['C', 'OT']
                    }
                ]
            },
            {
                'position': { x: 0, y: 250 },
                'id': "ユーザ収容ルータ#2",
                'label': "ユーザ収容ルータ#2\nNCS5501\ntac-his-ur528\nloopback:172.16.14.28\nMgmt 10.100.1.92",
                'drag_with': "ユーザ収容ルータ#1",
                'ports': [
                    {
                        'id': "Hu0/0/1/2",
                        'label': "Hu0/0/1/2\n.46",
                        'align': ['R', 'T']
                    },
                    {
                        'id': "Hu0/0/1/0",
                        'label': "Hu0/0/1/0\n.93",
                        'align': ['R', 'C']
                    },
                    {
                        'id': "Hu0/0/1/5",
                        'label': "Hu0/0/1/5\n.254",
                        'align': ['C', 'B'],
                    },
                    {
                        'id': "Hu0/0/1/5Connector",
                        'align': ['C', 'OB'],
                        'classes': ['connector']
                    },
                    {
                        'id': "Hu0/0/1/4",
                        'align': ['L', 'B']
                    },
                    {
                        'id': "Hu0/0/1/4Connector",
                        'align': ['L', 'OB'],
                        'classes': ['connector']
                    },
                    {
                        'id': "G0/0/0/0",
                        'label': "G0/0/0/0\nBundle-E1000",
                        'align': ['L', 'C']
                    }
                ]
            },
            {
                'source': "C棟コアルータ#1Hu0/0/0/22",
                'target': "C棟コアルータ#2Hu0/0/0/22",
                'label': "192.168.19.36/30"
            },
            {
                'source': "ユーザ収容ルータ#1Hu0/0/1/5",
                'target': "ユーザ収容ルータ#1Hu0/0/1/5Connector"
            },
            {
                'source': "ユーザ収容ルータ#1Hu0/0/1/4",
                'target': "ユーザ収容ルータ#1Hu0/0/1/4Connector"
            },
            {
                'source': "ユーザ収容ルータ#1Hu0/0/1/5Connector",
                'target': "ユーザ収容ルータ#1Hu0/0/1/4Connector",
                'label': ".253"
            },
            {
                'source': "ユーザ収容ルータ#2Hu0/0/1/5",
                'target': "ユーザ収容ルータ#2Hu0/0/1/5Connector"
            },
            {
                'source': "ユーザ収容ルータ#2Hu0/0/1/4",
                'target': "ユーザ収容ルータ#2Hu0/0/1/4Connector"
            },
            {
                'source': "ユーザ収容ルータ#2Hu0/0/1/5Connector",
                'target': "ユーザ収容ルータ#2Hu0/0/1/4Connector",
                'label': ".254"
            },
            {
                'source': "ユーザ収容ルータ#1Hu0/0/1/2",
                'target': "ユーザ収容ルータ#2Hu0/0/1/2",
                'label': "192.168.14.44/30"
            },
            {
                'source': "C棟コアルータ#1Hu0/0/0/0",
                'target': "ユーザ収容ルータ#1Hu0/0/1/0",
                'label': "192.168.10.88/30"
            },
            {
                'source': "C棟コアルータ#2Hu0/0/0/0",
                'target': "ユーザ収容ルータ#2Hu0/0/1/0",
                'label': "192.168.10.96/30"
            }
        ];

        //
        // 足りないデータを補完してcytoscape.js用のデータelesを作成する
        //
        graph_data.forEach(element => {
            var position = element.position || undefined;
            if (position) {  // ノードだと考えて処理する
                var pid = element.id;
                var label = element.label || '';
                var node_width = element.width || DEFAULT_NODE_WIDTH;
                var node_height = element.height || DEFAULT_NODE_HEIGHT;
                var classes = element.classes || ['pnode'];
                var ports = element.ports || [];
                var drag_with = element.drag_with || [];
                var pnode = create_node(pid).position(position).label(label).width(node_width).height(node_height).classes(classes).drag_with(drag_with);
                eles.push(pnode.toObject());

                ports.forEach(element => {
                    var port_id = element.id;
                    var label = element.label || port_id;
                    var align = element.align || 'TL';
                    var port_width = element.width || DEFAULT_PORT_WIDTH;
                    var port_height = element.height || DEFAULT_PORT_HEIGHT;
                    var classes = element.classes || ['port'];
                    var port = create_node(pid + port_id).pid(pid).align(align).label(label).width(port_width).height(port_height).classes(classes).fit(position, node_width, node_height);
                    eles.push(port.toObject());
                });
            } else {  // エッジだと考えて処理する
                var source = element.source;
                var target = element.target;
                var label = element.label || "";
                var edge = create_edge(source + target).source(source).target(target).label(label);
                eles.push(edge.toObject());
            }
        });


        var basic_style = [
            {
                selector: 'edge',
                style: {
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
                    'edge-text-rotation': 'autorotate',
                    'source-endpoint': "outside-to-node-or-label",
                    'target-endpoint': "outside-to-node-or-label",
                    // 'source-text-offset': 10,
                    // 'target-text-offset': 10,
                }
            },
            {
                selector: '.pnode',
                style: {
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
                selector: '.port',
                style: {
                    'border-color': '#000',
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
                selector: '.connector',
                style: {
                    'shape': "rectangle",
                    'background-color': "#a9a9a9",
                    'width': 2,
                    'height': 2,
                }
            },
            {
                selector: '.router',
                style: {
                    'background-image': 'https://takamitsu-iida.github.io/cytoscapejs-practice/static/site/img/router.jpg'
                }
            },
            {
                selector: '.firewall',
                style: {
                    'background-image': 'https://takamitsu-iida.github.io/cytoscapejs-practice/static/site/img/firewall.jpg'
                }
            }
        ]


        var cy = window.cy = cytoscape({
            container: document.getElementById('cy'),
            minZoom: 1,
            maxZoom: 4,
            boxSelectionEnabled: false,
            autounselectify: true,
            layout: {  // レイアウトの初期値
                name: 'preset',
                // name: 'grid',
                // name: 'circle',
                // name: 'breadthfirst',
                // name: 'elk',
                // name: 'fcose'
                nodeSep: 0,
            },
            style: basic_style,
            elements: eles,
        });


        // on grab, all parent node save own position
        cy.on('grab', '.pnode', function (evt) {
            this.data('grab_x', this.position().x);
            this.data('grab_y', this.position().y);

            cy.$(".pnode").forEach(function (n) {
                n.data('old_x', n.position().x);
                n.data('old_y', n.position().y);
            });
        });

        cy.on('drag', '.pnode', function (evt) {
            var delta_x = this.position().x - this.data('grab_x');
            var delta_y = this.position().y - this.data('grab_y');

            var targets = this.data('drag_with');
            targets.forEach(function (target) {
                var n = cy.$id(target);
                if (n && !n.grabbed()) {
                    var old_x = n.data('old_x');
                    var old_y = n.data('old_y');
                    n.position({x: old_x + delta_x, y: old_y + delta_y });
                }
            });
        });

        cy.on('position', '.pnode', function (evt) {
            var pnode = evt.target;
            pnode_position = pnode.position();

            // var ports = cy.$(".port").filter(function (n) {
            var ports = cy.$("node").filter(function (n) {
                if (n.data('pid') === pnode.id()) {
                    return n;
                }
            });
            ports.forEach(port => {
                offset_x = port.data('offset_x');
                offset_y = port.data('offset_y');
                port.position({ x: pnode_position.x + offset_x, y: pnode_position.y + offset_y })
            });
        });


        //
        // たぶん使わない
        //
        var CyLayout = (function () {
            var _setLayout = function (cy, layoutName) {
                var layout = {
                    name: layoutName,
                    fit: true,
                    animate: true,
                };
                // cy.layout(layout).run();
                cy.$(".pnode").layout(layout).run();
                return layout;
            };
            return {
                setLeyout: _setLayout
            };
        })();
        document.getElementById('Layout').addEventListener('change', function (event) {
            CyLayout.setLeyout(cy, event.target.value);
        });

        cy.fit();

    };
    //
})();
