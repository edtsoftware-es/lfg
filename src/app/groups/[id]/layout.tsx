import { Separator } from '@/components/ui/separator';
import { TabItem } from '@/components/layout/tab-item';
import type { LayoutProps } from '../../../../.next/types/app/groups/[id]/layout';

export default async function GroupLayout({ children, params }: LayoutProps) {
  const { id } = await params;

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex flex-col">
          <div className="bg-background/95 pt-1 backdrop-blur-sm">
            <div className="flex flex-col">
              <div className="flex h-16 w-full items-center justify-center">
                <TabItem href={`/groups/${id}/details`} prefetch>
                  Details
                </TabItem>
                <TabItem href={`/groups/${id}/members`} prefetch>
                  Members
                </TabItem>
                <TabItem href={`/groups/${id}/requests`} prefetch>
                  Requests
                </TabItem>
              </div>
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
