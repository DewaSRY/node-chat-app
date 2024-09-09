import { create } from "zustand";
import type { Message } from "@/types/chat-types";
const initialState = {
  messages: [] as Message[],
};
type Actions = {
  storeMessage: (_message: Message) => void;
  storeALMessage: (_message: Message[]) => void;
};
type State = typeof initialState;
const userChatStore = create<State & Actions>((set) => ({
  ...initialState,
  storeMessage: (data) => {
    set((s) => ({ messages: [...s.messages, data] }));
  },
  storeALMessage: (data) => {
    set((s) => ({ messages: [...s.messages, ...data] }));
  },
}));
export default userChatStore;
