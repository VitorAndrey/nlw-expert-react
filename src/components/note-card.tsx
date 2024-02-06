import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

type NoteCardProps = {
  title: string;
  content: string;
  type?: "default" | "add";
};

export function NoteCard({ title, content, type = "default" }: NoteCardProps) {
  return (
    <Card
      data-type={type}
      className="bg-neutral-800 p-5 pb-3 border-none shadow-lg data-[type=add]:bg-neutral-700 overflow-hidden"
    >
      <h3
        data-type={type}
        className="text-sm font-medium text-neutral-300 data-[type=add]:text-neutral-200 mb-4"
      >
        {title}
      </h3>
      <ScrollArea className="h-44 scroll pb-2">
        <p className="text-sm leading-6 text-neutral-400 pr-3">{content}</p>
      </ScrollArea>
    </Card>
  );
}
