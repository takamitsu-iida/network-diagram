# cytoscape.jsを使ったネットワーク図

## ライブデモ(github pages)

例１．検証用の物理構成図

<https://takamitsu-iida.github.io/network-diagram/index.physical.html>


例２．検証用のコスト設計

<https://takamitsu-iida.github.io/network-diagram/index.logical.html>


<br>

## ローカルでの実行方法

index.htmlのある場所に行き、`http-server -c-1` コマンドでhttpサーバを起動して<http://127.0.0.1:8080/>にアクセスします。

http-serverのインストール方法。

```bash
npm install -g http-server
```

<br>

# 参考

<https://js.cytoscape.org/>

<https://github.com/cytoscape/cytoscape.js>

<br>

## pan-zoom

便利。導入予定。

jqueryとfont-awesome4が必要。

<https://github.com/cytoscape/cytoscape.js-panzoom>
