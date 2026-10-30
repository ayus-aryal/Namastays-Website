import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { ApiError, apiGet, apiGetOrNull } from '../api/client';

const realFetch = globalThis.fetch;
let calls: { url: string; init?: RequestInit }[] = [];

const respond = (...statuses: (number | Error)[]) => {
  calls = [];
  let i = 0;
  globalThis.fetch = (async (url: string, init?: RequestInit) => {
    calls.push({ url: String(url), init });
    const next = statuses[Math.min(i++, statuses.length - 1)];
    if (next instanceof Error) throw next;
    return new Response(next === 200 ? JSON.stringify({ ok: true }) : 'nope', { status: next });
  }) as typeof fetch;
};

beforeEach(() => {
  process.env.API_BASE_URL = 'https://backend.test/api/v1/';
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

const fast = { retryDelayMs: 0 };

test('calls the public path with a JSON Accept header', async () => {
  respond(200);
  assert.deepEqual(await apiGet('/cities', fast), { ok: true });
  assert.equal(calls[0].url, 'https://backend.test/api/v1/public/cities');
  assert.equal((calls[0].init!.headers as Record<string, string>).Accept, 'application/json');
});

test('a 404 is null for single items and an error for apiGet', async () => {
  respond(404);
  assert.equal(await apiGetOrNull('/stays/nope', fast), null);
  await assert.rejects(() => apiGet('/stays/nope', fast), (e: ApiError) => e.status === 404);
});

test('retries server errors and network failures, then succeeds', async () => {
  respond(503, new Error('socket hang up'), 200);
  assert.deepEqual(await apiGet('/cities', fast), { ok: true });
  assert.equal(calls.length, 3);
});

test('gives up after the retries are used', async () => {
  respond(500);
  await assert.rejects(() => apiGet('/cities', { ...fast, retries: 2 }), (e: ApiError) => e.status === 500);
  assert.equal(calls.length, 3);
});

test('does not retry client errors', async () => {
  respond(400);
  await assert.rejects(() => apiGet('/cities', fast), (e: ApiError) => e.status === 400);
  assert.equal(calls.length, 1);
});

test('explains a missing API_BASE_URL', async () => {
  delete process.env.API_BASE_URL;
  respond(200);
  await assert.rejects(() => apiGet('/cities', fast), /API_BASE_URL is not set/);
});
