/* global iida */

(function () {

    var routers = [
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
            'source': "C棟コアルータ#1Hu0/0/0/22",
            'target': "C棟コアルータ#2Hu0/0/0/22",
            'label': "192.168.19.36/30"
        },

    ];

    iida.appdata.graph_data = (iida.appdata.graph_data || []).concat(routers);

})();
