import type {
  UserLogin,
  UserPayload,
  UserRegister,
  Friends,
} from "@/types/user-type";
import axios from "axios";
const BE_URL =
  import.meta.env.VITE_BE_URL ?? "https://dewa-node-chat-app.up.railway.app/";
export async function fetchUserLogin(pyload: UserLogin): Promise<UserPayload> {
  const { data } = await axios.post<UserPayload>(`${BE_URL}/api/login`, {
    email: pyload.email,
    password: pyload.password,
  });
  return data;
}
export async function fetchUserRegister(
  pyload: UserRegister
): Promise<UserPayload> {
  const { data } = await axios.post<UserPayload>(`${BE_URL}/api/register`, {
    email: pyload.email,
    password: pyload.password,
    username: pyload.username,
  });
  return data;
}
export async function fetchSigin(): Promise<UserPayload> {
  const { data } = await axios.get<UserPayload>(`${BE_URL}/api/sigin`);
  return data;
}
export async function fetchGetAllFriends(): Promise<Friends[]> {
  const { data } = await axios.get<Friends[]>(`${BE_URL}/api/friend/`);
  return data;
}
export async function fetchMakeAfriends(friendsId: string): Promise<Friends> {
  const { data } = await axios.post<Friends>(
    `${BE_URL}/api/friend/${friendsId}`
  );
  return data;
}
