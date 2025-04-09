'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Role } from '@/db/schema';
import { registerAction } from '@/lib/actions/auth';
import type { ActionState } from '@/lib/middleware';
import { useActionState } from 'react';

export function RegisterForm({ roles }: { roles: Role[] }) {
  const [signInState, registerFormAction, signInPending] = useActionState<
    ActionState,
    FormData
  >(registerAction, { error: '', payload: {} });

  return (
    <form
      action={registerFormAction}
      className="flex flex-col items-center justify-center gap-4"
    >
      <Input
        id="username"
        name="username"
        aria-label="Username"
        type="text"
        required
        maxLength={30}
        placeholder="Your Nickname"
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
      <RadioGroup name="role" className="flex">
        {roles?.map((role) => (
          <div key={role.id} className="flex items-center space-x-2">
            <RadioGroupItem value={role.id.toString()} />
            <Label htmlFor="option-one">{role.name}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button type="submit" disabled={signInPending}>
        Register
      </Button>
      {signInState?.error && <div>{signInState.error}</div>}
    </form>
  );
}
