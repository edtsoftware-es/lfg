import { RequestActionButtons } from '@/components/request-action-buttons';
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
import { getGroupApplies } from '@/lib/queries';
import type { GroupApplies } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import type { PageProps } from '../../../../../.next/types/app/group/[id]/requests/page';

export default async function GroupRequests({ params }: PageProps) {
  const { id } = await params;
  const applies = await getGroupApplies(id);

  if (applies.length === 0) {
    return (
      <div className="px-6 py-10">
        <h2 className="bg-clip-text font-bold text-2xl text-foreground">
          There are no applies yet
        </h2>
      </div>
    );
  }

  return (
    <>
      {applies.map((apply, index) => (
        <div key={index}>
          <RequestCard {...apply} />
          <Separator />
        </div>
      ))}
    </>
  );
}

export function RequestCard({
  createdAt,
  message,
  role,
  userName,
}: Partial<GroupApplies>) {
  const roleName = ROLES[Number(role) as keyof typeof ROLES];

  return (
    <Link href={`/user/${userName}`} prefetch>
      <Card
        className={cn(
          'relative w-full cursor-pointer overflow-hidden transition-all duration-200',
          'gap-5 rounded-none border-0 bg-background p-0',
          'hover:bg-muted-foreground/5 dark:hover:bg-foreground/5'
        )}
      >
        <CardHeader className="flex items-center gap-2.5 pt-5">
          <Avatar className="size-12">
            <AvatarImage src={'https://github.com/shadcn.png'} alt={userName} />
            <AvatarFallback>{userName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <Button
              variant="link"
              size="sm"
              className="p-0 text-card-foreground text-lg"
            >
              {userName}
            </Button>
            <p className="text-muted-foreground text-sm sm:absolute sm:top-3 sm:right-6">
              {createdAt}
            </p>
          </div>
        </CardHeader>

        <CardContent className="ml-1">
          <p className="text-base text-foreground">{message}</p>
        </CardContent>

        <CardFooter className="pt-0 pb-5">
          <div className="grid w-full grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-x-1 gap-y-2 sm:grid-rows-1 sm:gap-x-4">
            <div className="col-start-1 row-start-1 flex w-fit items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
              <RoleImage variant={'FRONTEND'} />
              <span className="text-card-foreground text-sm capitalize">
                {roleName.toLowerCase()}
              </span>
            </div>

            <Button
              variant="link"
              size="sm"
              className="col-start-3 row-start-1 h-full gap-2 justify-self-end px-0 text-card-foreground text-sm has-[>svg]:px-0"
            >
              <Eye className="size-4" /> View profile
            </Button>

            {true && (
              <div className="col-span-3 row-start-2 flex gap-2 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:justify-end">
                <RequestActionButtons />
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
