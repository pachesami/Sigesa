import httpClient from './httpClient';
import type { LoginResponse } from '../types/auth';

export type LoginPayload = {
  username: string;
  password: string;
};

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await httpClient.post<LoginResponse>('/auth/login/', payload);
    return data;
  },
  logout: async (refresh: string) => {
    const { data } = await httpClient.post<{ detail: string }>('/auth/logout/', { refresh });
    return data;
  },
};
