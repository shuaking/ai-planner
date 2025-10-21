import { Button } from '../components/ui/button';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <p className="text-sm text-muted-foreground">
        This is a Next.js App Router scaffold with Tailwind CSS and shadcn-style components.
      </p>
      <div className="flex items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  );
}
