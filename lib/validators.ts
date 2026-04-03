import { Role, Status } from "@prisma/client";
import { z } from "zod";

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const textField = z.string().trim().min(1);

const optionalTextField = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().min(1).optional()
);

const optionalNumberField = z.preprocess((value) => {
  const normalized = emptyStringToUndefined(value);

  if (normalized === undefined || normalized === null) {
    return undefined;
  }

  return Number(normalized);
}, z.number().finite().nonnegative().optional());

const optionalDateField = z.preprocess((value) => {
  const normalized = emptyStringToUndefined(value);

  if (normalized === undefined || normalized === null) {
    return undefined;
  }

  if (normalized instanceof Date) {
    return normalized;
  }

  return new Date(String(normalized));
}, z.date().optional());

const optionalBooleanField = z.preprocess((value) => {
  if (value === "" || value === undefined || value === null) {
    return false;
  }

  if (typeof value === "string") {
    return value === "true" || value === "on";
  }

  return Boolean(value);
}, z.boolean());

export const createClientSchema = z.object({
  name: textField,
  alias: textField,
  email: z.string().trim().toLowerCase().email(),
  phone_number: optionalTextField,
  location: optionalTextField,
  status: optionalTextField.default("Activo"),
});

export const createProjectSchema = z.object({
  name: textField,
  price: z.coerce.number().finite().nonnegative(),
  description: optionalTextField.nullable().transform((value) => value ?? null),
  pre_payment: optionalNumberField.nullable().transform((value) => value ?? null),
  finish_date: optionalDateField.nullable().transform((value) => value ?? null),
  status: z.nativeEnum(Status).optional().default(Status.activo),
  initial_date: optionalDateField.nullable().transform((value) => value ?? null),
  hosting: optionalDateField.nullable().transform((value) => value ?? null),
  domain: optionalDateField.nullable().transform((value) => value ?? null),
  cloud_storage: optionalBooleanField.default(false),
  cloud_storage_date: optionalDateField
    .nullable()
    .transform((value) => value ?? null),
  clientsId: optionalNumberField.nullable().transform((value) => value ?? null),
});

export const registerUserSchema = z.object({
  name: optionalTextField.nullable().transform((value) => value ?? null),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  role: z.nativeEnum(Role).optional().default(Role.USER),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});
