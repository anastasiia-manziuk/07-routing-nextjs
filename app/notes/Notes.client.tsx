'use client';

import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, HydrationBoundary, DehydratedState } from '@tanstack/react-query';

import css from './Notes.module.css';

import NoteList from '@/components/NoteList/NoteList';
import useModalControl from '@/components/hooks/useModalControl';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import Pagination from '@/components/Pagination/Pagination';
import type { NotesResponse } from '@/lib/api';

type Props = {
  dehydratedState?: DehydratedState;
};

export default function NotesClient({ dehydratedState }: Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300);

  const createNoteModal = useModalControl();
  const [page, setPage] = useState(1);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading } = useQuery<NotesResponse>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(page, debouncedSearch, 12),
    placeholderData: prev => prev,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox search={search} onChange={handleSearchChange} />

          {data?.totalPages && data.totalPages > 1 && (
            <Pagination page={page} totalPages={data?.totalPages ?? 1} onPageChange={setPage} />
          )}

          <button className={css.button} onClick={createNoteModal.openModal}>
            Create note +
          </button>
        </header>

        {isLoading && <strong className={css.loading}>Loading notes...</strong>}

        {!isLoading && data?.notes?.length ? (
          <NoteList notes={data.notes} />
        ) : (
          !isLoading && <p>No notes found</p>
        )}

        {createNoteModal.isModalOpen && (
          <Modal onClose={createNoteModal.closeModal}>
            <NoteForm onCancel={createNoteModal.closeModal} />
          </Modal>
        )}
      </div>
    </HydrationBoundary>
  );
}
