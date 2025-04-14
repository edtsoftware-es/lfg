import { Separator } from '@/components/ui/separator';
import { Tabs } from '@/components/layout/tabs';
import type { ReactNode } from 'react';

export default function GroupsLayout({ children }: { children: ReactNode }) {
  const tabs = [
    { name: 'In progress', path: '/groups/in-progress' },
    { name: 'Requests', path: '/groups/requests' },
    { name: 'Archived', path: '/groups/archived' },
  ];

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex flex-col">
          <div className="bg-background/95 pt-1 backdrop-blur-sm">
            <div className="flex flex-col">
              <Tabs tabs={tabs} />
              <Separator />
            </div>
          </div>
        </div>
        {children}
      </div>
      <Separator orientation="vertical" />
      <div className="hidden h-full w-64 lg:block" />
    </div>
  );
}
