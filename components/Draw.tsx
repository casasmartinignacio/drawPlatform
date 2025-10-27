import { Draw } from "./Interface";

export default async function SingleDraw(params : Draw) {

  return (
    <div
        className="border border-neutral-800 rounded-xl p-4 bg-neutral-950 hover:bg-neutral-800 transition flex flex-col items-center"
        >
    <img
        src={params.data || '/placeholder.webp'}
        alt={`Drawing by ${params.author || 'Anónimo'}`}
        className="w-full h-60 object-contain rounded-md bg-neutral-800 mb-4"
    />
    <p className="font-medium text-gray-100 text-center">
        {params.author || 'Anónimo'}
    </p>
    <p className="text-sm text-gray-500 text-center">
        {(params.tags || []).join(', ')}
    </p>
    </div>
  );
}
