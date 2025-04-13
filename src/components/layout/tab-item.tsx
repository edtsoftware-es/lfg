'use client';

import Link, { type LinkProps } from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type React from 'react';

export function TabItem({
  className,
  href,
  children,
  ...props
}: React.ComponentProps<typeof Button> & LinkProps) {
  const pathname = usePathname();

  return (
    <Button
      variant="ghost"
      className={cn(
        'relative size-full shrink rounded-none px-2 py-1 text-muted-foreground text-xl hover:bg-transparent dark:hover:bg-transparent',
        pathname === href && 'text-foreground'
      )}
      asChild
      {...props}
    >
      <Link href={href}>
        {children}
        {pathname === href && (
          <div className="absolute bottom-0 h-1 w-full bg-primary" />
        )}
      </Link>
    </Button>
  );
}
