import { GroupStatus } from '@/components/group-status';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getGroupById, getGroupCommennts } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Clock, Crown, Globe, SendIcon, Target } from 'lucide-react';
import type { PageProps } from '../../../../../.next/types/app/groups/[id]/details/page';
import { ROLES } from '@/constants';
import { RoleImage } from '@/components/role-image';
import { Suspense } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

async function Comments({
  id,
  owner_name,
}: { id: number; owner_name: string }) {
  const groupComments = await getGroupCommennts(id);

  return (
    <div className="mt-6 space-y-4">
      {groupComments.map((comment, index) => (
        <div
          key={index}
          className="space-y-4 rounded-lg border border-card-800 p-6"
        >
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-2 pl-1">
              <Button
                variant="link"
                size="sm"
                className="p-0 font-bold text-base text-foreground"
              >
                {comment.userName}
              </Button>
              {comment.userName === owner_name && (
                <Crown className="size-5" color="#ffaa00" />
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              {comment.createdAt.toLocaleString()}
            </p>
          </div>
          <p className="text-base text-foreground">{comment.message}</p>
        </div>
      ))}
    </div>
  );
}

function CommentsSkeleton() {
  return (
    <div className="mt-6 space-y-4">
      <Skeleton className="h-30 w-full rounded-lg" />
      <Skeleton className="h-30 w-full rounded-lg" />
      <Skeleton className="h-30 w-full rounded-lg" />
    </div>
  );
}

export default async function GroupDetails({ params }: PageProps) {
  const { id } = await params;
  const group = await getGroupById(+id);
  const groupedRoles = Object.groupBy(group.groupRoles, ({ role }) => role);

  return (
    <>
      <div className="px-6 py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <h2 className="bg-clip-text font-bold text-2xl text-foreground">
              {group.name}
            </h2>
            <GroupStatus status="OPEN" />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="link"
              size="sm"
              className="p-0 font-semibold text-foreground text-lg"
            >
              {group.owner_name}
            </Button>
            <Crown className="size-5" color="#ffaa00" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground capitalize"
          >
            <Globe className="h-3 w-3 text-card-foreground" />
            {group.language}
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground"
          >
            <Clock className="h-3 w-3 text-card-foreground" />
            {group.schedule}
          </Badge>
          <Badge
            variant="outline"
            className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground"
          >
            <Target className="h-3 w-3 text-card-foreground" />
            {group.target}
          </Badge>
        </div>

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-1.5">
          {Object.entries(groupedRoles).map(([roleId, roles = []], index) => {
            const roleName = ROLES[Number(roleId) as keyof typeof ROLES];
            const total = roles.length;
            const filled = roles.filter(
              (role) => role.user_name !== null
            ).length;
            const isFilled = filled === total;

            return (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2 py-1',
                  'border border-card-800'
                )}
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

        <div className="mt-10 space-y-4">
          <h3 className="font-bold text-lg">Description</h3>
          <p>{group.description}</p>
        </div>

        <div className="mt-10 space-y-4">
          <h3 className="font-bold text-lg">Requirements</h3>
          <p>{group.requirements}</p>
        </div>
      </div>
      <Separator />
      <div className="mb-5 px-6 py-10">
        <h3 className="font-bold text-lg">Comments</h3>

        <div className="mt-6 flex items-end gap-2 rounded-3xl bg-secondary p-3 transition-colors focus-within:bg-muted-foreground/15 dark:focus-within:bg-muted-foreground/25">
          <Textarea
            placeholder="What's on your mind?"
            className="max-h-64 min-h-9 w-full resize-none rounded-2xl border-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
          <Button size="icon" className="rounded-full">
            <SendIcon className="size-4" />
          </Button>
        </div>
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments id={group.id} owner_name={group.owner_name} />
        </Suspense>
      </div>
    </>
  );
}
