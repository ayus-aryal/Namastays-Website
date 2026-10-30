import 'server-only';

/**
 * Minimal fetch wrapper for the Namastays public API.
 * - Server-only: the browser never talks to the backend directly (no CORS, no tokens).
 * - Retries network errors, timeouts, 429 and 5xx (the backend can be slow to wake up).
 * - A 404 becomes `null` via apiGetOrNull; every other failure throws, so ISR keeps serving the
 *   last good page instead of caching an empty one.
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export type ApiOptions = {
  /** Seconds before Next.js refreshes this response. Default 600 (10 minutes). */
  revalidate?: number;
  tags?: string[];
  /** Per-attempt timeout. Default 25s, generous for a cold backend. */
  timeoutMs?: number;
  /** Extra attempts after the first. Default 2. */
  retries?: number;
  /** Base delay between attempts, doubled each time. Default 500ms. */
  retryDelayMs?: number;
};

function baseUrl(): string {
  const value = process.env.API_BASE_URL;
  if (!value) {
    throw new Error(
      'API_BASE_URL is not set. Add it to .env.local, e.g. API_BASE_URL=https://namastays-backend.onrender.com/api/v1'
    );
  }
  return value.replace(/\/+$/, '');
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiGetOrNull<T>(path: string, options: ApiOptions = {}): Promise<T | null> {
  const {
    revalidate = 600,
    tags = ['public-api'],
    timeoutMs = 25_000,
    retries = 2,
    retryDelayMs = 500
  } = options;

  const url = `${baseUrl()}/public${path}`;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await sleep(retryDelayMs * 2 ** (attempt - 1));
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(timeoutMs),
        next: { revalidate, tags }
      });

      if (response.status === 404) return null;
      if (response.ok) return (await response.json()) as T;

      const error = new ApiError(response.status, `GET ${url} failed with ${response.status}`);
      if (response.status < 500 && response.status !== 429) throw error; // not worth retrying
      lastError = error;
    } catch (error) {
      if (error instanceof ApiError && error.status < 500 && error.status !== 429) throw error;
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error(`GET ${url} failed`);
}

export async function apiGet<T>(path: string, options?: ApiOptions): Promise<T> {
  const result = await apiGetOrNull<T>(path, options);
  if (result === null) throw new ApiError(404, `GET ${path} returned 404`);
  return result;
}
