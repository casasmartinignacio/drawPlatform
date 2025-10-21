// /context/UserContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define las interfaces de Tipado

// Para el valor que provee el contexto
interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
}

// Para las props del componente UserProvider
interface UserProviderProps {
  children: ReactNode; // 'ReactNode' es el tipo correcto para children
}

// 2. Crear el Contexto con un valor inicial tipado
const UserContext = createContext<UserContextType | undefined>(undefined);

// 3. Crear el Proveedor del Contexto (Solución al error 'children')
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState('');

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

// 4. Crear un Hook para usar el Contexto fácilmente
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};