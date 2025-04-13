'use client';

import { Button } from '@/components/ui/button';
import { BarChart, Code, Cpu, Layers, Palette, Server } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';

interface RoleSelectorProps {
  form: UseFormReturn<any>;
}

export function RoleSelector({ form }: RoleSelectorProps) {
  const roles = form.watch('roles');

  const roleIcons = {
    frontend: <Code className="h-5 w-5" />,
    backend: <Server className="h-5 w-5" />,
    designer: <Palette className="h-5 w-5" />,
    devops: <Cpu className="h-5 w-5" />,
    marketing: <BarChart className="h-5 w-5" />,
    product: <Layers className="h-5 w-5" />,
  };

  const roleLabels = {
    frontend: 'Frontend Developer',
    backend: 'Backend Developer',
    designer: 'UI/UX Designer',
    devops: 'DevOps Engineer',
    marketing: 'Marketing Specialist',
    product: 'Product Manager',
  };

  const updateRoleCount = (roleId: string, increment: number) => {
    const currentRoles = form.getValues('roles');
    const updatedRoles = currentRoles.map((role: any) => {
      if (role.id === roleId) {
        const newCount = Math.max(0, Math.min(5, role.count + increment));
        return { ...role, count: newCount };
      }
      return role;
    });
    form.setValue('roles', updatedRoles, { shouldValidate: true });
  };

  const totalRoles = roles.reduce(
    (acc: number, role: any) => acc + role.count,
    0
  );
  const maxReached = totalRoles >= 8;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {roles.map((role: unknown) => (
        <div
          key={role.id}
          className="flex items-center justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              {roleIcons[role.id as keyof typeof roleIcons]}
            </div>
            <div>
              <p className="font-medium">
                {roleLabels[role.id as keyof typeof roleLabels]}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateRoleCount(role.id, -1)}
              disabled={role.count === 0}
            >
              -
            </Button>
            <span className="w-6 text-center font-medium">{role.count}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateRoleCount(role.id, 1)}
              disabled={role.count === 5 || maxReached}
            >
              +
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
