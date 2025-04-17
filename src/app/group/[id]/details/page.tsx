import { GroupStatus } from "@/components/group-status";
import { RoleList } from "@/components/role-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getGroupById,
  getGroupCommennts,
  preloadGroupComments,
} from "@/lib/queries";
import { getSession } from "@/lib/session";
import { Clock, Crown, Globe, Target } from "lucide-react";
import { Suspense } from "react";
import type { PageProps } from "../../../../../.next/types/app/group/[id]/details/page";
import { NewMessageForm } from "./ui/new-message-form";

export default async function GroupDetails({ params }: PageProps) {
  const { id } = await params;

  preloadGroupComments(+id);

  const [session, group] = await Promise.all([getSession(), getGroupById(+id)]);
  const groupCommentsPromise = getGroupCommennts(+id);

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

        <Suspense fallback={<CommentsSkeleton />}>
          <NewMessageForm
            groupId={group.id}
            ownerName={group.ownerName}
            userName={session?.user.userName}
            groupCommentsPromise={groupCommentsPromise}
          />
        </Suspense>
      </div>
    </>
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
