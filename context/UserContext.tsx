// /context/UserContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// ... (Interfaces permanecen iguales) ...

interface UserContextType {
    userName: string;
    setUserName: (name: string) => void;
    isConfirmed: boolean;
    setIsConfirmed: (confirmed: boolean) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// CAMBIO CLAVE: Usamos claves para sessionStorage
const NAME_STORAGE_KEY = 'drawingAppUserName';
const CONFIRM_STORAGE_KEY = 'drawingAppIsConfirmed';


export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    
    const [userName, setUserName] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // 1. Carga de Persistencia (SOLO después de la hidratación y usando sessionStorage)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // CAMBIO CLAVE: Usar sessionStorage.getItem
            const storedName = sessionStorage.getItem(NAME_STORAGE_KEY) || '';
            const storedConfirmation = sessionStorage.getItem(CONFIRM_STORAGE_KEY) === 'true';
            
            setUserName(storedName);
            setIsConfirmed(storedConfirmation);
            setIsLoaded(true); 
        }
    }, []); 

    useEffect(() => {
        if (isLoaded) {
            sessionStorage.setItem(NAME_STORAGE_KEY, userName);
        }
    }, [userName, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            sessionStorage.setItem(CONFIRM_STORAGE_KEY, String(isConfirmed));
        }
    }, [isConfirmed, isLoaded]); 

    // 3. Función para establecer el nombre, desconfirmando si hay un cambio.
    const updateUserName = (name: string) => {
        if (name !== userName) {
            setIsConfirmed(false); 
        }
        setUserName(name);
    };
    
    return (
        <UserContext.Provider value={{ 
            userName, 
            setUserName: updateUserName, 
            isConfirmed, 
            setIsConfirmed 
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser debe ser usado dentro de un UserProvider');
    }
    return context;
};