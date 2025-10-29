import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

export interface Drawing {
  id: string;
  author?: string;
  tags: string[];
  data: string;
}

interface DrawingRecord extends Drawing {
  dbId: number; 
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
 
  private async readDB(): Promise<DrawingRecord[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, se crea uno nuevo vacío
      await fs.writeFile(DB_PATH, "[]", "utf-8");
      return [];
    }
  }


  private async writeDB(data: DrawingRecord[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  public async findAll(): Promise<Drawing[]> {
   
    const data = await this.readDB();
    return data.map(({ dbId, ...drawing }) => drawing);
  }

  
  public async create(drawing: Drawing) {
    const data = await this.readDB();

   
    const validFormats = ["data:image/png;base64,", "data:image/jpeg;base64,"];
    const hasValidFormat = validFormats.some(prefix => drawing.data.startsWith(prefix));

    if (!hasValidFormat) {
      throw new InvalidImageFormatError("El formato de la imagen debe ser PNG o JPEG");
    }

    // 🔍 Validar tamaño (máximo 10 MB)
    const base64Length = drawing.data.length - drawing.data.indexOf(",") - 1;
    const fileSizeInBytes = (base64Length * 3) / 4;
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (fileSizeInBytes > maxSize) {
      throw new ImageTooLargeError("La imagen excede el tamaño máximo permitido de 10 MB");
    }

    // 🆕 Creamos un id interno autoincremental
    const newDrawing: DrawingRecord = {
      dbId: data.length > 0 ? Math.max(...data.map(p => p.dbId)) + 1 : 1,
      ...drawing
    };

    data.push(newDrawing);
    await this.writeDB(data);

    return 201;
  }
}

export const db = new Database();
