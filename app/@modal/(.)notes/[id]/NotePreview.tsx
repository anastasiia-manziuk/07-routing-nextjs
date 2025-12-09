
'use client';


import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note'; 
import css from './NotePreview.module.css';

export default function NotePreviewClient({ note }: { note: Note }) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container ?? ''}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        
          <button className='backBtn'  onClick={handleClose}>Close</button>
        </div>
    </Modal>
  );
}

