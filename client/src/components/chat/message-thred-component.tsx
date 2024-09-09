import { ComponentRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

import MessageComponent from "./message-component";
// import userChatStore from "@/zustand/user-chat-store";
import { useChatProvider } from "@/provider/chat-provider";

export default function MessageThredComponent() {
  const endBodyRef = useRef<ComponentRef<"div">>(null);

  const { messages } = useChatProvider();
  console.log(messages);
  useEffect(() => {
    endBodyRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div
      className={cn(
        "flex-1 h-[80vh]  no-scrollbar ",
        "flex overflow-y-scroll flex-col gap-2"
      )}
    >
      {messages.length > 0 && (
        <>
          {messages.map((m, id) => (
            <MessageComponent key={id} message={m} />
          ))}
        </>
      )}

      <div ref={endBodyRef} />
    </div>
  );
}
