/* global iida */

// グローバルに独自の名前空間を定義する
(function() {
  // このthisはグローバル空間
  this.iida = this.iida || (function() {

    // アプリのデータを取り込む場合、appdata配下にぶら下げる
    var appdata = {};

    // 公開するオブジェクト
    return {
      appdata: appdata,
    };

  })();
})();


// メイン関数の定義
(function() {
  iida.main = function() {

    // HTMLの<script>タグで読まずに
    // ネットワーク経由でデータを取得するならここで実行してiida.appdataにぶら下げる。

    // cytoscape.jsを走らせる
    iida.nwdiagram();

  };
})();
