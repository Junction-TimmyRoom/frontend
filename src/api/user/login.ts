import apiClient from '..';

interface LoginRequest {
  nickname: string;
  pregnancyWeeks: number;
}

interface LoginResponse {
  accessToken: string;
}

interface User {
  nickname: string;
  pregnancyWeeks: number;
}

export const login = async (
  requestParameters: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>(
      '/api/v1/auth/signupAndLogin',
      requestParameters
    );
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('회원가입 실패', error);
    return Promise.reject(error);
  }
};

export const GetUserInfo = async (): Promise<User> => {
  try {
    const response = await apiClient.get<User>(`/user`);
    return Promise.resolve(response.data);
  } catch (error) {
    console.error('사용자 정보 조회 실패', error);
    return Promise.reject(error);
  }
};
