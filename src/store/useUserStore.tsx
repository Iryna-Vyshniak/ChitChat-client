import { create } from 'zustand';

import { UserItemI } from '../shared/types';

interface UserState {
  users: UserItemI[] | [];
  setUsers: (users: UserItemI[]) => void;
  filteredUsers: UserItemI[];
  setFilteredUsers: (filteredUsers: UserItemI[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users: UserItemI[]) => set((state) => ({ ...state, users })),
  filteredUsers: [],
  setFilteredUsers: (filteredUsers: UserItemI[]) =>
    set((state) => ({ ...state, filteredUsers })),
}));
