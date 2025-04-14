import { Separator } from '@/components/ui/separator';
import type { LayoutProps } from '../../../../.next/types/app/group/[id]/layout';
import { Tabs } from '@/components/layout/tabs';

export default async function GroupLayout({ children, params }: LayoutProps) {
  const { id } = await params;

  const tabs = [
    { name: 'Details', path: `/group/${id}/details` },
    { name: 'Members', path: `/group/${id}/members` },
    { name: 'Requests', path: `/group/${id}/requests` },
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
