import { Card } from "./ui/card";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type NewNoteCardProps = {
  title: string;
  content: string;
  handleAddNote: (content: string) => void;
};

export function NewNoteCard({
  title,
  content,
  handleAddNote,
}: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] =
    useState<boolean>(false);
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  const { toast } = useToast();

  function handleStartEditing() {
    setShouldShowOnboarding(false);
  }

  function handleStopEditing() {
    setShouldShowOnboarding(true);
    setTextAreaValue("");
  }

  function handleSaveNote(e: FormEvent) {
    e.preventDefault();
    handleAddNote(textAreaValue);
    setTextAreaValue("");
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
      title: "Nota criada com sucesso!",
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
        <Card className="bg-neutral-700 p-5 pl-6 pb-3 m-0 border-none shadow-lg overflow-hidden hover:ring-1 hover:ring-neutral-400 transition-all duration-200 group-focus-visible:ring-1 group-focus-visible:ring-theme-primary">
          <Tittle title={title} />

          <div className="h-44">
            <p className="text-sm leading-6 text-neutral-300">{content}</p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 !rounded-xl flex flex-col border-neutral-600 w-[95vw] h-[75vh] max-h-[700px] max-w-xl">
        <div className="flex items-center gap-2">
          {!shouldShowOnboarding && (
            <button onClick={handleStopEditing}>
              <ArrowLeftIcon className="text-white w-6 h-6 p-1 -mt-4" />
            </button>
          )}
          <Tittle title={title} />
        </div>
        <form onSubmit={handleSaveNote} className="flex-1 flex flex-col">
          {shouldShowOnboarding ? (
            <p className="text-sm leading-6 text-neutral-400 flex-1">
              Comece{" "}
              <button
                type="button"
                className="text-theme-primary hover:underline"
              >
                gravando uma nota
              </button>{" "}
              em áudio ou se preferir{" "}
              <button
                type="button"
                onClick={handleStartEditing}
                className="text-theme-primary hover:underline"
              >
                utilize apenas texto
              </button>
              .
            </p>
          ) : (
            <Textarea
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              id="create-note"
              autoFocus
              className="text-sm leading-6 resize-none flex-1 border-none focus-visible:ring-0 text-neutral-400"
            />
          )}

          <DialogClose
            type="submit"
            disabled={!textAreaValue}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "bg-transparent border border-neutral-600 group"
            )}
          >
            <CheckCircledIcon className="mr-2 text-green-500 group-hover:text-green-800" />
            <span>Salvar nota</span>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Tittle({ title }: { title: string }) {
  return <h3 className="text-sm font-medium text-neutral-200 mb-4">{title}</h3>;
}
