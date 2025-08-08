export function Footer() {
  return (
    <footer className="bg-secondary/50 py-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto px-6">
        <p>
          &copy; {new Date().getFullYear()} MoneyVision. Todos os direitos
          reservados.
        </p>
        <p className="mt-2">Feito com ❤️ para revolucionar suas finanças</p>
      </div>
    </footer>
  );
}
