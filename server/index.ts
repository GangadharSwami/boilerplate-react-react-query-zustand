import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { getDb, migrate } from './db';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/todos', async (_req, res) => {
  const db = await getDb();
  const todos = await db.all('SELECT id, title, completed FROM todos ORDER BY id DESC');
  res.json(todos.map((t) => ({ ...t, completed: !!t.completed })));
});

app.post('/api/todos', async (req, res) => {
  const { title } = req.body as { title?: string };
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'title is required' });
  }
  const db = await getDb();
  const result = await db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', title.trim(), 0);
  const todo = await db.get('SELECT id, title, completed FROM todos WHERE id = ?', result.lastID);
  res.status(201).json({ ...todo, completed: !!todo.completed });
});

app.patch('/api/todos/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body as { title?: string; completed?: boolean };
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });
  const db = await getDb();
  const current = await db.get('SELECT id, title, completed FROM todos WHERE id = ?', id);
  if (!current) return res.status(404).json({ error: 'not found' });
  const nextTitle = typeof title === 'string' ? title : current.title;
  const nextCompleted = typeof completed === 'boolean' ? (completed ? 1 : 0) : current.completed;
  await db.run('UPDATE todos SET title = ?, completed = ? WHERE id = ?', nextTitle, nextCompleted, id);
  const updated = await db.get('SELECT id, title, completed FROM todos WHERE id = ?', id);
  res.json({ ...updated, completed: !!updated.completed });
});

app.delete('/api/todos/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) return res.status(400).json({ error: 'invalid id' });
  const db = await getDb();
  const result = await db.run('DELETE FROM todos WHERE id = ?', id);
  if (result.changes === 0) return res.status(404).json({ error: 'not found' });
  res.status(204).end();
});

async function start() {
  await migrate();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start();


