# メモCRUD学習アプリ

バックエンド学習を目的にした、最小構成のメモCRUDアプリです。

## 構成
- frontend：Vue CLI dev server + Axios（ローカル起動）
- backend：Node.js + Express + TypeScript + SQLite（better-sqlite3、Docker起動）

## 起動方法
1) バックエンドを起動
```bash
docker compose up --build backend
```

2) フロントエンドを起動
```bash
cd frontend
npm install
```

移行はルートから:
```bash
npm run serve
```

起動後に http://localhost:8080 にアクセスしてください。

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
