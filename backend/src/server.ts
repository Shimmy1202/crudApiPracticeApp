import express, { Request, Response } from "express";
import db from "./db";

type Memo = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

const app = express();
const port = 3000;

app.use(express.json());

// API routes are mounted under /api.
const router = express.Router();

const selectAllMemos = db.prepare(
  "SELECT id, title, content, created_at, updated_at FROM memos ORDER BY id DESC"
);
const selectMemoById = db.prepare(
  "SELECT id, title, content, created_at, updated_at FROM memos WHERE id = ?"
);
const insertMemo = db.prepare(
  "INSERT INTO memos (title, content, created_at, updated_at) VALUES (?, ?, ?, ?)"
);
const updateMemo = db.prepare(
  "UPDATE memos SET title = ?, content = ?, updated_at = ? WHERE id = ?"
);
const deleteMemo = db.prepare("DELETE FROM memos WHERE id = ?");

function parseId(req: Request): number | null {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function validateBody(
  req: Request
): { title: string; content: string } | null {
  const { title, content } = req.body ?? {};
  if (typeof title !== "string" || typeof content !== "string") {
    return null;
  }
  return { title, content };
}

router.get("/memos", (_req: Request, res: Response) => {
  try {
    const memos = selectAllMemos.all() as Memo[];
    res.json(memos);
  } catch (error) {
    res.status(500).json({ message: "メモの取得に失敗しました。" });
  }
});

router.get("/memos/:id", (req: Request, res: Response) => {
  const id = parseId(req);
  if (!id) {
    return res.status(400).json({ message: "不正なIDです。" });
  }

  try {
    const memo = selectMemoById.get(id) as Memo | undefined;
    if (!memo) {
      return res.status(404).json({ message: "メモが見つかりません。" });
    }
    res.json(memo);
  } catch (error) {
    res.status(500).json({ message: "メモの取得に失敗しました。" });
  }
});

router.post("/memos", (req: Request, res: Response) => {
  const body = validateBody(req);
  if (!body) {
    return res
      .status(400)
      .json({ message: "タイトルと内容は必須です。" });
  }

  try {
    const now = new Date().toISOString();
    const result = insertMemo.run(body.title, body.content, now, now);
    const memo = selectMemoById.get(result.lastInsertRowid) as Memo;
    res.status(201).json(memo);
  } catch (error) {
    res.status(500).json({ message: "メモの作成に失敗しました。" });
  }
});

router.put("/memos/:id", (req: Request, res: Response) => {
  const id = parseId(req);
  if (!id) {
    return res.status(400).json({ message: "不正なIDです。" });
  }

  const body = validateBody(req);
  if (!body) {
    return res
      .status(400)
      .json({ message: "タイトルと内容は必須です。" });
  }

  try {
    const existing = selectMemoById.get(id) as Memo | undefined;
    if (!existing) {
      return res.status(404).json({ message: "メモが見つかりません。" });
    }

    const now = new Date().toISOString();
    updateMemo.run(body.title, body.content, now, id);
    const updated = selectMemoById.get(id) as Memo;
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "メモの更新に失敗しました。" });
  }
});

router.delete("/memos/:id", (req: Request, res: Response) => {
  const id = parseId(req);
  if (!id) {
    return res.status(400).json({ message: "不正なIDです。" });
  }

  try {
    const existing = selectMemoById.get(id) as Memo | undefined;
    if (!existing) {
      return res.status(404).json({ message: "メモが見つかりません。" });
    }

    deleteMemo.run(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "メモの削除に失敗しました。" });
  }
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
