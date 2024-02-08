import { Card } from "./ui/card";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ArrowLeftIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { AudioLinesIcon, MicIcon, PenLineIcon } from "lucide-react";

let speechRecognition: SpeechRecognition | null;

type NewNoteCardProps = {
  title: string;
  content: string;
  onAddNote: (content: string) => void;
};

type ComponentState = "onboarding" | "writing" | "recording";

export function NewNoteCard({ title, content, onAddNote }: NewNoteCardProps) {
  const [componentState, setComponentState] =
    useState<ComponentState>("onboarding");
  const [notes, setNotes] = useState<{ writing: string; recording: string }>({
    writing: "",
    recording: "",
  });
  const [isRecording, setIsRecording] = useState(false);

  function handleStartWriting() {
    setComponentState("writing");
    setNotes({ ...notes, recording: "" });
  }

  function handleStartRecording() {
    setComponentState("recording");
    setIsRecording(true);
    setNotes({ recording: "", writing: "" });

    const isSpeechRecognitionAPIAvaliable =
      "SpeechRecognition" in window || "webkitSpeechRecognition" in window;

    if (!isSpeechRecognitionAPIAvaliable) {
      alert("Infelizmente seu navegador não suporta a API de gravação.");
      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = "pt-BR";
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, "");

      setNotes({ ...notes, recording: transcription });
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    if (speechRecognition) {
      speechRecognition.stop();
    }
    setIsRecording(false);
  }

  function handleGoBackToOnboarding() {
    setComponentState("onboarding");
    setNotes({ writing: "", recording: "" });
  }

  function handleAddNote(e: FormEvent) {
    e.preventDefault();
    onAddNote(componentState === "writing" ? notes.writing : notes.recording);
    setNotes({ writing: "", recording: "" });
    setComponentState("onboarding");
    showSuccessToast();
  }

  const { toast } = useToast();

  function showSuccessToast() {
    const capitalizeFirstLetter = (str: string) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const formattedDate = capitalizeFirstLetter(
      format(new Date(), "EEEE, MMMM dd, yyyy 'at' h:mm a", { locale: ptBR })
    );

    toast({
      title: "Nota criada com sucesso!",
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
        <Card className="bg-neutral-700 p-5 pl-6 pb-3 m-0 border-none shadow-lg overflow-hidden hover:ring-1 hover:ring-neutral-400 transition-all duration-200 group-focus-visible:ring-1 group-focus-visible:ring-theme-primary">
          <Title title={title} />

          <div className="h-44">
            <p className="text-sm leading-6 text-neutral-300">{content}</p>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 !rounded-xl flex flex-col border-neutral-600 w-[95vw] h-[75vh] max-h-[700px] max-w-xl">
        <div className="flex items-center gap-2">
          {componentState !== "onboarding" && (
            <button onClick={handleGoBackToOnboarding}>
              <ArrowLeftIcon className="text-white w-6 h-6 p-1 -mt-4" />
            </button>
          )}

          <Title title={title} />

          {componentState !== "onboarding" && (
            <>
              {componentState === "recording" ? (
                <MicIcon className="w-4 h-4 text-neutral-400 -mt-4" />
              ) : (
                <PenLineIcon className="w-4 h-4 text-neutral-400 -mt-4" />
              )}
            </>
          )}
        </div>
        <form onSubmit={handleAddNote} className="flex-1 flex flex-col">
          {componentState === "onboarding" ? (
            <p className="text-sm leading-6 text-neutral-400 flex-1">
              Comece{" "}
              <button
                onClick={handleStartRecording}
                type="button"
                className="text-theme-primary hover:underline"
              >
                gravando uma nota
              </button>{" "}
              em áudio ou se preferir{" "}
              <button
                type="button"
                onClick={handleStartWriting}
                className="text-theme-primary hover:underline"
              >
                utilize apenas texto
              </button>
              .
            </p>
          ) : (
            <Textarea
              disabled={componentState === "recording"}
              value={
                componentState === "writing" ? notes.writing : notes.recording
              }
              onChange={(e) =>
                setNotes({ ...notes, [componentState]: e.target.value })
              }
              id="create-note"
              autoFocus
              className="text-sm leading-6 disabled:cursor-default resize-none flex-1 border-none focus-visible:ring-0 text-neutral-400"
            />
          )}

          {componentState !== "onboarding" && (
            <>
              {componentState === "recording" && isRecording ? (
                <button
                  onClick={handleStopRecording}
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "bg-transparent border border-neutral-600 group"
                  )}
                >
                  <div className="mr-2 animate-pulse bg-red-500 group-hover:bg-red-800 w-3 h-3 rounded-full" />
                  <span>Parar gravação</span>
                </button>
              ) : (
                <div className="flex flex-col items-stretch gap-2 sm:items-center sm:flex-row">
                  {componentState === "recording" && !isRecording && (
                    <button
                      onClick={handleStartRecording}
                      type="button"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "bg-transparent border border-neutral-600 group flex-1"
                      )}
                    >
                      <MicIcon className="w-4 h-4 text-neutral-400 mr-2" />
                      Gravar novamente
                    </button>
                  )}
                  <DialogClose
                    disabled={!notes.recording && !notes.writing}
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "bg-transparent border border-neutral-600 group flex-1"
                    )}
                  >
                    <CheckCircledIcon className="mr-2 text-green-500 group-hover:text-green-800" />
                    <span>Salvar nota</span>
                  </DialogClose>
                </div>
              )}
            </>
          )}

          {componentState === "recording" &&
            isRecording &&
            !notes.recording && (
              <AudioLinesIcon className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-bounce" />
            )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Title({ title }: { title: string }) {
  return <h3 className="text-sm font-medium text-neutral-200 mb-4">{title}</h3>;
}
