import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import type { PageProps } from '../../../../../.next/types/app/groups/[id]/requests/page';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight, Crown, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { RoleImage } from '@/components/role-image';

export default async function GroupRequests({ params }: PageProps) {
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
              <CardHeader className="flex flex-col justify-between gap-2 pt-5 md:flex-row md:items-center md:gap-4">
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
              <CardFooter className="flex items-center justify-between gap-2 pb-5">
                <div className="flex w-full flex-col items-start justify-between gap-2 sm:w-fit sm:flex-row">
                  <div className="flex w-fit items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
                    <RoleImage variant={'FRONTEND'} />
                    <span className="text-card-foreground text-sm capitalize">
                      frontend
                    </span>
                  </div>

                  {/* TODO: If user is admin, show the buttons */}
                  {true && (
                    <div className="flex w-full items-center gap-2 sm:w-fit">
                      <Button
                        variant="outline"
                        className="h-12.5 w-full shrink rounded-lg bg-transparent shadow-none hover:border-primary active:border-primary sm:w-fit dark:bg-transparent dark:hover:border-primary"
                      >
                        <Check className="size-4 text-primary" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="h-12.5 w-full shrink rounded-lg bg-transparent shadow-none hover:border-destructive active:border-destructive sm:w-fit dark:bg-transparent dark:hover:border-destructive"
                      >
                        <X className="size-4 text-destructive" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  variant="link"
                  size="sm"
                  className={cn(
                    'hidden w-fit gap-2 justify-self-end px-0 text-card-foreground text-sm has-[>svg]:px-0 sm:flex',
                    // TODO: If user is not admin, show the button
                    false && 'flex'
                  )}
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
