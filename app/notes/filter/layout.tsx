import React from 'react';
import styles from './LayoutNotes.module.css';

import SidebarNotes from './@sidebar/default';

export default function NotesLayout({ children,modal }: { children: React.ReactNode ,
  modal?: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <SidebarNotes />
      </aside>
      <div className={styles.notesWrapper}>{children}</div>
      {modal}
    </div>
  );
}
