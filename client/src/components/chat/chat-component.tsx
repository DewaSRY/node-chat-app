// import { ComponentProps, PropsWithChildren } from "react";
// interface ChatComponentProps extends ComponentProps<"div">, PropsWithChildren {}

import TextFormComponent from "./text-form-component";
import TextToSpeach from "@/provider/text-to-speach-provider";
import MessageThredComponent from "./message-thred-component";
import ChatProvider from "@/provider/chat-provider";
export default function ChatComponent() {
  return (
    <ChatProvider>
      <TextToSpeach>
        <MessageThredComponent />
        <TextFormComponent />
      </TextToSpeach>
    </ChatProvider>
  );
}
