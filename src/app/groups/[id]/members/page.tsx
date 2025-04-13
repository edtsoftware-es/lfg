import type { PageProps } from '../../../../../.next/types/app/groups/[id]/members/page';

export default async function GroupMembers({ params }: PageProps) {
  const { id } = await params;

  return <div>GroupMembers</div>;
}
