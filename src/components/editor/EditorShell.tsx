"use client";
import TitleInput from './TitleInput';
import Toolbar from './Toolbar';
import ContentEditor from './ContentEditor';
import Sidebar from './Sidebar';

export default function EditorShell() {
  return (
    <div className="row">
      <section className="grow">
        <TitleInput />
        <Toolbar />
        <ContentEditor />
      </section>
      <aside className="sidebar">
        <Sidebar />
      </aside>
    </div>
  );
}

