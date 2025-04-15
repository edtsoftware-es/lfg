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
import { type GroupApplies, getGroupApplies } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';
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
          <ApplyItem {...apply} />
          <Separator />
        </div>
      ))}
    </>
  );
}

function ApplyItem({
  createdAt,
  message,
  role,
  userName,
}: Partial<GroupApplies>) {
  const roleName = ROLES[Number(role) as keyof typeof ROLES];

  return (
    <Card
      className={cn(
        'w-full overflow-hidden transition-all duration-200',
        'gap-5 rounded-none border-0 bg-background p-0'
      )}
    >
      <CardHeader className="flex flex-col justify-between gap-2 pt-5 md:flex-row md:items-center md:gap-4">
        <Link
          href={`/users/${userName}`}
          prefetch
          className="flex items-center gap-2.5"
        >
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
              type="button"
            >
              {userName}
            </Button>
          </div>
        </Link>
        <p className="text-muted-foreground text-sm">{createdAt}</p>
      </CardHeader>
      <CardContent className="ml-1">
        <p className="text-base text-foreground">{message}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2 pb-5">
        <div className="flex w-full flex-col items-start justify-between gap-2 sm:flex-row">
          <div className="flex w-fit items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
            <RoleImage variant={'FRONTEND'} />
            <span className="text-card-foreground text-sm capitalize">
              {roleName}
            </span>
          </div>

          {true && (
            <div className="flex w-full items-center justify-end gap-2 sm:w-fit">
              <Button
                variant="outline"
                className="z-20 h-12.5 w-full shrink gap-1 rounded-lg bg-transparent shadow-none hover:border-primary active:border-primary sm:w-28 dark:bg-transparent dark:hover:border-primary"
              >
                <Check className="size-4 text-primary" />
                Accept
              </Button>
              <Button
                variant="outline"
                className="h-12.5 w-full shrink gap-1 rounded-lg bg-transparent shadow-none hover:border-destructive active:border-destructive sm:w-28 dark:bg-transparent dark:hover:border-destructive"
              >
                <X className="size-4 text-destructive" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
