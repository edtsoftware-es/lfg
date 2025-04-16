import { GroupStatus } from '@/components/group-status';
import { RoleList } from '@/components/role-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getGroupById, getGroupCommennts } from '@/lib/queries';
import { getSession } from '@/lib/session';
import { Clock, Crown, Globe, Target } from 'lucide-react';
import { Suspense } from 'react';
import type { PageProps } from '../../../../../.next/types/app/group/[id]/details/page';
import { NewMessageForm } from './ui/new-message-form';

export default async function GroupDetails({ params }: PageProps) {
  const { id } = await params;
  const [session, group] = await Promise.all([getSession(), getGroupById(+id)]);

  return (
    <>
      <div className="px-6 py-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
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
              {group.ownerName}
            </Button>
            <Crown className="size-5" color="#ffaa00" />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5">
          <Badge
            variant="outline"
            className="flex items-center gap-1 border px-2.5 py-1 text-card-foreground capitalize dark:border-input"
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

        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-1.5">
          <RoleList group={group} />
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
        <NewMessageForm groupId={id} userName={session?.user.userName} />
        <Suspense fallback={<CommentsSkeleton />}>
          <Comments
            groupId={group.id}
            ownerName={group.ownerName}
            userName={session?.user.userName}
          />
        </Suspense>
      </div>
    </>
  );
}

async function Comments({
  groupId,
  ownerName,
  userName,
}: { groupId: number; ownerName: string; userName: string | undefined }) {
  const groupComments = await getGroupCommennts(groupId);
  return (
    <div className="mt-6 space-y-4">
      {groupComments.map((comment, index) => (
        <Card key={index} className="bg-background">
          <CardHeader
            className={`flex flex-col justify-between md:flex-row md:items-center md:gap-4 ${comment.userName === userName && 'bg-red'}`}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                size="sm"
                className="p-0 font-bold text-base text-foreground"
              >
                {comment.userName}
              </Button>
              {comment.userName === ownerName && (
                <Crown className="size-5" color="#ffaa00" />
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              {comment.createdAt.toLocaleString()}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground">{comment.message}</p>
          </CardContent>
        </Card>
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
