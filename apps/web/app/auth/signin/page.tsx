'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '../../../components/ui/button';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus('loading');
    try {
      const res = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/dashboard',
      });
      if (res?.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
        setError(res?.error || 'Failed to send sign-in link.');
      }
    } catch (err) {
      setStatus('error');
      setError('An unexpected error occurred.');
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <p className="text-sm text-muted-foreground">
        Enter your email address and we will send you a magic link to sign in.
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" disabled={status === 'loading' || !email} className="w-full">
          {status === 'loading' ? 'Sending…' : 'Send magic link'}
        </Button>
      </form>
      {status === 'sent' && (
        <p className="text-sm text-green-600">Check your email for a sign-in link.</p>
      )}
      {status === 'error' && error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
