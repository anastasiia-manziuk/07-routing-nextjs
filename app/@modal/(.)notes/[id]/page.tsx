
import NotePreview from '@/app/@modal/(.)notes/[id]/NotePreview.client';
import { fetchNoteById } from '@/lib/api';

interface NoteProp {
  params: Promise<{ id: string }>;
}

export default async function InterceptedNote({ params }: NoteProp) {
  const { id } = await params;


  const note = await fetchNoteById(id);

  if (!note) {
    return <div>Note not found</div>;
  }


  return <NotePreview note={note} />;
}
