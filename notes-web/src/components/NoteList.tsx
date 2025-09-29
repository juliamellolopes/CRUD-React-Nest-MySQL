import type { Note } from '../types';
import NoteCard from './NoteCard';

type Props = {
    notes: Note[];
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
};

export default function NoteList({ notes, onEdit, onDelete }: Props) {
    if (!notes.length) {
        return <div className="empty">Sem anotações ainda. Crie a primeira acima 👆</div>;
    }

    return (
        <div className="list">
            {notes.map((n) => (
                <NoteCard key={n.id} note={n} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}
