'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { GroupWithRoles } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { ChevronRight, Clock, Crown, Globe, Target } from 'lucide-react';
import Link from 'next/link';
import { GroupStatusAbsolute } from './group-status';
import { RoleList } from './role-list';

export function GroupCard({
  group,
}: {
  group: GroupWithRoles;
}) {
  return (
    <Link href={`/group/${group.id}/details`} prefetch>
      <Card
        className={cn(
          'group relative w-full cursor-pointer overflow-hidden transition-all duration-200',
          'gap-4 rounded-none border-0 bg-background p-0',
          'hover:bg-muted-foreground/5 dark:hover:bg-foreground/5'
        )}
      >
        <GroupStatusAbsolute status={group.status} />

        <CardHeader className="gap-3 pt-5">
          <h3 className="pl-2 font-bold text-card-foreground text-lg">
            {group.name}
          </h3>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="flex items-center gap-1 border px-2.5 py-1 text-card-foreground dark:border-input"
            >
              <Globe className="h-3 w-3 text-card-foreground" />
              <span className="capitalize">{group.language.toLowerCase()}</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border px-2.5 py-1 text-card-foreground dark:border-input"
            >
              <Clock className="h-3 w-3 text-card-foreground" />
              <span className="capitalize">{group.schedule.toLowerCase()}</span>
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border px-2.5 py-1 text-card-foreground dark:border-input"
            >
              <Target className="h-3 w-3 text-card-foreground" />
              <span className="capitalize">{group.target.toLowerCase()}</span>
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-1.5">
            <RoleList group={group} />
          </div>
        </CardContent>

        <CardFooter className="mt-0 flex items-center justify-between pb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Crown className="ml-1 size-4" color="#ffaa00" />
              <Button
                variant="link"
                size="sm"
                className="p-0 font-semibold text-card-foreground text-sm"
              >
                {group.ownerName}
              </Button>
            </div>
          </div>
          <button
            type="button"
            className="gap-2 px-0 text-[18px] text-card-foreground has-[>svg]:px-0"
          >
            See more <ChevronRight className="size-4" />
          </button>
        </CardFooter>
      </Card>
    </Link>
  );
}
