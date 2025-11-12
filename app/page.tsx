// /app/page.tsx
'use client'; 
import Image from "next/image";
import Link from "next/link";
import { useUser } from '../context/UserContext'; // Importar el hook de contexto

export default function Home() {
  const { userName } = useUser();
  const greeting = userName ? `¡Hola, ${userName}!` : '¡Bienvenido/a!';
  const subtitle = userName 
    ? 'Me gusta el arte, todo tipo de arte.'
    : 'Ingresa tu nombre en el encabezado para firmar tus dibujos.';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
        padding: '0 20px',
        marginTop: '-15px',
        backgroundColor: 'var(--color-background-primary)',
        color: 'var(--color-text-primary)',
        minHeight: 'calc(100vh - 120px)'
      }}
    >
      
      {/* SECCIÓN PRINCIPAL DE BIENVENIDA */}
      {/* AJUSTE CLAVE 1: Reducir el margen inferior de <main> a 0 */}
      <main style={{ maxWidth: '800px', width: '100%', marginBottom: '0px' }}> 
        
        {/* Título y Subtítulo */}
        <h1 style={{ 
          fontSize: '2.55em', 
          fontWeight: 700, 
          color: 'var(--color-accent)', 
          margin: '10px 0 5px 0' 
        }}>
          {greeting}
        </h1>
        <p style={{ 
          fontSize: '1.1em', 
          color: 'var(--color-text-secondary)', 
          marginBottom: '10px' // Reducido a 10px
        }}>
          {subtitle}
        </p>

        {/* IMAGEN DESTACADA */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '274px',
          height: '154px',
          // AJUSTE CLAVE 2: Reducir el margen inferior de la imagen a 5px
          margin: '0 auto 5px auto', 
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)'
        }}>
          <Image
            src="/hq720.jpg" 
            alt="Ilustración de bienvenida a la aplicación de dibujos"
            fill 
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </main>

      {/* SECCIÓN DE NAVEGACIÓN RÁPIDA (CALL TO ACTION) */}
      <section>
        <h2 style={{ 
          fontSize: '1.8em', 
          color: 'var(--color-text-primary)',
          // AJUSTE CLAVE 3: Reducir el margen inferior del título "Qué quieres hacer hoy" a 5px
          marginBottom: '5px' 
        }}>
          ¿Qué quieres hacer hoy?
        </h2>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}> 
          
          {/* Tarjeta Pizarra (se mantienen los estilos) */}
          <Link href="/new" style={{...linkCardStyle, padding: '15px'}}>
            <span style={{ fontSize: '2em' }}>✏️</span>
            <h3 style={linkTitleStyle}>Empezar a Dibujar</h3>
            <p style={linkDescriptionStyle}>Ve a la pizarra para crear una nueva obra.</p>
          </Link>

          {/* Tarjeta Lista de Dibujos (se mantienen los estilos) */}
          <Link href="/drawings" style={{...linkCardStyle, padding: '15px'}}>
            <span style={{ fontSize: '2em' }}>📋</span>
            <h3 style={linkTitleStyle}>Ver Mis Obras</h3>
            <p style={linkDescriptionStyle}>Revisa, edita o comparte tus dibujos guardados.</p>
          </Link>
        </div>
      </section>

    </div>
  );
}

// ... Los estilos de linkCardStyle, linkTitleStyle y linkDescriptionStyle permanecen iguales ...
const linkCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '15px',
  borderRadius: '12px',
  textDecoration: 'none',
  textAlign: 'center',
  backgroundColor: 'var(--color-background-secondary)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-primary)',
  maxWidth: '300px',
  transition: 'transform 0.3s, border-color 0.3s',
};

const linkTitleStyle = {
  fontSize: '1.2em',
  margin: '6px 0 3px 0',
  color: 'var(--color-accent)',
};

const linkDescriptionStyle = {
  fontSize: '0.9em',
  color: 'var(--color-text-secondary)',
  margin: 0,
};