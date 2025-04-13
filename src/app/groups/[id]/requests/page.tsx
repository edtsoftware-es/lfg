import type { PageProps } from '../../../../../.next/types/app/groups/[id]/requests/page';

export default async function GroupRequests({ params }: PageProps) {
  const { id } = await params;

  return <div>GroupRequests</div>;
}
