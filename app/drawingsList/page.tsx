import useDrawings from '@/app/drawingsList/useDrawings';
import DrawList from '@/components/DrawingList';

export default async function DrawingsList() {
  const drawings = await useDrawings();

  return (
    <div className="min-h-screen bg-black text-white px-8 py-10 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-10">
        <h1 className="text-3xl font-semibold text-center mb-10 text-gray-100">
          Lista de dibujos
        </h1>
        <DrawList drawings={drawings} />
      </div>
    </div>
  );
}
