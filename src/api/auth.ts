import api from "./axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface UserProfile {
  id: string;
  username: string;
}

export const loginApi = async (data: LoginRequest): Promise<LoginResponse> => {
  const formData = new URLSearchParams();

  formData.append("username", data.username);
  formData.append("password", data.password);

  const response = await api.post<LoginResponse>("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const getCurrentUserApi = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>("/auth/me");

  return response.data;
};
