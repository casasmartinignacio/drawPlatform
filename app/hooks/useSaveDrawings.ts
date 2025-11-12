import { useMutation, useQueryClient } from '@tanstack/react-query';
import { drawingsService } from '@/app/services/drawServices';
import type { Draw, DrawResponse } from '../../types/common';

export function useSaveDrawing() {
    const queryClient = useQueryClient();

    return useMutation<DrawResponse, Error, Draw>({
        mutationFn: async (draw: Draw) => {
            return await drawingsService.create(draw);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["drawings"] });
            alert('¡Dibujo guardado exitosamente!');
        },
        onError: (error: Error) => {
            alert(`Error al guardar el dibujo: ${error.message}`);
        },
    });
}