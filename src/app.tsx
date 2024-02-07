import { Logo } from "./components/logo";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";

export function App() {
  return (
    <main className="mx-auto max-w-7xl w-[95%] my-10">
      <header className="space-y-3">
        <Logo size={120} />

        <form className="w-full">
          <Input
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
        />

        <NoteCard
          timeStamp={new Date()}
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
            facilis rem eum ipsa blanditiis laborum quo eaque iusto? Corrupti 
            ipsum adipisci eos, quis aliquid facere architecto veritatis Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Debitis"
        />

        <NoteCard
          timeStamp={new Date()}
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
          facilis rem eum ipsa blanditiis laborum quo eaque iusto? Corrupti
          ipsum adipisci eos, quis aliquid facere architecto veritatis"
        />
      </section>
    </main>
  );
}
