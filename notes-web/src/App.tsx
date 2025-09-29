import { useEffect, useState } from 'react';
import './styles.css';
import { api } from './api';
import type { Note } from './types';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

type CreatePayload = { title: string; content?: string };

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editing, setEditing] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchNotes() {
    setLoading(true);
    const { data } = await api.get<Note[]>('/notes');
    setNotes(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  async function createNote(values: CreatePayload) {
    const { data } = await api.post<Note>('/notes', values);
    setNotes((prev) => [data, ...prev]);
  }

  async function updateNote(values: CreatePayload) {
    if (!editing) return;
    const { data } = await api.patch<Note>(`/notes/${editing.id}`, values);
    setNotes((prev) => prev.map((n) => (n.id === data.id ? data : n)));
    setEditing(null);
  }

  async function deleteNote(id: number) {
    await api.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title">Minhas Anotações</h1>
        </div>

        {editing ? (
          <>
            <h2 style={{ marginTop: 0 }}>Editar anotação</h2>
            <NoteForm
              initial={{ title: editing.title, content: editing.content }}
              submitLabel="Atualizar"
              onSubmit={updateNote}
              onCancel={() => setEditing(null)}
            />
          </>
        ) : (
          <>
            <h2 style={{ marginTop: 0 }}>Nova anotação</h2>
            <NoteForm onSubmit={createNote} submitLabel="Criar" />
          </>
        )}

        <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '16px 0' }} />

        {loading ? (
          <div className="empty">Carregando…</div>
        ) : (
          <NoteList notes={notes} onEdit={setEditing} onDelete={deleteNote} />
        )}
      </div>
    </div>
  );
}
