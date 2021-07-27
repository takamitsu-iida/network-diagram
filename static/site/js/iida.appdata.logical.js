/* global iida */

(function () {

    var DEFAULT_NODE_WIDTH = 20;
    var DEFAULT_NODE_HEIGHT = 20;

    var create_node = function (id) {

        var _id = id;
        var _label = id;
        var _position = { x: 0, y: 0 };
        var _classes = [];
        var _width = DEFAULT_NODE_WIDTH;
        var _height = DEFAULT_NODE_HEIGHT;

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
            data['initial_position'] = Object.assign({}, _position);  // store initial position to revert to preset position

            return {
                'data': data,
                'position': _position,
                'classes': _classes
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
    // iida.appdata.logical_routers配列から足りないデータを補完してcytoscape.js用のデータを作成する
    //
    var create_logical_elements = function () {
        var eles = []
        iida.appdata.logical_routers.forEach(element => {
            if (element.source && element.target) {
                // edge
                var source = element.source;
                var target = element.target;
                var label = element.label || "";
                var edge = create_edge(source + target).source(source).target(target).label(label);
                eles.push(edge.toObject());
            } else {
                var position = element.position || { x: 0, y: 0 };
                var router_id = element.id;
                var label = element.label || '';
                var node_width = element.width || DEFAULT_NODE_WIDTH;
                var node_height = element.height || DEFAULT_NODE_HEIGHT;
                var classes = element.classes || ['router', 'logical_router'];
                var router_node = create_node(router_id).position(position).label(label).width(node_width).height(node_height).classes(classes);
                eles.push(router_node.toObject());
            }

        });
        return eles;
    };

    iida.appdata.logical_elements = create_logical_elements();

})();
