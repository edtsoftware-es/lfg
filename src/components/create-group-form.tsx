'use client';

import { useState, useEffect } from 'react';
import { useActionState } from 'react';
import {
  Rocket,
  Book,
  Briefcase,
  Lightbulb,
  Globe,
  Calendar,
  Code,
  Palette,
  Server,
  Cpu,
  BarChart,
  Layers,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createGroup, type FormState } from '@/lib/actions/create-group';

const targetOptions = [
  {
    value: 'STARTUP',
    label: 'Startup',
    icon: <Rocket className="mr-2 h-4 w-4" />,
  },
  { value: 'JOB', label: 'Job', icon: <Briefcase className="mr-2 h-4 w-4" /> },
  {
    value: 'LEARNING',
    label: 'Learning',
    icon: <Book className="mr-2 h-4 w-4" />,
  },
  {
    value: 'OTHERS',
    label: 'Others',
    icon: <Lightbulb className="mr-2 h-4 w-4" />,
  },
];

const languageOptions = [
  { value: 'SPANISH', label: 'Spanish' },
  { value: 'ENGLISH', label: 'English' },
  { value: 'FRENCH', label: 'French' },
  { value: 'DEUTSCHE', label: 'German' },
  { value: 'CHINESE', label: 'Chinese' },
];

const scheduleOptions = [
  { value: 'MORNINGS', label: 'Mornings' },
  { value: 'AFTERNOON', label: 'Afternoon' },
  { value: 'WEEKENDS', label: 'Weekends' },
  { value: 'NIGHTS', label: 'Nights' },
  { value: 'ANY', label: 'Any time' },
];

const roleOptions = [
  {
    id: 'frontend',
    label: 'Frontend Developer',
    icon: <Code className="h-5 w-5" />,
  },
  {
    id: 'backend',
    label: 'Backend Developer',
    icon: <Server className="h-5 w-5" />,
  },
  {
    id: 'designer',
    label: 'UI/UX Designer',
    icon: <Palette className="h-5 w-5" />,
  },
  { id: 'devops', label: 'DevOps Engineer', icon: <Cpu className="h-5 w-5" /> },
  {
    id: 'marketing',
    label: 'Marketing Specialist',
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    id: 'product',
    label: 'Product Manager',
    icon: <Layers className="h-5 w-5" />,
  },
];

const initialState: FormState = {
  errors: {},
  message: '',
};

