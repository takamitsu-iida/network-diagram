/* global iida */

(function () {

    iida.appdata.logical_routers = iida.appdata.logical_routers || [];

    var x, y, y_interval;
    var routers;

    x = 1200;
    y = 400;
    y_interval = 200;

    routers = [
        {
            'position': { 'x': x, 'y': y + y_interval * 0 },
            'id': "C棟コアルータ#1",
            'label': "C棟コアルータ#1\nNCS-55A1-36H-B\ntac-his-cr103\nloopback:172.16.11.3\nMgmt 10.100.1.244"
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 1 },
            'id': "C棟コアルータ#2",
            'label': "C棟コアルータ#2\nNCS-55A1-36H-B\ntac-his-cr104\nloopback:172.16.11.4\nMgmt 10.100.1.243"
        },

        {
            'source': "C棟コアルータ#1",
            'target': "C棟コアルータ#2",
            'label': "192.168.19.36/30"
        },
    ];

    Array.prototype.push.apply(iida.appdata.logical_routers, routers);

    routers = [

        {
            'position': { 'x': x, 'y': y + y_interval * 2 },
            'id': "B棟コアルータ#1",
            'label': "B棟コアルータ#1\nNCS-55A1-36H-B\ntab-his-cr201\nloopback:172.16.11.1\nMgmt 10.100.1.246"
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 3 },
            'id': "B棟コアルータ#2",
            'label': "B棟コアルータ#2\nNCS-55A1-36H-B\ntab-his-cr202\nloopback:172.16.11.2\nMgmt 10.100.1.245"
        },

        {
            'source': "B棟コアルータ#1",
            'target': "B棟コアルータ#2",
            'label': "192.168.19.32/30"
        },

        {
            'source': "C棟コアルータ#1",
            'target': "B棟コアルータ#1"
        },

        {
            'source': "C棟コアルータ#2",
            'target': "B棟コアルータ#2"
        },
    ];

    Array.prototype.push.apply(iida.appdata.logical_routers, routers);

    x = 900;
    y = 0;
    y_interval = 200;

    routers = [
        {
            'position': { 'x': x, 'y': y + y_interval * 0 },
            'id': "C棟ユーザ収容ルータ#1",
            'label': "C棟ユーザ収容ルータ#1\nNCS5501\ntac-his-ur527\nloopback:172.16.14.27\nMgmt 10.100.1.86"
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 1 },
            'id': "C棟ユーザ収容ルータ#2",
            'label': "C棟ユーザ収容ルータ#2\nNCS5501\ntac-his-ur528\nloopback:172.16.14.28\nMgmt 10.100.1.92"
        },

        {
            'source': "C棟ユーザ収容ルータ#1",
            'target': "C棟ユーザ収容ルータ#1",
        },

        {
            'source': "C棟ユーザ収容ルータ#2",
            'target': "C棟ユーザ収容ルータ#2",
        },

        {
            'source': "C棟ユーザ収容ルータ#1",
            'target': "C棟ユーザ収容ルータ#2",
            'label': "192.168.14.44/30"
        },

        {
            'source': "C棟コアルータ#1",
            'target': "C棟ユーザ収容ルータ#1",
            'label': "192.168.10.88/30"
        },

        {
            'source': "C棟コアルータ#2",
            'target': "C棟ユーザ収容ルータ#2",
            'label': "192.168.10.92/30"
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 2 },
            'id': "C棟ユーザ収容ルータ#3",
            'label': "C棟ユーザ収容ルータ#3\nNCS5501\ntac-his-ur529\nloopback:172.16.14.29\nMgmt 10.100.1.98\n",
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 3 },
            'id': "C棟ユーザ収容ルータ#4",
            'label': "C棟ユーザ収容ルータ#4\nNCS5501\ntac-his-ur530\nloobback:172.16.14.30\nMgmt 10.100.1.104",
        },

        {
            'source': "C棟ユーザ収容ルータ#3",
            'target': "C棟ユーザ収容ルータ#4",
            'label': "192.168.14.48/30"
        },

        {
            'source': "C棟ユーザ収容ルータ#3",
            'target': "C棟コアルータ#1",
            'label': "192.168.10.96/30"
        },

        {
            'source': "C棟ユーザ収容ルータ#4",
            'target': "C棟コアルータ#2",
            'label': "192.168.10.100/30"
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 4 },
            'id': "B棟ユーザ収容ルータ#1",
            'label': "B棟ユーザ収容ルータ#1\nNCS5501\ntab-his-ur517\nloopback:172.16.14.17\nMgmt 10.100.1.44",
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 5 },
            'id': "B棟ユーザ収容ルータ#2",
            'label': "B棟ユーザ収容ルータ#2\nNCS5501\ntab-his-ur518\nloopback:172.16.14.18\nMgmt 10.100.1.45",
        },

        {
            'source': "B棟ユーザ収容ルータ#1",
            'target': "B棟ユーザ収容ルータ#2",
            'label': "192.168.14.0/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#1",
            'target': "B棟コアルータ#1",
            'label': "192.168.10.0/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#2",
            'target': "B棟コアルータ#2",
            'label': "192.168.10.4/30"
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 6 },
            'id': "B棟ユーザ収容ルータ#3",
            'label': "B棟ユーザ収容ルータ#3\nNCS5501\ntab-his-ur519\nloopback:172.16.14.19\nMgmt 10.100.1.50",
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 7 },
            'id': "B棟ユーザ収容ルータ#4",
            'label': "B棟ユーザ収容ルータ#4\nNCS5501\ntab-his-ur520\nloopback:172.16.14.20\nMgmt 10.100.1.51\n",
        },

        {
            'source': "B棟ユーザ収容ルータ#3",
            'target': "B棟ユーザ収容ルータ#4",
            'label': "192.168.14.4/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#3",
            'target': "B棟コアルータ#1",
            'label': "192.168.10.8/30"
        },

        {
            'source': "B棟ユーザ収容ルータ#4",
            'target': "B棟コアルータ#2",
            'label': "192.168.10.12/30"
        },

    ];

    Array.prototype.push.apply(iida.appdata.logical_routers, routers);

    x = 1500;
    y = 300;
    y_interval = 200;

    routers = [
        {
            'position': { 'x': x, 'y': y + y_interval * 0 },
            'id': "C棟サービス収容ルータ#1",
            'label': "C棟サービス収容ルータ#1\nASR 9901\ntac-his-sr103\nloopback:172.16.13.3\nMgmt 10.100.1.240",
        },

        {
            'source': "C棟サービス収容ルータ#1",
            'target': "C棟コアルータ#1",
            'label': "192.168.16.8/30"
        },

        {
            'position': { 'x': x, 'y': y + y_interval * 1 },
            'id': "C棟サービス収容ルータ#2",
            'label': "C棟サービス収容ルータ#2\nASR 9901\ntac-his-sr104\nloopback:172.16.13.4\nMgmt 10.100.1.239\n",
        },

        {
            'source': "C棟サービス収容ルータ#2",
            'target': "C棟コアルータ#2",
            'label': "192.168.16.12/30"
        },

        {
            'source': "C棟サービス収容ルータ#2",
            'target': "C棟サービス収容ルータ#1",
            'label': "192.168.18.4/30"
        },

    ];

    Array.prototype.push.apply(iida.appdata.logical_routers, routers);

})();
