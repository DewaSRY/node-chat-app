import { ComponentProps, PropsWithChildren } from "react";
import { format } from "timeago.js";
import type { Message } from "@/types/chat-types";
import { cn } from "@/lib/utils";
import useUserStore from "@/zustand/use-user-store";
import { usetextToSpeach } from "@/provider/text-to-speach-provider";
import { Speech } from "lucide-react";

interface MessageComponentProps
  extends ComponentProps<"div">,
    PropsWithChildren {
  message: Message;
}

export default function MessageComponent({
  children,
  message,
  ...resProps
}: MessageComponentProps) {
  const { user } = useUserStore();
  const { readText } = usetextToSpeach();

  function readingText() {
    readText(message.text);
  }
  return (
    <div
      className={cn(
        "px-2 py-4  max-w-[90vh]  lg:max-w-[600px] ",
        user?.username === message.senderName && " self-end"
      )}
      {...resProps}
    >
      <div className="">
        <span
          className={cn(user?.username === message.senderName && " hidden ")}
        >
          {message.senderName}
        </span>
        <p
          className={cn(
            " p-2  rounded-md",
            user?.username === message.senderName
              ? " bg-blue-400/30"
              : "bg-gray-800/60 "
          )}
        >
          {message.text}
        </p>
        <div className="flex justify-between my-4 ">
          <span
            onClick={readingText}
            className="text-sm text-gray-400 cursor-pointer flex gap-2"
          >
            <Speech /> Speach
          </span>
          <span className="text-sm text-gray-400">
            {format(new Date(message.createAt))}
          </span>
        </div>
      </div>
    </div>
  );
}
