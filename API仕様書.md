# API仕様書

ベースURL: `/api`
データ形式: JSON

## 1. メモ一覧取得
- API名: メモ一覧取得
- 概要: 登録済みメモを新しい順で取得する
- 前提条件: なし
- リクエスト:
  - URL: `/api/memos`
  - メソッド: GET
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body:
    - なし
- 正常レスポンス:
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body
    - id:number:〇:メモID
    - title:string:〇:タイトル
    - content:string:〇:本文
    - created_at:string:〇:作成日時(ISO)
    - updated_at:string:〇:更新日時(ISO)
  - サンプルレスポンス
    ```json
    [
      {
        "id": 2,
        "title": "買い物",
        "content": "牛乳を買う",
        "created_at": "2025-01-15T03:00:00.000Z",
        "updated_at": "2025-01-15T03:10:00.000Z"
      }
    ]
    ```
- エラーレスポンス:
  - body
    - message:string:〇:エラーメッセージ
  - サンプルレスポンス
    ```json
    { "message": "メモ情報の取得に失敗しました。" }
    ```

## 2. メモ単体取得
- API名: メモ単体取得
- 概要: 指定IDのメモを取得する
- 前提条件: IDは正の整数
- リクエスト:
  - URL: `/api/memos/:id`
  - メソッド: GET
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body:
    - なし
- 正常レスポンス:
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body
    - id:number:〇:メモID
    - title:string:〇:タイトル
    - content:string:〇:本文
    - created_at:string:〇:作成日時(ISO)
    - updated_at:string:〇:更新日時(ISO)
  - サンプルレスポンス
    ```json
    {
      "id": 1,
      "title": "初期メモ",
      "content": "最初のメモです",
      "created_at": "2025-01-15T03:00:00.000Z",
      "updated_at": "2025-01-15T03:00:00.000Z"
    }
    ```
- エラーレスポンス:
  - body
    - message:string:〇:エラーメッセージ
  - サンプルレスポンス
    ```json
    { "message": "メモ情報の取得に失敗しました。" }
    ```

## 3. メモ作成
- API名: メモ作成
- 概要: 新しいメモを作成する
- 前提条件: title/contentは文字列
- リクエスト:
  - URL: `/api/memos`
  - メソッド: POST
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body:
    - title:string:〇:タイトル
    - content:string:〇:本文
- 正常レスポンス:
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body
    - id:number:〇:メモID
    - title:string:〇:タイトル
    - content:string:〇:本文
    - created_at:string:〇:作成日時(ISO)
    - updated_at:string:〇:更新日時(ISO)
  - サンプルレスポンス
    ```json
    {
      "id": 3,
      "title": "新規メモ",
      "content": "内容",
      "created_at": "2025-01-15T03:20:00.000Z",
      "updated_at": "2025-01-15T03:20:00.000Z"
    }
    ```
- エラーレスポンス:
  - body
    - message:string:〇:エラーメッセージ
  - サンプルレスポンス
    ```json
    { "message": "タイトルと内容は必須です。" }
    ```

## 4. メモ更新
- API名: メモ更新
- 概要: 指定IDのメモを更新する
- 前提条件: IDは正の整数、title/contentは文字列
- リクエスト:
  - URL: `/api/memos/:id`
  - メソッド: POST
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body:
    - title:string:〇:タイトル
    - content:string:〇:本文
- 正常レスポンス:
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body
    - id:number:〇:メモID
    - title:string:〇:タイトル
    - content:string:〇:本文
    - created_at:string:〇:作成日時(ISO)
    - updated_at:string:〇:更新日時(ISO)
  - サンプルレスポンス
    ```json
    {
      "id": 1,
      "title": "更新後タイトル",
      "content": "更新後本文",
      "created_at": "2025-01-15T03:00:00.000Z",
      "updated_at": "2025-01-15T03:30:00.000Z"
    }
    ```
- エラーレスポンス:
  - body
    - message:string:〇:エラーメッセージ
  - サンプルレスポンス
    ```json
    { "message": "不正なIDです。" }
    ```

## 5. メモ削除
- API名: メモ削除
- 概要: 指定IDのメモを削除する
- 前提条件: IDは正の整数
- リクエスト:
  - URL: `/api/memos/:id`
  - メソッド: DELETE
  - データ形式: JSON
  - header:
    - Content-Type: application/json
  - body:
    - なし
- 正常レスポンス:
  - データ形式: なし
  - header:
    - Content-Type: application/json
  - body
    - なし
  - サンプルレスポンス
    ```
    (status 204)
    ```
- エラーレスポンス:
  - body
    - message:string:〇:エラーメッセージ
  - サンプルレスポンス
    ```json
    { "message": "メモの削除に失敗しました。" }
    ```
