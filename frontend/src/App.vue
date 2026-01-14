<template>
  <div class="page">
    <header class="header">
      <h1>メモアプリ</h1>
    </header>

    <section class="panel">
      <h2>{{ editingId ? "メモを編集する" : "新しいメモを作成する" }}</h2>
      <form @submit.prevent="submitMemo" class="form">
        <label>
          タイトル
          <input v-model.trim="form.title" type="text" placeholder="タイトル" />
        </label>
        <label>
          内容
          <textarea
            v-model.trim="form.content"
            rows="4"
            placeholder="内容を入力してください..."
          ></textarea>
        </label>
        <div class="actions">
          <button type="submit">{{ editingId ? "更新" : "作成" }}</button>
          <button type="button" class="ghost" @click="resetForm">クリア</button>
        </div>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </section>

    <section class="panel">
      <h2>メモ一覧</h2>
      <div v-if="loading" class="muted">読み込み中</div>
      <ul v-else class="list">
        <li v-for="memo in memos" :key="memo.id">
          <div class="list-body" @click="selectMemo(memo)">
            <strong>{{ memo.title }}</strong>
            <p>{{ memo.content }}</p>
            <small>更新日: {{ formatDate(memo.updated_at) }}</small>
          </div>
          <button class="danger" @click="deleteMemo(memo.id)">削除</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";

const createEmptyForm = () => ({
  title: "",
  content: "",
});

export default {
  name: "App",
  data() {
    return {
      memos: [],
      form: createEmptyForm(),
      editingId: null,
      loading: false,
      error: "",
    };
  },
  mounted() {
    this.fetchMemos();
  },
  methods: {
    async fetchMemos() {
      this.loading = true;
      this.error = "";
      try {
        const response = await axios.get("/api/memos");
        this.memos = response.data;
      } catch (err) {
        this.error = "メモの読み込みに失敗しました。";
      } finally {
        this.loading = false;
      }
    },
    selectMemo(memo) {
      this.editingId = memo.id;
      this.form = {
        title: memo.title,
        content: memo.content,
      };
      this.error = "";
    },
    resetForm() {
      this.editingId = null;
      this.form = createEmptyForm();
      this.error = "";
    },
    async submitMemo() {
      if (!this.form.title || !this.form.content) {
        this.error = "タイトルと内容は必須です。";
        return;
      }

      this.error = "";
      try {
        if (this.editingId) {
          await axios.put(`/api/memos/${this.editingId}`, this.form);
        } else {
          await axios.post("/api/memos", this.form);
        }
        this.resetForm();
        await this.fetchMemos();
      } catch (err) {
        this.error = "メモの保存に失敗しました。";
      }
    },
    async deleteMemo(id) {
      this.error = "";
      try {
        await axios.delete(`/api/memos/${id}`);
        if (this.editingId === id) {
          this.resetForm();
        }
        await this.fetchMemos();
      } catch (err) {
        this.error = "メモの削除に失敗しました。";
      }
    },
    formatDate(isoString) {
      if (!isoString) {
        return "";
      }
      const date = new Date(isoString);
      if (Number.isNaN(date.getTime())) {
        return isoString;
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
  font-family: "Segoe UI", sans-serif;
}

.header {
  margin-bottom: 24px;
}

.panel {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  background: #fafafa;
}

.form {
  display: grid;
  gap: 12px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
}

input,
textarea {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #bbb;
  font-family: inherit;
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #2b4c7e;
  color: #fff;
  cursor: pointer;
}

button.ghost {
  background: #e0e0e0;
  color: #333;
}

button.danger {
  background: #b84a3a;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

.list li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #eee;
}

.list-body {
  cursor: pointer;
}

.list-body p {
  margin: 6px 0;
}

.muted {
  color: #666;
}

.error {
  color: #b84a3a;
  margin-top: 10px;
}
</style>
