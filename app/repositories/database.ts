// app/lib/database.ts
import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

export interface Drawing {
  id: number;
  author: string;
  tags: string[];
  data: string;
}

class InvalidImageFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidImageFormatError";
  }
}

class ImageTooLargeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ImageTooLargeError";
  }
}

class Database {
  
  private async readDB(): Promise<Drawing[]> {
    try {
     const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, se crea uno nuevo y se devuelve un array vacio
      await fs.writeFile(DB_PATH, "[]", "utf-8");
      return [];
    }
  }
    
  private async findAll(): Promise<Drawing[]>{ //json parseado
      return await this.readDB();
  }

  private async writeDB(data: Drawing[]): Promise<void> {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async create(drawing: Omit<Drawing, "id">) {
    const data = await this.readDB();

    const validFormats = ["data:image/png;base64,", "data:image/jpeg;base64,"];
    const hasValidFormat = validFormats.some(prefix => drawing.data.startsWith(prefix));

    if (!hasValidFormat) {
      throw new InvalidImageFormatError("El formato de la imagen debe ser PNG o JPEG");
    }

    const base64Length = drawing.data.length - drawing.data.indexOf(",") - 1;
    const fileSizeInBytes = (base64Length * 3) / 4;
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (fileSizeInBytes > maxSize) {
      throw new ImageTooLargeError("La imagen excede el tamaño máximo permitido de 10 MB");
    }

    const newDrawing: Drawing = {
      id: data.length > 0 ? Math.max(...data.map(p => p.id)) + 1 : 1,
      ...drawing
    };

    data.push(newDrawing);
    await this.writeDB(data);
    return 201;
  }
  
}

export const db = new Database();