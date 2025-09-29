import type { Note } from '../types';

type Props = {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
};

export default function NoteCard({ note, onEdit, onDelete }: Props) {
    return (
        <div className="note">
            <div className="note-head">
                <div>
                    <h3 className="note-title">{note.title}</h3>
                    {note.content && <p className="note-content">{note.content}</p>}
                    <div className="badge">
                        Atualizada em {new Date(note.updatedAt).toLocaleString()}
                    </div>
                </div>
                <div className="actions">
                    <button className="btn btn-secondary" onClick={() => onEdit(note)}>Editar</button>
                    <button className="btn btn-danger" onClick={() => onDelete(note.id)}>Excluir</button>
                </div>
            </div>
        </div>
    );
}
