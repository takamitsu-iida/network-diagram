/* global iida */

(function () {

    var routers = [
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

    iida.appdata.graph_data = (iida.appdata.graph_data || []).concat(routers);

})();
