'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">{error?.message || 'An unexpected error occurred.'}</p>
      <button
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
