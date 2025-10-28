import { v4 as uuidv4 } from 'uuid';
import { useSaveDrawing } from '../hooks/useSaveDrawings';
import type { Draw } from '../../types/common';

interface Props {
    author?: string;
    tags: string[];
    data: string; // contenido del dibujo
}

export function SaveButton({ author, tags, data }: Props) {
    const saveMutation = useSaveDrawing();

    const handleSave = () => {
        console.log('Guardando dibujo...');
        const newDraw: Draw = {
            id: uuidv4(),
            author,
            tags,
            data,
        };
        saveMutation.mutate(newDraw);
    };

    return (
        <div >
            <button onClick={handleSave} className="save-button">
                {/*saveMutation.isLoading ? 'Guardando...' : 'Guardar dibujo'*/}
                Guardar dibujo
            </button>
        </div>
    );
}