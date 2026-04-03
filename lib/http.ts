import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonResponse<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(
  message: string,
  status = 500,
  issues?: unknown
) {
  return NextResponse.json(
    {
      message,
      ...(issues ? { issues } : {}),
    },
    { status }
  );
}

export function handleRouteError(
  error: unknown,
  defaultMessage: string,
  status = 500
) {
  if (error instanceof ZodError) {
    return errorResponse("Datos inválidos", 400, error.flatten());
  }

  if (error instanceof Error) {
    return errorResponse(error.message || defaultMessage, status);
  }

  return errorResponse(defaultMessage, status);
}
