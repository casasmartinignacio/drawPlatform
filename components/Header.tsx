// /components/Header.tsx
'use client'; // Necesario para usar Hooks y Contexto
import Link from 'next/link';
import Navbar from './Navbar';
import { useUser } from '../context/UserContext'; // Importar el hook

// ----------------------------------------------------
// Componente UserNameInput integrado aquí para simplificar
function UserNameInput() {
  const { userName, setUserName } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="userName" style={{ marginRight: '10px', color: 'var(--color-text-secondary)', fontWeight: 'bold' }}>
        Nombre:
      </label>
      <input
        id="userName"
        type="text"
        value={userName}
        onChange={handleChange}
        placeholder="Tu nombre aquí"
        style={{ 
          padding: '8px 12px', 
          borderRadius: '6px', 
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-background-primary)', // Fondo oscuro
          color: 'var(--color-text-primary)', // Texto claro
          transition: 'border-color 0.3s'
        }}
      />
      {userName && (
        <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: 'var(--color-accent)' }}>
          ¡Hola, **{userName}**!
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
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5em', color: 'var(--color-accent)' }}>
           App de Dibujos
        </h1>
      </div>
      
      {/* Usamos el componente UserNameInput integrado */}
      <div style={{ marginTop: '10px' }}>
          <UserNameInput />
      </div>
      
      <Navbar />
    </header>
  );
}