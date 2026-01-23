export interface MockUser {
    id: number;
    email: string;
    password: string;
    nickname: string;
}

// Dummy Data
// export const mockUsers: MockUser[] = [
//     {
//         id: 1,
//         email: "asdf@asdf.com",
//         password: "asdfasdf",
//         nickname: "테스트",
//     },
//     {
//         id: 2,
//         email: "a01038818368@gmail.com",
//         password: "asdfasdf",
//         nickname: "성훈",
//     },
// ];

const STORAGE_KEY = "mock_users";

export function getMockUsers(): MockUser[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveMockUsers(users: MockUser[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}