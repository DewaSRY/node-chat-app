export interface Message {
  text: string;
  senderName: string;
  createAt: number;
}

export interface AllMessages {
  messages: Message[];
}
