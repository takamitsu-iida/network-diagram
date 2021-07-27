/* global iida */

(function () {

    var x = 1500;
    var y = 300;
    var y_interval = 200;

    var routers = [
        {
            'position': { 'x': x, 'y': y + y_interval*0 },
            'id': "C棟サービス収容ルータ#1",
            'label': "C棟サービス収容ルータ#1\nASR 9901\ntac-his-sr103\nloopback:172.16.13.3\nMgmt 10.100.1.240",
            'drag_with': ["C棟サービス収容ルータ#2"],
            'ports': [
                {
                    'id': "Hu0/0/0/20",
                    'label': "Hu0/0/0/0/20\n.10",
                    'align': ['L', 'C']
                },
                {
                    'id': "Hu0/0/0/21",
                    'label': "Hu0/0/0/0/21\n.5",
                    'align': ['L', 'B']
                },
                {
                    'id': "G0/0/0/8",
                    'label': "G0/0/0/8",
                    'align': ['R', 'T']
                },
                {
                    'id': "G0/0/0/9",
                    'label': "G0/0/0/9",
                    'align': ['R', 'T2']
                },
                {
                    'id': "G0/0/0/10",
                    'label': "G0/0/0/10",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/10Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'C'],
                    'parent': "C棟サービス収容ルータ#1#2Bundle-Ether1010"
                },

            ]
        },

        {
            'source': "C棟サービス収容ルータ#1Hu0/0/0/20",
            'target': "C棟コアルータ#1Hu0/0/0/16",
            'label': "192.168.16.8/30"
        },

        {
            'source': "C棟サービス収容ルータ#1G0/0/0/10",
            'target': "C棟サービス収容ルータ#1G0/0/0/10Connector"
        },


        {
            '__COMMENT__': "ポートを網掛けするためのparent",
            'id': "C棟サービス収容ルータ#1#2Bundle-Ether1010",
            'label': "Bundle-Ether1010",
            'classes': ['parent']
        },


        {
            'position': { 'x': x, 'y': y + y_interval*1 },
            'id': "C棟サービス収容ルータ#2",
            'label': "C棟サービス収容ルータ#2\nASR 9901\ntac-his-sr104\nloopback:172.16.13.4\nMgmt 10.100.1.239\n",
            'drag_with': ["C棟サービス収容ルータ#1"],
            'ports': [
                {
                    'id': "Hu0/0/0/21",
                    'label': "Hu0/0/0/0/21\n.6",
                    'align': ['L', 'T']
                },
                {
                    'id': "Hu0/0/0/20",
                    'label': "Hu0/0/0/0/20\n.14",
                    'align': ['L', 'C']
                },
                {
                    'id': "G0/0/0/8",
                    'label': "G0/0/0/8",
                    'align': ['R', 'T']
                },
                {
                    'id': "G0/0/0/9",
                    'label': "G0/0/0/9",
                    'align': ['R', 'T2']
                },
                {
                    'id': "G0/0/0/10",
                    'label': "G0/0/0/10",
                    'align': ['R', 'C']
                },
                {
                    'id': "G0/0/0/10Connector",
                    'classes': ['physical_connector'],
                    'align': ['OR', 'C'],
                    'parent': "C棟サービス収容ルータ#1#2Bundle-Ether1010"
                },


            ]
        },

        {
            'source': "C棟サービス収容ルータ#2Hu0/0/0/20",
            'target': "C棟コアルータ#2Hu0/0/0/16",
            'label': "192.168.16.12/30"
        },

        {
            'source': "C棟サービス収容ルータ#2Hu0/0/0/21",
            'target': "C棟サービス収容ルータ#1Hu0/0/0/21",
            'label': "192.168.18.4/30"
        },

        {
            'source': "C棟サービス収容ルータ#2G0/0/0/10",
            'target': "C棟サービス収容ルータ#2G0/0/0/10Connector",
        },

    ];

    iida.appdata.physical_graph = (iida.appdata.physical_graph || []).concat(routers);

})();
