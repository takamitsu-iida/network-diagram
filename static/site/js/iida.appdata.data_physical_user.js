/* global iida */

(function () {

    var x, y, y_interval;
    var routers;

    x = 900;
    y = 0;
    y_interval = 200;

    routers = [
        {
            'position': { 'x': x, 'y': y + y_interval*0 },
            'id': "C棟ユーザ収容ルータ#1",
            'label': "C棟ユーザ収容ルータ#1\nNCS5501\ntac-his-ur527\nloopback:172.16.14.27\nMgmt 10.100.1.86",
            'drag_with': "C棟ユーザ収容ルータ#2",
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
                    'align': ['L', 'C'],
                    'parent': "C棟ユーザ収容ルータ#1#2Bundle-Ether1000"
                },
                {
                    'id': "Hu0/0/1/4",
                    'label': "Hu0/0/1/4",
                    'align': ['L', 'T'],
                    'parent': "C棟ユーザ収容ルータ#1#2Bundle-Ether1000"
                },
                {
                    'id': "Hu0/0/1/4Connector",
                    'classes': ['physical_connector'],
                    'align': ['L', 'OT']
                },
                {
                    'id': "Hu0/0/1/5",
                    'label': "Hu0/0/1/5\n.253",
                    'align': ['C', 'T']
                },
                {
                    'id': "Hu0/0/1/5Connector",
                    'classes': ['physical_connector'],
                    'align': ['C', 'OT']
                }
            ]
        },

        {
            'position': { 'x': x, 'y': y + y_interval*1 },
            'id': "C棟ユーザ収容ルータ#2",
            'label': "C棟ユーザ収容ルータ#2\nNCS5501\ntac-his-ur528\nloopback:172.16.14.28\nMgmt 10.100.1.92",
            'drag_with': "C棟ユーザ収容ルータ#1",
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
                    'classes': ['physical_connector']
                },
                {
                    'id': "Hu0/0/1/4",
                    'align': ['L', 'B'],
                    'parent': "C棟ユーザ収容ルータ#1#2Bundle-Ether1000"
                },
                {
                    'id': "Hu0/0/1/4Connector",
                    'align': ['L', 'OB'],
                    'classes': ['physical_connector']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C'],
                    'parent': "C棟ユーザ収容ルータ#1#2Bundle-Ether1000"
                }
            ]
        },

        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "C棟ユーザ収容ルータ#1#2Bundle-Ether1000",
            'classes': ['parent']
        },

        {
            'source': "C棟ユーザ収容ルータ#1Hu0/0/1/5",
            'target': "C棟ユーザ収容ルータ#1Hu0/0/1/5Connector"
        },

        {
            'source': "C棟ユーザ収容ルータ#1Hu0/0/1/4",
            'target': "C棟ユーザ収容ルータ#1Hu0/0/1/4Connector"
        },

        {
            'source': "C棟ユーザ収容ルータ#1Hu0/0/1/5Connector",
            'target': "C棟ユーザ収容ルータ#1Hu0/0/1/4Connector",
            'label': ".253"
        },

        {
            'source': "C棟ユーザ収容ルータ#2Hu0/0/1/5",
            'target': "C棟ユーザ収容ルータ#2Hu0/0/1/5Connector"
        },

        {
            'source': "C棟ユーザ収容ルータ#2Hu0/0/1/4",
            'target': "C棟ユーザ収容ルータ#2Hu0/0/1/4Connector"
        },

        {
            'source': "C棟ユーザ収容ルータ#2Hu0/0/1/5Connector",
            'target': "C棟ユーザ収容ルータ#2Hu0/0/1/4Connector",
            'label': ".254"
        },

        {
            'source': "C棟ユーザ収容ルータ#1Hu0/0/1/2",
            'target': "C棟ユーザ収容ルータ#2Hu0/0/1/2",
            'label': "192.168.14.44/30"
        },

        {
            'source': "C棟コアルータ#1Hu0/0/0/0",
            'target': "C棟ユーザ収容ルータ#1Hu0/0/1/0",
            'label': "192.168.10.88/30"
        },

        {
            'source': "C棟コアルータ#2Hu0/0/0/0",
            'target': "C棟ユーザ収容ルータ#2Hu0/0/1/0",
            'label': "192.168.10.92/30"
        },

        {
            'position': { 'x': x, 'y': y + y_interval*2 },
            'id': "C棟ユーザ収容ルータ#3",
            'label': "C棟ユーザ収容ルータ#3\nNCS5501\ntac-his-ur529\nloopback:172.16.14.29\nMgmt 10.100.1.98\n",
            'drag_with': "C棟ユーザ収容ルータ#4",
            'ports': [
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.98",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.49",
                    'align': ['R', 'B']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C'],
                    'parent': "C棟ユーザ収容ルータ#3#4Bundle-Ether1000"
                }
            ]
        },

        {
            'position': { 'x': x, 'y': y + y_interval*3 },
            'id': "C棟ユーザ収容ルータ#4",
            'label': "C棟ユーザ収容ルータ#4\nNCS5501\ntac-his-ur530\nloobback:172.16.14.30\nMgmt 10.100.1.104",
            'drag_with': "C棟ユーザ収容ルータ#3",
            'ports': [
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.50",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.102",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C'],
                    'parent': "C棟ユーザ収容ルータ#3#4Bundle-Ether1000"
                }
            ]
        },

        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "C棟ユーザ収容ルータ#3#4Bundle-Ether1000",
            'classes': ['parent']
        },

        {
            'source': "C棟ユーザ収容ルータ#3Hu0/0/1/2",
            'target': "C棟ユーザ収容ルータ#4Hu0/0/1/2",
            'label': "192.168.14.48/30"
        },

        {
            'source': "C棟ユーザ収容ルータ#3Hu0/0/1/0",
            'target': "C棟コアルータ#1Hu0/0/0/1",
            'label': "192.168.10.96/30"
        },

        {
            'source': "C棟ユーザ収容ルータ#4Hu0/0/1/0",
            'target': "C棟コアルータ#2Hu0/0/0/1",
            'label': "192.168.10.100/30"
        },

        {
            'position': { 'x': x, 'y': y + y_interval*4 },
            'id': "B棟ユーザ収容ルータ#1",
            'label': "B棟ユーザ収容ルータ#1\nNCS5501\ntab-his-ur517\nloopback:172.16.14.17\nMgmt 10.100.1.44",
            'drag_with': "B棟ユーザ収容ルータ#2",
            'ports': [
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.2",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.1",
                    'align': ['R', 'B']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C'],
                    'parent': "B棟ユーザ収容ルータ#1#2Bundle-Ether1000"
                }
            ]
        },

        {
            'position': { 'x': x, 'y': y + y_interval*5 },
            'id': "B棟ユーザ収容ルータ#2",
            'label': "B棟ユーザ収容ルータ#2\nNCS5501\ntab-his-ur518\nloopback:172.16.14.18\nMgmt 10.100.1.45",
            'drag_with': "B棟ユーザ収容ルータ#1",
            'ports': [
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.2",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.6",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C'],
                    'parent': "B棟ユーザ収容ルータ#1#2Bundle-Ether1000"
                }
            ]
        },

        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "B棟ユーザ収容ルータ#1#2Bundle-Ether1000",
            'classes': ['parent']
        },

        {
            'source': "B棟ユーザ収容ルータ#1Hu0/0/1/2",
            'target': "B棟ユーザ収容ルータ#2Hu0/0/1/2",
            'label': "192.168.14.0/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#1Hu0/0/1/0",
            'target': "B棟コアルータ#1Hu0/0/0/0",
            'label': "192.168.10.0/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#2Hu0/0/1/0",
            'target': "B棟コアルータ#2Hu0/0/0/0",
            'label': "192.168.10.4/30"
        },

        {
            'position': { 'x': x, 'y': y + y_interval*6 },
            'id': "B棟ユーザ収容ルータ#3",
            'label': "B棟ユーザ収容ルータ#3\nNCS5501\ntab-his-ur519\nloopback:172.16.14.19\nMgmt 10.100.1.50",
            'drag_with': "B棟ユーザ収容ルータ#4",
            'ports': [
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.10",
                    'align': ['R', 'C']
                },
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.5",
                    'align': ['R', 'B']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C'],
                    'parent': "B棟ユーザ収容ルータ#3#4Bundle-Ether1000"
                }
            ]
        },

        {
            'position': { 'x': x, 'y': y + y_interval*7 },
            'id': "B棟ユーザ収容ルータ#4",
            'label': "B棟ユーザ収容ルータ#4\nNCS5501\ntab-his-ur520\nloopback:172.16.14.20\nMgmt 10.100.1.51\n",
            'drag_with': "B棟ユーザ収容ルータ#3",
            'ports': [
                {
                    'id': "Hu0/0/1/2",
                    'label': "Hu0/0/1/2\n.6",
                    'align': ['R', 'T']
                },
                {
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/1/0\n.14",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/0",
                    'label': "G0/0/0/0\nBundle-E1000",
                    'align': ['L', 'C'],
                    'parent': "B棟ユーザ収容ルータ#3#4Bundle-Ether1000"
                }
            ]
        },

        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "B棟ユーザ収容ルータ#3#4Bundle-Ether1000",
            'classes': ['parent']
        },

        {
            'source': "B棟ユーザ収容ルータ#3Hu0/0/1/2",
            'target': "B棟ユーザ収容ルータ#4Hu0/0/1/2",
            'label': "192.168.14.4/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#3Hu0/0/1/0",
            'target': "B棟コアルータ#1Hu0/0/0/1",
            'label': "192.168.10.8/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#4Hu0/0/1/0",
            'target': "B棟コアルータ#2Hu0/0/0/1",
            'label': "192.168.10.12/30"
        },



    ];

    iida.appdata.physical_graph = (iida.appdata.physical_graph || []).concat(routers);

})();
