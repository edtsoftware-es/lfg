'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { registerAction } from '@/lib/actions/auth';
import type { ActionState } from '@/lib/middleware';
import type { Role } from '@/lib/queries';
import { useActionState } from 'react';

export function RegisterForm({
  roles,
}: {
  roles: Role[];
}) {
  const [signInState, registerFormAction, signInPending] = useActionState<
    ActionState,
    FormData
  >(registerAction, { error: '', payload: {} });

  return (
    <form
      action={registerFormAction}
      className="flex flex-col items-center justify-center gap-4 w-full"
    >
      <div className="w-full space-y-4">
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
      </div>
      <div className="w-full">
        <Label className="text-sm text-muted-foreground mb-2 block">Select your role</Label>
        <RadioGroup name="role" className="grid grid-cols-2 gap-2">
          {roles?.map((role) => (
            <div key={role.id} className="flex items-center space-x-2">
              <RadioGroupItem value={role.id.toString()} id={`role-${role.id}`} />
              <Label htmlFor={`role-${role.id}`} className="text-sm">{role.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Button type="submit" disabled={signInPending} className="w-full">
        Register
      </Button>
      {signInState?.error && <div className="text-sm text-destructive">{signInState.error}</div>}
    </form>
  );
}
