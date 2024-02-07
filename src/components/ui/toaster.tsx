import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="bg-neutral-800 border-neutral-500"
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-neutral-200">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-neutral-400">
                  {description}
                </ToastDescription>
              )}
            </div>
            <div className="pr-2">{action}</div>
            <ToastClose className="text-neutral-400 hover:text-neutral-50 ring-neutral-50" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
