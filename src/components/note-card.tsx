import { format, formatDistanceToNow } from "date-fns";
import { Card } from "./ui/card";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { ptBR } from "date-fns/locale";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { NoteType } from "@/app";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

type NoteCardProps = {
  note: NoteType;
  onRemoveNote: (id: string) => void;
};

export function NoteCard({ note, onRemoveNote }: NoteCardProps) {
  const { content, timeStamp } = note;

  function handleRemoveNote() {
    onRemoveNote(note.id);
    showSuccessToast();
  }

  function showSuccessToast() {
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formattedDate = capitalizeFirstLetter(
      format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a", { locale: ptBR })
    );

    toast({
      title: "Nota removida com sucesso!",
      duration: 2000,
      description: formattedDate,
      action: (
        <ToastAction
          className={cn(buttonVariants({ variant: "secondary" }))}
          altText="Created with success"
        >
          Ok
        </ToastAction>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="group text-left outline-none rounded-xl transition-all duration-300">
        <Card className="bg-neutral-800 p-5 pl-6 pb-3 m-0 border-none shadow-lg overflow-hidden hover:ring-1 hover:ring-neutral-500 transition-all duration-200 group-focus-visible:ring-1 group-focus-visible:ring-theme-primary">
          <TimeStamp timeStamp={timeStamp} />

          <Content content={content} />
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 !rounded-xl flex flex-col border-neutral-600 w-[95vw] h-[75vh] max-h-[700px] max-w-xl">
        <TimeStamp timeStamp={timeStamp} />

        <Content content={content} />

        <DialogClose
          onClick={handleRemoveNote}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent border border-neutral-600 group"
          )}
        >
          <TrashIcon className="mr-2 text-red-500 group-hover:text-red-800" />
          <span>Deseja apagar essa nota?</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

function TimeStamp({ timeStamp }: { timeStamp: Date }) {
  return (
    <h3 className="text-sm font-medium text-neutral-300 mb-4">
      {formatDistanceToNow(timeStamp, {
        locale: ptBR,
        addSuffix: true,
      })}
    </h3>
  );
}

function Content({ content }: { content: string }) {
  return (
    <ScrollArea className="h-44 pb-2 pr-3.5 flex-1">
      <p className="text-sm leading-6 text-neutral-400">{content}</p>
    </ScrollArea>
  );
}
