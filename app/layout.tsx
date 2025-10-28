// /app/layout.tsx
import type { Metadata } from "next";
import "./globals.css"; // Usa el CSS modificado
import Header from '../components/Header';
import Footer from '../components/Footer';
// Importa el proveedor de contexto si lo estás usando
import { UserProvider } from '../context/UserContext'; 

export const metadata: Metadata = {
  title: "App de Dibujos - Tema Oscuro",
  description: "Layout moderno con tema oscuro y contexto de usuario.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <UserProvider> {/* Envuelve la app con el contexto */}
          <div className="app-container">
            <Header />

            {/* Contenido principal: Flex-grow 1 para ocupar espacio */}
            <main style={{ flexGrow: 1, padding: '30px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
              {children}
            </main>

            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}