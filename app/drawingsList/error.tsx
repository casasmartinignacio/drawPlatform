"use client";

export default function DrawingsListError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4 text-red-500">
        Ocurrió un error
      </h1>
      <p className="text-center text-gray-300">
        No se pudieron cargar los dibujos. Por favor, intente más tarde.
      </p>
    </div>
  );
}