export interface Message {
  text: string;
  senderId: string;
}

export interface AllMessages {
  messages: Message[];
}
