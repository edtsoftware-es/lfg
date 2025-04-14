'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type TabsProps = {
  tabs: {
    name: string;
    path: string;
  }[];
};

export function Tabs({ tabs }: TabsProps) {
  const pathname = usePathname();

  const [activeStyle, setActiveStyle] = useState({ left: '0px', width: '0px' });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = tabs.findIndex((tab) => tab.path === pathname);

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex !== -1 ? activeIndex : 0];
    if (activeElement) {
      setActiveStyle({
        left: `${activeElement.offsetLeft}px`,
        width: `${activeElement.offsetWidth}px`,
      });
    }
  }, [activeIndex]);

  return (
    <div className="h-16 w-full">
      <div
        className="absolute bottom-0 h-1 bg-primary transition-all duration-300 ease-out"
        style={activeStyle}
      />

      <div className="flex size-full items-center">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            variant="ghost"
            className={cn(
              'size-full shrink rounded-none px-2 py-1 text-muted-foreground text-xl hover:bg-transparent dark:hover:bg-transparent',
              pathname === tab.path && 'text-foreground'
            )}
            asChild
          >
            <Link href={tab.path} prefetch>
              {tab.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
