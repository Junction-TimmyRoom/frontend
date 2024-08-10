import apiClient from '..';

interface LoginRequest {
  nickname: string;
  pregnancyWeeks: number;
}

interface LoginResponse {
  accessToken: string;
}

const login = async (
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

export default login;
