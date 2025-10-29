// /components/Header.tsx
'use client'; 
import React, { useState } from 'react'; 
import Image from 'next/image'; // ¡Importar Image aquí para el logo!
import Link from 'next/link';
import Navbar from './Navbar';
import { useUser } from '../context/UserContext'; 

// ----------------------------------------------------
// Componente UserNameInput integrado aquí para simplificar
function UserNameInput() {
  const { userName, setUserName, isConfirmed, setIsConfirmed } = useUser();
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value); 
  };

  const handleConfirm = () => {
    if (userName.trim()) {
      setIsConfirmed(true);
    }
  };

  return (
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
      
      {/* 1. Etiqueta */}
      <label htmlFor="userName" style={{ color: 'var(--color-text-secondary)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
        Nombre:
      </label>
      
      {/* 2. Campo de Texto */}
      <input
        id="userName"
        type="text"
        value={userName} 
        onChange={handleInputChange}
        placeholder="Tu nombre"
        style={{ 
          padding: '8px 12px', 
          borderRadius: '6px', 
          border: `1px solid ${isConfirmed ? 'green' : 'var(--color-border)'}`, 
          backgroundColor: 'var(--color-background-primary)', 
          color: 'var(--color-text-primary)', 
          transition: 'border-color 0.3s',
          width: '150px', 
          flexGrow: 0, 
        }}
      />
      
      {/* 3. Botón y Confirmación */}
      {userName.trim() ? (
        isConfirmed ? (
          <span style={{ fontSize: '1.5em', color: 'green', display: 'inline-flex', alignItems: 'center', marginLeft: '-5px' }}>
            ✅
          </span>
        ) : (
          <button
            onClick={handleConfirm}
            style={{
              padding: '8px 15px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-background-primary)', 
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
            }}
            title="Confirmar Nombre"
          >
            Confirmar
          </button>
        )
      ) : null}
      
      {/* 4. Mensaje de Bienvenida Ajustado (solo si está confirmado) */}
      {isConfirmed && userName.trim() && (
        <p style={{ margin: '0', fontSize: '1.1em', color: 'var(--color-text-primary)', marginLeft: '10px', fontWeight: 'normal' }}>
          {userName} 👋
        </p>
      )}
    </div>
  );
}
// ----------------------------------------------------


export default function Header() {
  return (
    <header style={{
      backgroundColor: 'var(--color-background-secondary)',
      padding: '15px 30px',
      borderBottom: '1px solid var(--color-border)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      
      <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '15px' 
      }}>
        {/* Título de la App MODIFICADO */}
        <h1 style={{ 
          margin: 0, 
          fontSize: '1.5em', 
          color: 'var(--color-accent)',
          display: 'flex',
          alignItems: 'center', // Para alinear la imagen y el texto verticalmente
          gap: '8px' // Espacio entre la imagen y el texto
        }}>
          {/* USANDO EL COMPONENTE NEXT/IMAGE */}
          <Image
            src="/logo.png" // Ruta pública del archivo
            alt="Logo de App de Dibujos"
            width={40} // Define el ancho deseado para el logo en el header
            height={60} // Define la altura deseada
          />
          App de Dibujos
        </h1>
        
        <div style={{ 
            flexGrow: 1, 
            display: 'flex', 
            justifyContent: 'center', 
            marginLeft: '20px', 
            marginRight: '20px' 
        }}>
            <UserNameInput />
        </div>

        <div style={{ width: '150px' }}></div> 
      </div>
      
      <Navbar />
    </header>
  );
}