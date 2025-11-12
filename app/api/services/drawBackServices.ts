import { db } from "@/app/repositories/database";
import { Draw } from "@/types/common";

export const drawService = {
  create: async (draw: Draw): Promise<string> => {
    if (draw.tags.length < 5 || draw.tags.length > 20) {
      throw Error("Se deben elegir entre 5 y 20 tags para el dibujo");
    }

    await db.create({
      id: draw.id,
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
    
    
