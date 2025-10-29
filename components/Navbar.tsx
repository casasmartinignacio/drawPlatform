// /components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '20px' }}>
        <li>
          <Link href="/pizarra" className="nav-link">
             Pizarra
          </Link>
        </li>
        <li>
          <Link href="/lista-dibujos" className="nav-link">
             Lista de Dibujos
          </Link>
        </li>
      </ul>
    </nav>
  );
}