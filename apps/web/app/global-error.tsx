'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="grid min-h-screen place-items-center bg-background p-6 text-foreground">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Application Error</h2>
          <p className="text-sm text-muted-foreground">{error?.message || 'An unexpected error occurred.'}</p>
          <button
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
