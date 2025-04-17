import { RoleImage } from "@/components/role-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ROLES } from "@/constants";
import {
  type GroupMemberInfo,
  getGroupMembers,
  getGroupMembersInfo,
} from "@/lib/queries";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import type { PageProps } from "../../../../../.next/types/app/group/[id]/members/page";

export default async function GroupMembers({ params }: PageProps) {
  const { id } = await params;
  const membersInfo = await getGroupMembersInfo(id);

  return (
    <>
      {membersInfo.map((member, index) => (
        <div key={index}>
          <MemberCard {...member} />
          <Separator />
        </div>
      ))}
    </>
  );
}

function MemberCard({ bio, role, userName }: Partial<GroupMemberInfo>) {
  const roleName = ROLES[Number(role) as keyof typeof ROLES];

  return (
    <>
      <Link href={`/user/${userName}`} prefetch>
        <Card
          className={cn(
            "w-full cursor-pointer overflow-hidden transition-all duration-200",
            "gap-5 rounded-none border-0 bg-background p-0",
            "hover:bg-muted-foreground/5 dark:hover:bg-foreground/5"
          )}
        >
          <CardHeader className="flex flex-col justify-between pt-5 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-12">
                <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  alt={userName}
                />
                <AvatarFallback>{userName?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-card-foreground text-lg"
                >
                  {userName}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="ml-1">
            <p className="text-base text-foreground">{bio}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between gap-2 pb-5">
            <div className="flex items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
              <RoleImage variant={"FRONTEND"} />
              <span className="text-card-foreground text-sm capitalize">
                {roleName.toLowerCase()}
              </span>
            </div>

            <Button
              variant="link"
              size="sm"
              className="gap-2 px-0 text-card-foreground text-sm has-[>svg]:px-0"
            >
              <Eye className="size-4" /> View profile
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </>
  );
}
