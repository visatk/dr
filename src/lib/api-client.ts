import type { ApiResponse } from "@/types";

// ─── API Client ───────────────────────────────────────────────────────────────
const BASE = "/api/v1";

function getToken(): string | null {
  return localStorage.getItem("cf_token");
}

export function setToken(token: string): void {
  localStorage.setItem("cf_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("cf_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Request-ID": crypto.randomUUID(),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers as Record<string, string>),
  };

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok && res.status === 401) {
    clearToken();
    window.location.href = "/login";
  }

  return res.json() as Promise<ApiResponse<T>>;
}

// ─── Convenience Methods ──────────────────────────────────────────────────────
export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; expiresIn: number }>("/auth/login", { email, password }),
  refresh: () =>
    api.post<{ token: string; expiresIn: number }>("/auth/refresh", {}),
};

// ─── Items API ────────────────────────────────────────────────────────────────
interface Item {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export const itemsApi = {
  list: () => api.get<Item[]>("/items"),
  get: (id: string) => api.get<Item>(`/items/${id}`),
  create: (data: { name: string; description?: string }) =>
    api.post<Item>("/items", data),
  update: (id: string, data: Partial<{ name: string; description: string }>) =>
    api.patch<Item>(`/items/${id}`, data),
  remove: (id: string) => api.delete(`/items/${id}`),
};
