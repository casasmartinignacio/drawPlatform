"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { drawingsService } from "@/app/services/drawServices";
import { Draw } from "@/types/common";

// crea un nuevo dibujo
async function createDrawing(drawing: Draw) {
  const res = await drawingsService.create(drawing);
  return res.data;
}

export default function useCreateDrawing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (drawing: Draw) => createDrawing(drawing),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drawings"] });
    },
  });
}
