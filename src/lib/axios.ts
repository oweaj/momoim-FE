import { toast } from "@/hooks/use-toast";
import { LoginResponse } from "@/types/auth";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryAttempted?: boolean;
}

// 클라이언트용 axios 인스턴스
export const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

clientAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // 로그아웃 API는 토큰 검증 없이 처리
    if (originalRequest.url === "/api/auths/logout") {
      return Promise.reject(error);
    }

    if (axios.isAxiosError(error) && error.response) {
      const { status } = error.response;

      if (status === 401 && !originalRequest.retryAttempted) {
        originalRequest.retryAttempted = true;

        try {
          const { data } = await clientAxios.post<LoginResponse>("/api/auths/refresh");
          const { accessToken } = data.data;

          Cookies.set("accessToken", accessToken.token, {
            secure: true,
            sameSite: "lax",
          });
          originalRequest.headers.Authorization = `Bearer ${accessToken.token}`;
          return await clientAxios(originalRequest);
        } catch (refreshError) {
          try {
            await clientAxios.post("/api/auths/logout");
          } catch (logoutError) {
            toast({
              variant: "destructive",
              title: "로그아웃 실패",
              description: "로그아웃 처리 중 오류가 발생했습니다",
              duration: 2000,
            });
          } finally {
            Cookies.remove("accessToken");
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);

clientAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.url === "/api/auths/logout" || config.url === "/api/auths/refresh") {
    return config;
  }

  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});

// 서버용 axios 인스턴스
export const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

serverAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { cookies } = require("next/headers");
      const cookieStore = cookies();
      cookieStore.delete("accessToken");
    }
    return Promise.reject(error);
  },
);

serverAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { cookies } = require("next/headers");
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    config.headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return config;
});
