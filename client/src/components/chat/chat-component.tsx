// import { ComponentProps, PropsWithChildren } from "react";
// interface ChatComponentProps extends ComponentProps<"div">, PropsWithChildren {}

import TextFormComponent from "./text-form-component";

import ChatProvider from "@/provider/chat-provider";
export default function ChatComponent() {
  return (
    <ChatProvider>
      <TextFormComponent />
    </ChatProvider>
  );
}
