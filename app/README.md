# 録音用アプリ
webpack + node + bootstrapで作る
[参考](http://wannabe-jellyfish.hatenablog.com/entry/2016/03/06/034101)

# setup
webpackでビルドしてbundle.jsを作ってこれをimportして使う
```
$ npm run watch
$ npm run production
```

## 進捗
- 管理アプリ
  - [ ] UI
  - [ ] 2つの接続先につなげる、data/media connectionが確立される
  - [ ] 外部からアクセスして見れるようにする
  - [ ] 外部からjsで実行する処理
    - [ ] 2つのpeerIDを渡して接続をする
    - [ ] 録音を開始する
- headless client
  - [ ] headless chromeを立ち上げて、接続する
