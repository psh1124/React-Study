import { getMockUsers, saveMockUsers } from "./users";

export function mockLogin(email: string, password: string) {
  return new Promise<{ id: number; email: string; nickname: string }>((resolve, reject) => {
    setTimeout(() => {
      const users = getMockUsers();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        reject(new Error("이메일 또는 비밀번호가 올바르지 않습니다."));
        return;
      }

      resolve({
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      });
    }, 500);
  });
}

export function mockSignup(
  email: string,
  password: string,
  nickname: string
) {
  return new Promise<{ id: number; email: string; nickname: string }>(
    (resolve, reject) => {
      setTimeout(() => {
        const users = getMockUsers();

        if (users.some((u) => u.email === email)) {
          reject(new Error("이미 사용 중인 이메일입니다."));
          return;
        }

        const newUser = {
          id: users.length ? users[users.length - 1].id + 1 : 1,
          email,
          password,
          nickname,
        };

        users.push(newUser);
        saveMockUsers(users);

        resolve({
          id: newUser.id,
          email: newUser.email,
          nickname: newUser.nickname,
        });
      }, 500);
    }
  );
}

export function mockWithdraw(userId: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const users = getMockUsers();
      const filtered = users.filter((u) => u.id !== userId);

      saveMockUsers(filtered);
      resolve();
    }, 500);
  });
}