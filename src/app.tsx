import { useState } from "react";
import { Logo } from "./components/logo";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";

export type NoteType = {
  id: string;
  timeStamp: Date;
  content: string;
};

export function App() {
  const [searchInput, setSearchInput] = useState<string>("");

  const [notes, setNotes] = useState<NoteType[]>(() => {
    const notesOnStorage = localStorage.getItem("notes");

    return notesOnStorage ? JSON.parse(notesOnStorage) : [];
  });

  function handleAddNote(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      content,
      timeStamp: new Date(),
    } satisfies NoteType;

    setNotes((prev) => {
      const notes = [newNote, ...prev];
      localStorage.setItem("notes", JSON.stringify(notes));

      return notes;
    });
  }

  function handleRemoveNote(id: string) {
    setNotes((prev) => {
      const notesWithoutRemovedOne = prev.filter((item) => item.id !== id);
      localStorage.setItem("notes", JSON.stringify(notesWithoutRemovedOne));

      return notesWithoutRemovedOne;
    });
  }

  const filteredNotes =
    searchInput !== ""
      ? notes.filter((note) =>
          note.content.toLowerCase().includes(searchInput.toLowerCase())
        )
      : notes;

  return (
    <main className="mx-auto max-w-7xl w-[95%] my-10">
      <header className="space-y-3">
        <Logo size={120} />

        <form className="w-full">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="search-note"
            className="text-2xl p-0 border-none tracking-tight font-semibold placeholder:text-neutral-500 focus-visible:ring-0"
            placeholder="Busque em suas notas..."
          />
        </form>
      </header>

      <Separator className="bg-neutral-800 mt-4 mb-6" />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 auto-rows-[250px] gap-6">
        <NewNoteCard
          title="Adicionar nota"
          content=" Grave uma nota em áudio que será convertida para texto
            automaticamente."
          onAddNote={handleAddNote}
        />

        {filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onRemoveNote={handleRemoveNote} />
        ))}
      </section>
    </main>
  );
}
