"use client";
import dynamic from 'next/dynamic';

const ExcalidrawWrapper = dynamic(() => import('./ExcalidrawWrapper'), { ssr: false });

export default function ExcalidrawClient() {
    return <ExcalidrawWrapper />;
}
