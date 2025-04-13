import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { PageProps } from '../../../../../.next/types/app/groups/[id]/members/page';
import { Button } from '@/components/ui/button';
import { ChevronRight, Crown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { RoleImage } from '@/components/role-image';

export default async function GroupMembers({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index}>
          <Link href={'/users/johndoe'} prefetch>
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
                      userName
                    </Button>
                    <Crown className="size-4" color="#ffaa00" />
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">createdAt</p>
              </CardHeader>
              <CardContent className="ml-1">
                <p className="text-base text-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Libero neque excepturi odit, fugit fuga enim, quas tempora,
                  quisquam deleniti repudiandae nam.
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between pb-5">
                <div className="flex items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
                  <RoleImage variant={'FRONTEND'} />
                  <span className="text-card-foreground text-sm capitalize">
                    frontend
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
          <Separator />
        </div>
      ))}
    </>
  );
}
