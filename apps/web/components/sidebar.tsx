import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r bg-muted/30 p-4 md:block">
      <div className="space-y-2">
        <p className="px-2 text-xs font-medium text-muted-foreground">Navigation</p>
        <nav className="grid gap-1">
          <Link href="/" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" /> Home
          </Link>
          <Link href="/about" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-foreground" /> About
          </Link>
        </nav>
      </div>
    </aside>
  );
}