export function CreateGroupForm() {
  const [state, formAction, isPending] = useActionState(
    createGroup,
    initialState
  );
  const [roles, setRoles] = useState([
    { id: 'frontend', count: 1 },
    { id: 'backend', count: 1 },
    { id: 'designer', count: 0 },
    { id: 'product', count: 0 },
    { id: 'devops', count: 0 },
    { id: 'marketing', count: 0 },
  ]);
  const [creatorRole, setCreatorRole] = useState('');

  const totalRoles = roles.reduce((acc, role) => acc + role.count, 0);
  const availableRoles = roles
    .filter((role) => role.count > 0)
    .map((role) => role.id);

  // Update creator role if the selected role is no longer available
  useEffect(() => {
    if (creatorRole && !availableRoles.includes(creatorRole)) {
      setCreatorRole('');
    }
  }, [availableRoles, creatorRole]);

  // Function to update role count
  const updateRoleCount = (roleId: string, increment: number) => {
    setRoles((prevRoles) =>
      prevRoles.map((role) => {
        if (role.id === roleId) {
          const newCount = Math.max(0, Math.min(5, role.count + increment));
          return { ...role, count: newCount };
        }
        return role;
      })
    );
  };

  return (
    <form action={formAction} className="space-y-8">
      {/* Hidden input to store roles data */}
      <input type="hidden" name="roles" value={JSON.stringify(roles)} />

      <Card className="border-border/40">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Group Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter a catchy name for your group"
                aria-describedby="name-error"
                className="bg-card/50"
              />
              {state.errors?.name && (
                <p id="name-error" className="text-destructive text-sm">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="What is your group about? What are you planning to build?"
                className="min-h-[100px] bg-card/50"
                aria-describedby="description-error"
              />
              {state.errors?.description && (
                <p id="description-error" className="text-destructive text-sm">
                  {state.errors.description[0]}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="mb-4 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              <h3 className="font-medium text-lg">Group Details</h3>
            </div>

            <div className="space-y-3">
              <Label>What's your goal?</Label>
              <RadioGroup
                defaultValue="LEARNING"
                name="target"
                className="grid grid-cols-2 gap-4"
              >
                {targetOptions.map((option) => (
                  <div key={option.value} className="flex">
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex w-full flex-col items-center justify-between rounded-md border-2 border-muted bg-card/50 p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="mb-2 flex items-center justify-center">
                        {option.icon}
                      </div>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {state.errors?.target && (
                <p className="text-destructive text-sm">
                  {state.errors.target[0]}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  Language
                </Label>
                <RadioGroup
                  defaultValue="ENGLISH"
                  name="language"
                  className="flex flex-col space-y-1"
                >
                  {languageOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`language-${option.value}`}
                      />
                      <Label
                        htmlFor={`language-${option.value}`}
                        className="font-normal"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {state.errors?.language && (
                  <p className="text-destructive text-sm">
                    {state.errors.language[0]}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Preferred Schedule
                </Label>
                <RadioGroup
                  defaultValue="ANY"
                  name="schedule"
                  className="flex flex-col space-y-1"
                >
                  {scheduleOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`schedule-${option.value}`}
                      />
                      <Label
                        htmlFor={`schedule-${option.value}`}
                        className="font-normal"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                {state.errors?.schedule && (
                  <p className="text-destructive text-sm">
                    {state.errors.schedule[0]}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/40">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-lg">Team Roles</h3>
              </div>
              <div className="font-medium text-sm">
                <span
                  className={
                    totalRoles < 2 || totalRoles > 8
                      ? 'text-destructive'
                      : 'text-primary'
                  }
                >
                  {totalRoles}
                </span>{' '}
                / 8 roles selected
              </div>
            </div>

            <p className="text-muted-foreground text-sm">
              Select between 2 and 8 roles for your team. Don't forget to choose
              your own role!
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {roleOptions.map((role) => {
                const currentRole = roles.find((r) => r.id === role.id);
                const count = currentRole ? currentRole.count : 0;
                const maxReached = totalRoles >= 8;

                return (
                  <div
                    key={role.id}
                    className="flex items-center justify-between rounded-lg border border-border/40 bg-card/50 p-4 text-card-foreground shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {role.icon}
                      </div>
                      <div>
                        <p className="font-medium">{role.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateRoleCount(role.id, -1)}
                        disabled={count === 0}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center font-medium">
                        {count}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateRoleCount(role.id, 1)}
                        disabled={count === 5 || (maxReached && count === 0)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            {state.errors?.roles && (
              <p className="text-destructive text-sm">
                {state.errors.roles[0]}
              </p>
            )}

            {availableRoles.length > 0 && (
              <div className="space-y-3">
                <Label>Your Role</Label>
                <RadioGroup
                  value={creatorRole}
                  onValueChange={setCreatorRole}
                  name="creatorRole"
                  className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                >
                  {availableRoles.map((roleId) => {
                    const role = roleOptions.find((r) => r.id === roleId);
                    return (
                      <div key={roleId} className="flex">
                        <RadioGroupItem
                          value={roleId}
                          id={`creator-${roleId}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`creator-${roleId}`}
                          className="flex w-full items-center justify-center rounded-md border-2 border-muted bg-card/50 p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          {role
                            ? role.label.split(' ')[0]
                            : roleId.charAt(0).toUpperCase() + roleId.slice(1)}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
                {state.errors?.creatorRole && (
                  <p className="text-destructive text-sm">
                    {state.errors.creatorRole[0]}
                  </p>
                )}
              </div>
            )}

            {state.errors?._form && (
              <p className="text-destructive text-sm">
                {state.errors._form[0]}
              </p>
            )}

            {state.message && state.success && (
              <p className="text-green-500 text-sm">{state.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" type="button">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            isPending || totalRoles < 2 || totalRoles > 8 || !creatorRole
          }
        >
          {isPending ? 'Creating...' : 'Create Group'}
        </Button>
      </div>
    </form>
  );
}
