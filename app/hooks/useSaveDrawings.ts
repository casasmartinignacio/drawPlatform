// hooks/useSaveDrawing.ts
import { useMutation } from '@tanstack/react-query';
import type { Draw, DrawResponse } from '../../types/common';

export function useSaveDrawing() {
    return useMutation<DrawResponse, Error, Draw>({
        mutationFn: async (draw: Draw) => {
            // Dummy: simula una llamada exitosa sin hacer fetch real
            return new Promise<DrawResponse>((resolve) => {
                setTimeout(() => {
                    resolve({
                        message: 'Dibujo guardado (dummy)',
                        data: [draw],
                    });
                }, 500); // simula retardo de red
            });
        },
    });
}