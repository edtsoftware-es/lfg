'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { signInAction } from '@/lib/actions/auth';
import type { ActionState } from '@/lib/middleware';
import { useActionState } from 'react';

export function LoginForm() {
  const [signInState, signInFormAction, signInPending] = useActionState<
    ActionState,
    FormData
  >(signInAction, { error: '' });

  return (
    <form
      action={signInFormAction}
      className="flex flex-col items-center justify-center gap-4"
    >
      <Input
        id="username"
        name="username"
        aria-label="Username"
        type="text"
        required
        maxLength={30}
        placeholder="Username"
      />
      <Input
        id="password"
        name="password"
        aria-label="Password"
        type="password"
        required
        maxLength={100}
        placeholder="Password"
      />
      <Button type="submit" disabled={signInPending}>
        Login
      </Button>
      {signInState?.error && <div>{signInState.error}</div>}
    </form>
  );
}
