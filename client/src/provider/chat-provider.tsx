import { socket, CHAT_MESSAGE, START_MESSAGE } from "@/socket";
import {
  HTMLAttributes,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  // useRef,
  useState,
} from "react";

// import { io } from "socket.io-client";
import type { Message } from "@/types/chat-types";
import useUserStore from "@/zustand/use-user-store";
const ChatProviderContext = createContext({
  sendMessage: (_text: string) => {},
  messages: [] as Message[],
});

ChatProviderContext.displayName = " ChatProvider context";

interface ProviderProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}
export default function Provider({ children }: ProviderProps) {
  const { user } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);

  function sendMessage(text: string) {
    socket.emit(CHAT_MESSAGE, {
      text,
      senderName: user?.username,
    });
  }

  useEffect(() => {
    function onReceIveMessage(value: Message) {
      setMessages((previous) => [...previous, value]);
      console.log(messages);
    }

    function onStartMessage(value: Message[]) {
      setMessages((previous) => [...previous, ...value]);
    }

    socket.on(START_MESSAGE, onStartMessage);
    socket.on(CHAT_MESSAGE, onReceIveMessage);

    socket.emit(START_MESSAGE);

    return () => {
      socket.off(START_MESSAGE, onStartMessage);
      socket.off(CHAT_MESSAGE, onReceIveMessage);
    };
  }, []);

  return (
    <ChatProviderContext.Provider value={{ sendMessage, messages }}>
      {children}
    </ChatProviderContext.Provider>
  );
}
export function useChatProvider() {
  const context = useContext(ChatProviderContext);

  if (!context) throw Error("use hook inside  chat-provider provider");

  return context;
}
