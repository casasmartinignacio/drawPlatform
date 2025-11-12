export default function Footer() {
  return (
    <footer style={{
      padding: '15px 30px',
      borderTop: '1px solid var(--color-border)',
      textAlign: 'center',
      backgroundColor: 'var(--color-background-secondary)',
      color: 'var(--color-text-secondary)',
      fontSize: '0.9em'
    }}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} App de Dibujitos
      </p>
    </footer>
  );
}