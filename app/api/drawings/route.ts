import { NextResponse } from "next/server";
import { database }from "@app/repositories";
import { DrawResponse, Draw } from "@/types/common";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validaciones
    if (!body.data || !Array.isArray(body.tags)) {
      const response: DrawResponse = {
        message: "Faltan campos obligatorios: data, tags",
        code: "BAD_REQUEST",
      };
      return NextResponse.json(response, { status: 400 });
    }

    if (body.tags.length < 5 || body.tags.length > 20) {
      const response: DrawResponse = {
        message: "Se deben elegir entre 5 y 20 tags para el dibujo",
        code: "INVALID_TAG_COUNT",
      };
      return NextResponse.json(response, { status: 400 });
    }

    const newDraw = await database.create({
      id: body.id,
      tags: body.tags,
      data: body.data,
      ...(body.author ? { author: body.author } : {}), 
    });

    const response: DrawResponse = {
      message: "Dibujo creado exitosamente",
      data: [newDraw],
      code: "201",
    };

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    const response: DrawResponse = {
      message: "Error al crear dibujo",
      code: "SERVER_ERROR",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function GET() {
  try {
    const drawings = await database.getAll();
    const response: DrawResponse = {
      message: "Dibujos obtenidos correctamente",
      data: drawings,
      code: "200",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: DrawResponse = {
      message: "Error al obtener dibujos",
      code: "SERVER_ERROR",
    };
    return NextResponse.json(response, { status: 500 });
  }
}