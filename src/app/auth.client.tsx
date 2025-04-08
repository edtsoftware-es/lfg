'use client';

import { Input } from '@/components/ui/input';
import type { ActionState } from '@/lib/middleware';
import { useActionState } from 'react';
import { signInAction } from './actions';

export function LoginForm() {
  const [signInState, signInFormAction, signInPending] = useActionState<
    ActionState,
    FormData
  >(signInAction, { error: '' });

  return (
    <form action={signInFormAction}>
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
      <button type="submit" disabled={signInPending}>
        Login
      </button>
      {signInState?.error && <div>{signInState.error}</div>}
    </form>
  );
}
