/* global iida */

// define namespace iida
(function() {
  // the `this` means global
  // the `iida` is a object defined here
  this.iida = this.iida || (function() {

    // network diagram data should be here
    var appdata = {};

    return {
      'appdata': appdata
    };

  })();
})();


// define iida.main function
(function() {
  iida.main = function() {

    // HTMLの<script>タグで読まずに
    // ネットワーク経由でデータを取得するならここで実行してiida.appdataにぶら下げる。

    // run cytoscape.js, see iida.nwdiagram.js
    iida.nwdiagram();

  };
})();
