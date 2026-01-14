# メモCRUD学習アプリ 作成指示

## 目的
CRUDのAPI学習用の簡易メモアプリを作成する。
バックエンド実装が主目的のため、フロントは最小構成でよい。
生成するコードには、学習用として要所にコメントで役割を補足すること。

---

## 全体構成
- docker-compose を使用
- サービス構成
  - nginx（リバースプロキシ）
  - frontend（Vue CLI dev server）
  - backend（Node.js + Express）
- ブラウザからは `http://localhost`（80番）でアクセス

### Nginx ルーティング
- `/` → frontend
- `/api/` → backend
- `/api` のパスは書き換えずそのまま転送
- APIパスは末尾スラッシュなし（例：`/api/memos`）

---

## フロントエンド
- Vue.js（vue create、Viteは使わない）
- Vue CLI dev server を使用（ポート 8080）
- コンテナ内起動時は `--host 0.0.0.0`
- HTTP通信は Axios
- API呼び出しは相対パス（例：`/api/memos`）

---

## バックエンド
- Node.js + Express + TypeScript
- 開発実行は ts-node + nodemon
- ORMは使わない（生SQL）
- DBは SQLite
  - ドライバ：better-sqlite3
  - DBファイル：`backend/db.sqlite`
- Express は `/api` を mount する

### ディレクトリ方針（backend）
- `backend/` 直下に `tsconfig.json`
- 実装は `backend/src/`
- `db.sqlite` は `backend/` 直下

---

## DBスキーマ
テーブル：`memos`

- id（INTEGER, PK, AUTOINCREMENT）
- title（TEXT, NOT NULL）
- content（TEXT, NOT NULL）
- created_at（TEXT, NOT NULL）
- updated_at（TEXT, NOT NULL）

※ created_at / updated_at はアプリ側で設定  
※ 起動時に `CREATE TABLE IF NOT EXISTS` を実行

---

## API仕様
ベースパス：`/api`

- GET    `/api/memos`
- GET    `/api/memos/:id`
- POST   `/api/memos`
- PUT    `/api/memos/:id`（全置換）
- DELETE `/api/memos/:id`（物理削除）

### リクエスト
- POST / PUT：`{ title: string, content: string }`

### エラー
- 形式：`{ "message": "..." }`
- 主なステータス：400 / 404 / 500

---

## ポート
- nginx：80（ホスト公開）
- frontend：8080（コンテナ間）
- backend：3000（コンテナ間）

---

## 成果物
- docker-compose.yml（リポジトリ直下）
- nginx 設定ファイル
- frontend（Vue CLI プロジェクト）
- backend（Express + SQLite CRUD API）
- README（起動方法とアクセス方法）