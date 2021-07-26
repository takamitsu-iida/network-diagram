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
                    'id': "Hu0/0/1/0",
                    'label': "Hu0/0/0/1/0\n.90",
                    'align': ['R', 'C']
                },
            ]
        },



    ];

    iida.appdata.graph_data = (iida.appdata.graph_data || []).concat(routers);

})();
