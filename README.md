# メモCRUD学習アプリ

バックエンド学習を目的にした、最小構成のメモCRUDアプリです。

## 構成
- nginx（リバースプロキシ）
- frontend：Vue CLI dev server + Axios
- backend：Node.js + Express + TypeScript + SQLite（better-sqlite3）

## 起動方法
```bash
docker compose up --build
```

起動後に http://localhost にアクセスしてください。

## API
ベースパス：`/api`

- GET `/api/memos`
- GET `/api/memos/:id`
- POST `/api/memos`
- PUT `/api/memos/:id`
- DELETE `/api/memos/:id`

POST/PUT のリクエストボディ：
```json
{ "title": "例", "content": "本文" }
```

エラーレスポンス形式：
```json
{ "message": "..." }
```
