'use client';

import { RoleImage } from '@/components/role-image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ROLES } from '@/constants';
import type { UserApplies } from '@/lib/queries';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { MouseEvent } from 'react';

export function UserRequestCard({
  id,
  name,
  message,
  role,
  createdAt,
}: Partial<UserApplies>) {
  const roleName = ROLES[Number(role) as keyof typeof ROLES];

  const handleButtonClick = (
    e: MouseEvent<HTMLButtonElement>,
    callback: () => void
  ) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(id);
    callback();
  };

  return (
    <Link href={`/user/${name}`} prefetch>
      <Card
        className={cn(
          'relative w-full cursor-pointer overflow-hidden transition-all duration-200',
          'gap-5 rounded-none border-0 bg-background p-0',
          'hover:bg-muted-foreground/5 dark:hover:bg-foreground/5'
        )}
      >
        <CardHeader className="flex items-center gap-2.5 pt-5">
          <div className="flex flex-col items-start">
            <Button
              variant="link"
              size="sm"
              className="pl-1 text-card-foreground text-lg"
            >
              {name}
            </Button>
            <p className="text-muted-foreground text-sm sm:absolute sm:top-3 sm:right-6">
              {createdAt}
            </p>
          </div>
        </CardHeader>

        <CardContent className="ml-1">
          <p className="text-base text-foreground">{message}</p>
        </CardContent>

        <CardFooter className="w-full flex-col items-start justify-between gap-4 pt-0 pb-5 sm:flex-row">
          <div className="flex w-fit items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
            <RoleImage variant={roleName} />
            <span className="text-card-foreground text-sm capitalize">
              {roleName.toLowerCase()}
            </span>
          </div>

          <Button
            variant="outline"
            className="h-12.5 w-full shrink gap-1 rounded-lg bg-transparent shadow-none hover:border-destructive active:border-destructive sm:w-28 dark:bg-transparent dark:hover:border-destructive"
            onClick={(e) => handleButtonClick(e, () => console.log('Reject'))}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
