'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  ChevronRight,
  Clock,
  Code,
  Cpu,
  Crown,
  Globe,
  Layout,
  Palette,
  Smartphone,
  Target,
  Users,
} from 'lucide-react';
import Link from 'next/link';

type Language = 'Spanish' | 'English' | 'French' | 'Deutsche' | 'Chinese';
type StudyTarget = 'Startup' | 'Job' | 'Learning' | 'Others';
type Schedule = 'Mornings' | 'Afternoon' | 'Weekends' | 'Nights' | 'Any';
type GroupState = 'OPEN' | 'ONGOING' | 'CLOSED' | 'REBUILD' | 'DONE';
type Role =
  | 'FRONTEND'
  | 'BACKEND'
  | 'PM'
  | 'DESIGNER'
  | 'DEVOPS'
  | 'FULLSTACK'
  | 'MOBILE';

type RoleNeeded = {
  role: Role;
  filled: number;
  total: number;
};

type GroupCardProps = {
  id: string;
  name: string;
  state: GroupState;
  language: Language;
  schedule: Schedule;
  target: StudyTarget;
  rolesNeeded: RoleNeeded[];
  leader: {
    name: string;
    avatar: string;
  };
};

const roleConfig: Record<Role, { icon: React.ReactNode; color: string }> = {
  FRONTEND: {
    icon: <Layout className="h-4 w-4" />,
    color: 'from-pink-500 to-purple-500',
  },
  BACKEND: {
    icon: <Cpu className="h-4 w-4" />,
    color: 'from-blue-500 to-cyan-500',
  },
  PM: {
    icon: <Briefcase className="h-4 w-4" />,
    color: 'from-amber-500 to-orange-500',
  },
  DESIGNER: {
    icon: <Palette className="h-4 w-4" />,
    color: 'from-rose-500 to-pink-500',
  },
  DEVOPS: {
    icon: <Code className="h-4 w-4" />,
    color: 'from-indigo-500 to-blue-500',
  },
  FULLSTACK: {
    icon: <Users className="h-4 w-4" />,
    color: 'from-emerald-500 to-teal-500',
  },
  MOBILE: {
    icon: <Smartphone className="h-4 w-4" />,
    color: 'from-lime-500 to-emerald-500',
  },
};

const stateConfig: Record<
  GroupState,
  { color: string; bgColor: string; bgGradientColor: string }
> = {
  OPEN: {
    color: 'text-emerald-300',
    bgColor: 'bg-gradient-to-r from-card to-emerald-600',
    bgGradientColor: 'bg-gradient-to-r from-emerald-600 to-green-600',
  },
  ONGOING: {
    color: 'text-blue-300',
    bgColor: 'bg-gradient-to-r from-card to-blue-600',
    bgGradientColor: 'bg-gradient-to-r from-blue-600 to-cyan-600',
  },
  CLOSED: {
    color: 'text-red-300',
    bgColor: 'bg-gradient-to-r from-card to-red-600',
    bgGradientColor: 'bg-gradient-to-r from-red-600 to-rose-600',
  },
  REBUILD: {
    color: 'text-amber-300',
    bgColor: 'bg-gradient-to-r from-card to-amber-600',
    bgGradientColor: 'bg-gradient-to-r from-amber-600 to-orange-600',
  },
  DONE: {
    color: 'text-purple-300',
    bgColor: 'bg-gradient-to-r from-card to-purple-600',
    bgGradientColor: 'bg-gradient-to-r from-purple-600 to-fuchsia-600',
  },
};

export function GroupCard({
  id,
  name,
  state,
  language,
  schedule,
  target,
  rolesNeeded,
  leader,
}: GroupCardProps) {
  const stateStyle = stateConfig[state];

  return (
    <Link href={`/groups/${id}`} passHref>
      <Card
        className={cn(
          'relative w-full cursor-pointer overflow-hidden transition-all duration-300',
          'gap-4 rounded-md bg-card p-0',
          'hover:bg-muted-foreground/10'
        )}
      >
        <div className="absolute top-0 right-0 flex w-full justify-end">
          <div className={`h-1 w-3/4 ${stateStyle.bgColor}`} />
          <Badge
            className={`${stateStyle.bgGradientColor} rounded-none rounded-bl-md border-0 px-3 font-extrabold text-white`}
          >
            {state}
          </Badge>
        </div>

        <CardHeader className="gap-3 pt-6">
          <h3 className="bg-clip-text pl-2 font-bold text-foreground text-lg">
            {name}
          </h3>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-foreground capitalize"
            >
              <Globe className="h-3 w-3 text-foreground" />
              {language}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-foreground"
            >
              <Clock className="h-3 w-3 text-foreground" />
              {schedule}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-foreground"
            >
              <Target className="h-3 w-3 text-foreground" />
              {target}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] gap-1.5">
            {rolesNeeded.map((role, index) => {
              const { icon, color } = roleConfig[role.role];
              const isFilled = role.filled === role.total;

              return (
                <div
                  key={index}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-2 py-1 transition-all',
                    'border border-card-800'
                  )}
                >
                  <div
                    className={`bg-gradient-to-br ${color} rounded-md p-1.5 text-white`}
                  >
                    {icon}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        'font-medium text-xs',
                        isFilled ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {role.filled}/{role.total}
                    </span>
                    <span className="text-foreground text-xs capitalize">
                      {role.role.toLowerCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="mt-0 flex items-center justify-between border-card-800/50 border-t py-3 [.border-t]:pt-3">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-8 w-8">
              <AvatarImage src={leader.avatar} alt={leader.name} />
              <AvatarFallback className="bg-gradient-to-br from-emerald-600 to-green-600 font-medium text-white">
                {leader.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <Button
                variant="link"
                size="sm"
                className="cursor-pointer p-0 text-foreground text-sm"
              >
                {leader.name}
              </Button>
              <Crown className="ml-1 h-4 w-4" color="#ffaa00" />
            </div>
          </div>
          <Button
            variant="link"
            size="sm"
            className="cursor-pointer text-foreground text-sm transition-colors hover:text-white"
          >
            See more <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
