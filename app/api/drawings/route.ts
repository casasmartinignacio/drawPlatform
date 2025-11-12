import { NextResponse } from "next/server";
import { drawService } from "../services/drawBackServices";
import { DrawResponse } from "@/types/common";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.data || !Array.isArray(body.tags) || !body.id) {
      throw Error("Faltan campos obligatorios: data, tags, id")
    }

    const code = await drawService.create(body);

    const response: DrawResponse = {
      message: "Objeto creado con exito",
      code: code
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error en POST /api/drawings:', error);

    if (error instanceof Error) {
      if (error.message.includes('campos obligatorios') ||
          error.message.includes('tags') ||
          error.name === 'InvalidImageFormatError' ||
          error.name === 'ImageTooLargeError') {
        return NextResponse.json(
          { message: error.message },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const drawings = await drawService.getAll();

    const response: DrawResponse = {
      message: "Dibujos obtenidos",
      data: drawings,
      code: "GOOD_REQUEST"
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Error en GET /api/drawings:', error);

    return NextResponse.json(
      { message: "Error del servidor" },
      { status: 500 }
    );
  }
}





