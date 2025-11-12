"use client";
import { useState, useRef } from "react";
import { Excalidraw, convertToExcalidrawElements, exportToBlob } from "@excalidraw/excalidraw";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import "@excalidraw/excalidraw/index.css";
import { SaveButton } from "./SaveButton";
import { useUser } from "@/context/UserContext";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";

const queryClient = new QueryClient();

const ExcalidrawWrapper: React.FC = () => {
    const { userName } = useUser();
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);
    const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);

    console.info(convertToExcalidrawElements([{
        type: "rectangle",
        id: "rect-1",
        x: 0,
        y: 0,
        width: 186.47265625,
        height: 141.9765625,
    },]));

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTag();
        }
    };

    const exportDrawing = async (): Promise<string> => {
        const api = excalidrawAPI || excalidrawRef.current;

        if (!api) {
            throw new Error('El editor de dibujo no está listo. Por favor espera unos segundos.');
        }

        const elements = api.getSceneElements();
        const appState = api.getAppState();
        const files = api.getFiles();

        const blob = await exportToBlob({
            elements,
            appState,
            files,
            mimeType: 'image/png',
        });

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    return (
        <div>
        <QueryClientProvider client={queryClient}>
            <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Agregar tag (mínimo 5, máximo 20)"
                        style={{
                            padding: '8px',
                            marginRight: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '250px'
                        }}
                    />
                    <button
                        onClick={handleAddTag}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Agregar Tag
                    </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                padding: '4px 8px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            {tag}
                            <button
                                onClick={() => handleRemoveTag(tag)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    padding: '0 4px',
                                    fontSize: '16px'
                                }}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>

                <div style={{ fontSize: '14px', color: tags.length >= 5 && tags.length <= 20 ? '#4CAF50' : '#f44336' }}>
                    Tags: {tags.length} / 5-20 requeridos
                </div>
            </div>

            <SaveButton
                author={userName}
                tags={tags}
                exportDrawing={exportDrawing}
            />

            <div className="excalidraw-container">
                <div className="excalidraw-wrapper">
                    <Excalidraw
                        ref={excalidrawRef}
                        excalidrawAPI={(api) => setExcalidrawAPI(api)}
                    />
                </div>
            </div>
        </QueryClientProvider>
        </div>
    );
};

export default ExcalidrawWrapper;

