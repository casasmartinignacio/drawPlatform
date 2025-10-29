"use client";
import { Excalidraw, convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@excalidraw/excalidraw/index.css";
import { SaveButton } from "./SaveButton";

const queryClient = new QueryClient();

const ExcalidrawWrapper: React.FC = () => {
    console.info(convertToExcalidrawElements([{
        type: "rectangle",
        id: "rect-1",
        x: 0,
        y: 0,
        width: 186.47265625,
        height: 141.9765625,
    },]));
    return (
        <div>
        <QueryClientProvider client={queryClient}>
                <SaveButton
                    author="Usuario"
                    tags={["tag1", "tag2"]}
                    data="Contenido del dibujo"
                />
            <div className="excalidraw-container">
                <div className="excalidraw-wrapper">
                    <Excalidraw />
                </div>
            </div>
        </QueryClientProvider>
        </div>
    );
};

export default ExcalidrawWrapper;

