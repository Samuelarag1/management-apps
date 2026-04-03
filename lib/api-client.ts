import type { ApiErrorPayload } from "@/types/entities";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(input, init);
  const payload = (await response.json()) as T | ApiErrorPayload;

  if (!response.ok) {
    const errorPayload = payload as ApiErrorPayload;

    throw new ApiError(
      errorPayload.message ?? "Ocurrió un error inesperado",
      response.status
    );
  }

  return payload as T;
}
