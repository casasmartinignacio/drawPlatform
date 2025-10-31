import { DrawResponse, Draw } from "@/types/common";
import SingleDraw from "./Draw";

type DrawListProps = {
  drawings: Draw[];
};

export default async function DrawingsList({ drawings }: DrawListProps) {

  return (
    <div>
        {drawings.length === 0 ? (
          <p className="text-center text-gray-400">No hay dibujos disponibles ¡Podrias ser el primero!</p>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {drawings.map((draw: Draw, index) => (
              <SingleDraw key={index} {...draw}/>
            ))}
          </div>
        )}
    </div>
  );
}
