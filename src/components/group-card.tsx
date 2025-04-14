import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronRight, Clock, Crown, Globe, Target } from 'lucide-react';
import Link from 'next/link';
import { GroupStatusAbsolute } from './group-status';
import { RoleImage } from './role-image';
import { ROLES } from '@/constants';
import type { GroupWithRoles } from '@/lib/queries';

export function GroupCard({
  group,
}: {
  group: GroupWithRoles;
}) {
  const groupedRoles = Object.groupBy(group.groupRoles, ({ role }) => role);

  return (
    <Link href={`/groups/${group.id}/details`} prefetch>
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
              {group.language}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border px-2.5 py-1 text-card-foreground dark:border-input"
            >
              <Clock className="h-3 w-3 text-card-foreground" />
              {group.schedule}
            </Badge>
            <Badge
              variant="outline"
              className="flex items-center gap-1 border px-2.5 py-1 text-card-foreground dark:border-input"
            >
              <Target className="h-3 w-3 text-card-foreground" />
              {group.target}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-1.5">
            {Object.entries(groupedRoles).map(([roleId, roles = []], index) => {
              const roleName = ROLES[Number(roleId) as keyof typeof ROLES];
              const total = roles.length;
              const filled = roles.filter(
                (role) => role.userName !== null
              ).length;
              const isFilled = filled === total;

              return (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-lg border px-2 py-1 dark:border-input"
                >
                  <RoleImage variant={roleName} />
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        'font-medium text-xs',
                        isFilled ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {filled}/{total}
                    </span>
                    <span className="text-card-foreground text-xs capitalize">
                      {roleName.toLowerCase()}
                    </span>
                  </div>
                </div>
              );
            })}
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
          <Button
            variant="link"
            size="sm"
            className="gap-2 px-0 text-card-foreground text-sm has-[>svg]:px-0"
          >
            See more <ChevronRight className="size-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
