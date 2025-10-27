import { DrawList, Draw } from "./Interface";
import SingleDraw from "./Draw";

export default async function DrawingsList(params: DrawList) {

  return (
    <div>
        {params.drawings.length === 0 ? (
          <p className="text-center text-gray-400">No hay dibujos disponibles ¡Podrias ser el primero!</p>
        ) : (
          <div className="grid grid-cols-3 gap-8">
            {params.drawings.map((draw: Draw, index) => (
              <SingleDraw key={index} {...draw}/>
            ))}
          </div>
        )}
    </div>
  );
}
