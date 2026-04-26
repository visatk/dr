// ─── Cloudflare Worker Bindings ───────────────────────────────────────────────
export interface Env {
  ENVIRONMENT: string;
  API_VERSION: string;
  // Uncomment as you add Cloudflare resources:
  // CACHE: KVNamespace;
  // DB: D1Database;
  // UPLOADS: R2Bucket;
  ASSETS: Fetcher;
}

// ─── API Response Shapes ──────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    timestamp: string;
    version: string;
    requestId: string;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface JwtPayload {
  sub: string;
  email: string;
  role: "admin" | "user" | "guest";
  iat: number;
  exp: number;
}

// ─── Health Check ─────────────────────────────────────────────────────────────
export interface HealthStatus {
  status: "ok" | "degraded" | "error";
  uptime: number;
  environment: string;
  version: string;
  checks: Record<string, "ok" | "error">;
}
