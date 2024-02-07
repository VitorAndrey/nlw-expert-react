import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

type NoteCardProps = {
  title: string;
  content: string;
  type?: "default" | "add";
};

export function NoteCard({ title, content, type = "default" }: NoteCardProps) {
  return (
    <button className="text-left outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-[#CEF193] transition-all duration-300">
      <Card
        data-type={type}
        className="bg-neutral-800 p-5 pl-6 pb-3 border-none shadow-lg data-[type=add]:bg-neutral-700 overflow-hidden hover:ring-1 hover:ring-neutral-500 data-[type=add]:hover:ring-neutral-400 transition-all duration-300"
      >
        <h3
          data-type={type}
          className="text-sm font-medium text-neutral-300 data-[type=add]:text-neutral-200 mb-4"
        >
          {title}
        </h3>
        <ScrollArea className="h-44 scroll pb-2 pr-3.5">
          <p className="text-sm leading-6 text-neutral-400">{content}</p>
        </ScrollArea>
      </Card>
    </button>
  );
}
