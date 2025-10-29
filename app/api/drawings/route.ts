import { NextResponse } from "next/server";
import { drawService } from "../services/drawBackServices";
import { DrawResponse } from "@/types/common";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    // valida existencia de los parametros de la request
    if (!body.data || !Array.isArray(body.tags) || !body.id) {
      throw Error("Faltan campos obligatorios: data, tags")
    }

    const code = await drawService.create(body);

    const response: DrawResponse = { 
      message: "Objeto creado con exito",
      code: code 
    }

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    const response: DrawResponse = { 
      message: error?.message || "Error del servidor :(" 
    }

    return NextResponse.json(response, { status: 500 });
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
  } catch (error: any) {
    const response: DrawResponse = { 
      message: error?.message || "Error del servidor :(" 
    }

    return NextResponse.json(response, { status: 500 });
  }
}





