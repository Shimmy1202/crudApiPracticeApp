# 設計書作成の補助
## 要望
本サービスで実装したAPIを整理し、以下項目を網羅するAPI仕様書.mdを作成してください

## API設計書記載の項目
- API名
- 概要
- 前提条件
- リクエスト：
  - URL
  - メソッド(POSTやGETなど)
  - データ形式(jsonなど)
  - header：
    - KeyName:Value
  - body：
    - KeyName:型:必須(〇or×):説明
- 正常レスポンス：
  - データ形式(jsonなど)
  - header：
    - KeyName:Value
  - body
    - KeyName:型(stringなど):必須(〇or×):説明
  - サンプルレスポンス
- エラーレスポンス：
  - body
    - KeyName:型(stringなど):必須(〇or×):説明
  - サンプルレスポンス