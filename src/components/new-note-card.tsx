import { Card } from "./ui/card";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type NewNoteCardProps = {
  title: string;
  content: string;
};

export function NewNoteCard({ title, content }: NewNoteCardProps) {
  return (
    <Dialog>
      <DialogTrigger className="group text-left outline-none rounded-xl transition-all duration-300">
        <Card className="bg-neutral-700 p-5 pl-6 pb-3 m-0 border-none shadow-lg overflow-hidden hover:ring-1 hover:ring-neutral-400 transition-all duration-200 group-focus-visible:ring-1 group-focus-visible:ring-theme-primary">
          <Tittle title={title} />

          <div className="h-44">
            <p className="text-sm leading-6 text-neutral-300">{content}</p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 !rounded-xl flex flex-col border-neutral-600 w-[95vw] h-[75vh] max-h-[700px] max-w-xl">
        <Tittle title={title} />

        <p className="text-sm leading-6 text-neutral-400 flex-1">
          Comece{" "}
          <button className="text-theme-primary hover:underline">
            gravando uma nota
          </button>{" "}
          em áudio ou se preferir{" "}
          <button className="text-theme-primary hover:underline">
            utilize apenas texto
          </button>
          .
        </p>

        <DialogClose
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent border border-neutral-600 group"
          )}
        >
          <CheckCircledIcon className="mr-2 text-green-500 group-hover:text-green-800" />
          <span>Salvar nota</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function Tittle({ title }: { title: string }) {
  return <h3 className="text-sm font-medium text-neutral-200 mb-4">{title}</h3>;
}
