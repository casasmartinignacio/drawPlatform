import { v4 as uuidv4 } from 'uuid';
import { useSaveDrawing } from '../hooks/useSaveDrawings';
import type { Draw } from '../../types/common';

interface Props {
    author?: string;
    tags: string[];
    exportDrawing: () => Promise<string>; // función que exporta el dibujo
}

export function SaveButton({ author, tags, exportDrawing }: Props) {
    const saveMutation = useSaveDrawing();

    const handleSave = async () => {
        if (tags.length < 5 || tags.length > 20) {
            alert('Debes seleccionar entre 5 y 20 tags para el dibujo');
            return;
        }

        try {
            const data = await exportDrawing();

            if (!data || data.trim() === '') {
                alert('El dibujo está vacío');
                return;
            }

            const MAX_SIZE = 10 * 1024 * 1024;
            const base64Length = data.length - data.indexOf(',') - 1;
            const fileSizeInBytes = (base64Length * 3) / 4;

            if (fileSizeInBytes > MAX_SIZE) {
                alert('La imagen excede el tamaño máximo de 10 MB');
                return;
            }

            const newDraw: Draw = {
                id: uuidv4(),
                author,
                tags,
                data,
            };
            saveMutation.mutate(newDraw);
        } catch (error) {
            alert('Error al procesar el dibujo');
            console.error(error);
        }
    };

    return (
        <div >
            <button
                onClick={handleSave}
                className="save-button"
                disabled={saveMutation.isPending}
            >
                {saveMutation.isPending ? 'Guardando...' : 'Guardar dibujo'}
            </button>
        </div>
    );
}