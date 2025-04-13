'use client';

import Link, { type LinkProps } from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type React from 'react';

export function NavItem({
  className,
  href,
  children,
  ...props
}: React.ComponentProps<typeof Button> & LinkProps) {
  const pathname = usePathname();

  return (
    <Button
      variant={pathname === href ? 'secondary' : 'ghost'}
      className={cn(
        'size-14 items-center justify-center gap-0 rounded-full p-0 text-md has-[>svg]:px-0 lg:h-fit lg:w-full lg:justify-start lg:gap-2 lg:px-4 lg:py-3 lg:has-[>svg]:px-4',
        className
      )}
      asChild
      {...props}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
