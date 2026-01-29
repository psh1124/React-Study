import { STORAGE_KEYS } from "../constants/storage";

export interface MockUser {
  id: number;
  email: string;
  password: string;
  nickname: string;
}

export function getMockUsers(): MockUser[] {
  const stored = localStorage.getItem(STORAGE_KEYS.MOCK_USERS);
  return stored ? JSON.parse(stored) : [];
}

export function saveMockUsers(users: MockUser[]) {
  localStorage.setItem(STORAGE_KEYS.MOCK_USERS, JSON.stringify(users));
}
