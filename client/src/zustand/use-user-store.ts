import { create } from "zustand";
import { toast } from "react-toastify";
import type {
  UserLogin,
  UserRegister,
  UserPayload,
  PublicUser,
} from "@/types/user-type";
import {
  fetchGetAllFriends,
  fetchUserLogin,
  fetchSignin,
  fetchMakeAfriends,
  fetchUserRegister,
} from "@/api/utils";

const initialState = {
  user: null as UserPayload | null,
  isLoading: false,
  allUser: [] as PublicUser[],
};
type Actions = {
  fetchSignIn: () => Promise<void>;
  fetchUserLogin: (_payload: UserLogin) => Promise<void>;
  fetchUserRegister: (_payload: UserRegister) => Promise<void>;
  fetchGetAllFriends: (_payload: UserRegister) => Promise<void>;
  fetchMakeAfriends: (_friendID: string) => Promise<void>;
};
type State = typeof initialState;
const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  fetchSignIn: async () => {
    set((s) => ({ ...s, isLoading: true }));
    toast.warn("Fetch user data");
    try {
      const data = await fetchSignin();
      if (data) {
        set((s) => ({ ...s, user: data }));
      }
      toast.warn(`welcome back ${data.username}`);
    } catch (e) {
    } finally {
      set((s) => ({ ...s, isLoading: false }));
    }
  },
  fetchUserLogin: async (payload) => {
    set((s) => ({ ...s, isLoading: true }));
    toast.warn("login user");
    try {
      const data = await fetchUserLogin(payload);
      if (data) {
        set((s) => ({ ...s, user: data }));
      }
      toast.warn(`welcome back ${data.username}`);
    } catch (e) {
      toast.error("failed to login");
    } finally {
      set((s) => ({ ...s, isLoading: false }));
    }
  },
  fetchUserRegister: async (payload) => {
    set((s) => ({ ...s, isLoading: true }));
    toast.warn("user register");
    try {
      const data = await fetchUserRegister(payload);
      if (data) {
        set((s) => ({ ...s, user: data }));
      }
      toast.warn(`welcome ${data.username}`);
    } catch (e) {
      toast.error(
        "failed to register, username or email might be al ready use"
      );
    } finally {
      set((s) => ({ ...s, isLoading: false }));
    }
  },
  // TODO: make it latter
  fetchGetAllFriends: async () => {
    try {
      const data = await fetchGetAllFriends();
      if (data) {
        // set((s) => ({ ...s, user: data }));
      }
    } catch (e) {
    } finally {
      set((s) => ({ ...s, isLoading: false }));
    }
  },
  // TODO: make it latter
  fetchMakeAfriends: async (friendId) => {
    try {
      const data = await fetchMakeAfriends(friendId);
      if (data) {
        // set((s) => ({ ...s, user: data }));
      }
    } catch (e) {
    } finally {
      set((s) => ({ ...s, isLoading: false }));
    }
  },
}));
export default useUserStore;
