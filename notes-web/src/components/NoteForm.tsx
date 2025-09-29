import { useEffect, useState } from 'react';
import { z } from 'zod';

const noteSchema = z.object({
    title: z.string().min(1, 'Título é obrigatório').max(120, 'Máx. 120 caracteres'),
    content: z.string().optional(),
});

type FormValues = z.infer<typeof noteSchema>;

type Props = {
    initial?: { title: string; content?: string | null };
    onSubmit: (values: FormValues) => Promise<void> | void;
    onCancel?: () => void;
    submitLabel?: string;
};

export default function NoteForm({ initial, onSubmit, onCancel, submitLabel = 'Salvar' }: Props) {
    const [values, setValues] = useState<FormValues>({ title: '', content: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initial) {
            setValues({
                title: initial.title ?? '',
                content: initial.content ?? '',
            });
        }
    }, [initial]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        const parsed = noteSchema.safeParse(values);
        if (!parsed.success) {
            const first = parsed.error.issues[0]?.message ?? 'Dados inválidos';
            setError(first);
            return;
        }
        await onSubmit(parsed.data);
        setValues({ title: '', content: '' });
    }

    return (
        <form className="note-form" onSubmit={handleSubmit}>
            <input
                className="input"
                placeholder="Título da nota"
                value={values.title}
                onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
                maxLength={120}
                required
            />
            <textarea
                className="textarea"
                placeholder="Conteúdo (opcional)"
                value={values.content ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, content: e.target.value }))}
            />
            {error && <small style={{ color: '#dc2626' }}>{error}</small>}
            <div className="actions">
                <button type="submit" className="btn btn-primary">{submitLabel}</button>
                {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
