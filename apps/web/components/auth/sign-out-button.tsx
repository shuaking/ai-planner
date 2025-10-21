"use client";

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

export function SignOutButton() {
  return (
    <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </Button>
  );
}
