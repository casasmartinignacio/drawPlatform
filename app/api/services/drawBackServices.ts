import { db } from "@/app/repositories/database";
import { DrawResponse, Draw } from "@/types/common";

interface DrawServiceResponse {
  message: string,
  code: string,
  status: number,
}

export const drawService = {
  create: async (draw: Draw): Promise<string> => {
    
    // Validaciones
    if (draw.tags.length < 5 || draw.tags.length > 20) {
      throw Error("Se deben elegir entre 5 y 20 tags para el dibujo");
    }

    // Si falla el error se ataja en route.ts, en caso de exito retorna 201
    const status = await db.create({ 
      tags: draw.tags,
      data: draw.data,
      ...(draw.author ? { author: draw.author } : {}), 
    }); 
    
    return "OBJECT_CREATED";
  },

  getAll: async (): Promise<Draw[]> => {
    const drawings: Draw[] = await db.findAll();
    return drawings;
  },
};    
    
    
