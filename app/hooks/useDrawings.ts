"use client";

import { useQuery } from "@tanstack/react-query";
import { drawingsService } from "@/app/services/drawServices";
import {Draw} from "@/types/common"

// obtiene todos los dibujos
async function fetchDrawings(): Promise<Draw[]> {
  const res = await drawingsService.getAll();
  return res.data ?? []; // devolvemos solo el array de dibujos
}

export default function useDrawings() {
  const { data, isLoading, error, refetch } = useQuery<Draw[]>({
    queryKey: ["drawings"], // clave del cache
    queryFn: fetchDrawings, // función que trae los datos
  });
  
  // renombramos data como drawings, para mayor claridad
  return { drawings: data || [], isLoading, error, refetch };
}
