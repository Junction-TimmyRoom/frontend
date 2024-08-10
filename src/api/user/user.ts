import apiClient from '..';

interface User {
  nickname: string;
  pregnancyWeeks: number;
}

export const GetUserInfo = async (): Promise<User> => {
  try {
    const response = await apiClient.get<User>(`/user`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('사용자 정보 조회 실패', error);
    return Promise.reject(error);
  }
};
