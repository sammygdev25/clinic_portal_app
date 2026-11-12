import type { VisitNote } from '../types';
import { Card, CardBody, CardTitle, CardMeta, EmptyState } from '../components/ui';
import { Icon } from '../components/icons';

interface VisitNoteListProps {
  visitNotes: VisitNote[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function VisitNoteList({ visitNotes }: VisitNoteListProps) {
  const notes = Array.isArray(visitNotes) ? visitNotes : [];

  if (notes.length === 0) {
    return (
      <EmptyState
        icon="book"
        title="No visit notes yet"
        text="Notes from your doctor will appear here after your appointments."
      />
    );
  }

  return (
    <div className="ds-stack">
      {notes.map((note) => (
        <Card key={note.id}>
          <CardBody>
            <div className="ds-between">
              <CardTitle>
                {note.diagnosis ? note.diagnosis : 'Visit Note'}
              </CardTitle>
              <CardMeta>
                <Icon name="calendar" size={14} /> {formatDate(note.created_at)}
              </CardMeta>
            </div>
            <p className="ds-muted">{note.content}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}