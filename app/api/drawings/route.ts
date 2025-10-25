// app/api/products/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";
import {drawing} from "@/app/type/commons"

export async function GET() {
  try {
    const products = await db.findAll();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener productos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDrawing = await db.create({
      name: body.name,
      price: body.price,
      description: body.description || "",
      stock: body.stock,
    });
    return NextResponse.json(newDrawing, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear producto" },
      { status: 500 }
    );
  }
}