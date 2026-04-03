import bcrypt from "bcrypt";
import { errorResponse, handleRouteError, jsonResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { serializeUser } from "@/lib/serializers";
import { registerUserSchema } from "@/lib/validators";

export async function POST(req: Request) {
  try {
    const payload = registerUserSchema.parse(await req.json());

    const existingUser = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      return errorResponse("Ya existe un usuario con ese email", 409);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
        role: payload.role,
        name: payload.name,
      },
    });

    return jsonResponse(
      {
        message: "Usuario registrado exitosamente",
        user: serializeUser(newUser),
      },
      201
    );
  } catch (error) {
    return handleRouteError(error, "Error al registrar el usuario");
  }
}
