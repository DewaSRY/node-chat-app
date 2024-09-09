export interface UserRegister {
  username: string;
  email: string;
  password: string;
}
export interface UserLogin {
  password: string;
  email: string;
}

export interface Friends {
  chatId: string;
  id: string;
  username: string;
}
export interface PublicUser {
  chatId: string;
  id: string;
  username: string;
  isFriend: boolean;
}

export interface UserPayload {
  username: string;
  email: string;
  id: string;
  friends: Friends[];
}
