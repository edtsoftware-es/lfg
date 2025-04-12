import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { roleConfig } from '@/constants';
import { cn } from '@/lib/utils';
import type { Language, RoleNeeded, Schedule, StudyTarget } from '@/types';
import { ChevronRight, Clock, Crown, Globe, Target } from 'lucide-react';
import Link from 'next/link';
import { type GroupStatus, GroupStatusAbsolute } from './group-status';

type GroupCardProps = {
  id: string;
  name: string;
  status: GroupStatus;
  language: Language;
  schedule: Schedule;
  target: StudyTarget;
  rolesNeeded: RoleNeeded[];
  leader: {
    name: string;
    avatar: string;
  };
};

export function GroupCard({
  id,
  name,
  status,
  language,
  schedule,
  target,
  rolesNeeded,
  leader,
}: GroupCardProps) {
  return (
    <Link href={`/groups/${id}`} prefetch>
      <Card
        className={cn(
          'group relative w-full cursor-pointer overflow-hidden transition-all duration-200',
          'gap-4 rounded-none border-0 bg-background p-0',
          'hover:bg-muted-foreground/5 dark:hover:bg-foreground/[2%]'
        )}
      >
        <GroupStatusAbsolute status={status} />

        <CardHeader className="gap-3 pt-5">
          <h3 className="pl-2 font-bold text-card-foreground text-lg">
            {name}
          </h3>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground"
            >
              <Globe className="h-3 w-3 text-card-foreground" />
              {language}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground"
            >
              <Clock className="h-3 w-3 text-card-foreground" />
              {schedule}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground"
            >
              <Target className="h-3 w-3 text-card-foreground" />
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
                        isFilled ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {role.filled}/{role.total}
                    </span>
                    <span className="text-card-foreground text-xs capitalize">
                      {role.role.toLowerCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="mt-0 flex items-center justify-between pt-1 pb-4">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-8">
              <AvatarImage src={leader.avatar} alt={leader.name} />
              <AvatarFallback>
                {leader.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <Button
                variant="link"
                size="sm"
                className="p-0 text-card-foreground text-sm"
              >
                {leader.name}
              </Button>
              <Crown className="ml-1 size-4" color="#ffaa00" />
            </div>
          </div>
          <Button
            variant="link"
            size="sm"
            className="gap-1 px-0 text-card-foreground text-sm has-[>svg]:px-0"
          >
            See more <ChevronRight className="ml-1 size-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
