import { RoleImage } from '@/components/role-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ROLES } from '@/constants';
import {
  type GroupMemberInfo,
  getGroupMembers,
  getGroupMembersInfo,
} from '@/lib/queries';
import { cn } from '@/lib/utils';
import { ChevronRight, Crown } from 'lucide-react';
import Link from 'next/link';
import type { PageProps } from '../../../../../.next/types/app/group/[id]/members/page';

export default async function GroupMembers({ params }: PageProps) {
  const { id } = await params;

  const members = await getGroupMembers(id);
  const filteredMembers = members
    .map((m) => m.userName)
    .filter((m) => m !== null);

  const membersInfo = await getGroupMembersInfo(id, filteredMembers);

  return (
    <>
      {membersInfo.map((member, index) => (
        <div key={index}>
          <MemberItem
            bio={member.bio}
            icon={member.icon}
            userName={member.userName}
            role={member.role}
            userId={member.userId}
            name={member.name}
          />
          <Separator />
        </div>
      ))}
    </>
  );
}

function MemberItem({ bio, role, userName }: Partial<GroupMemberInfo>) {
  const roleName = ROLES[Number(role) as keyof typeof ROLES];

  return (
    <>
      <Link href={`/users/${userName}`} prefetch>
        <Card
          className={cn(
            'w-full cursor-pointer overflow-hidden transition-all duration-200',
            'gap-5 rounded-none border-0 bg-background p-0',
            'hover:bg-muted-foreground/5 dark:hover:bg-foreground/5'
          )}
        >
          <CardHeader className="flex flex-col justify-between pt-5 md:flex-row md:items-center md:gap-4">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-12">
                <AvatarImage
                  src={'https://github.com/shadcn.png'}
                  alt={'userName'}
                />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 text-card-foreground text-lg"
                >
                  {userName}
                </Button>
                <Crown className="size-4" color="#ffaa00" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="ml-1">
            <p className="text-base text-foreground">{bio}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between pb-5">
            <div className="flex items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
              <RoleImage variant={'FRONTEND'} />
              <span className="text-card-foreground text-sm capitalize">
                {roleName}
              </span>
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
    </>
  );
}
