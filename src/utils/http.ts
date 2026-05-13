export interface PostJsonOptions {
  timeoutMs?: number
  signal?: AbortSignal
  headers?: Record<string, string>
}

export class HttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

// Minimal JSON POST helper with timeout. Throws on non-2xx or network failure.
export const postJson = async <T = unknown>(
  url: string,
  body: unknown,
  { timeoutMs = 10000, signal, headers = {} }: PostJsonOptions = {},
): Promise<T> => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  if (signal) signal.addEventListener('abort', () => controller.abort())

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...headers },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    if (!res.ok) {
      throw new HttpError(res.status, `Request failed: ${res.status} ${res.statusText}`)
    }

    const contentType = res.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) return (await res.json()) as T
    return (await res.text()) as unknown as T
  } finally {
    clearTimeout(timeout)
  }
}
