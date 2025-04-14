import { GroupCard } from '@/components/group-card';
import { Separator } from '@/components/ui/separator';
import { getGroupsWithRoles } from '@/lib/queries';

const GROUPS_IN_PROGRESS = ['OPEN', 'ONGOING', 'REBUILD'];

export default async function GroupsInProgress() {
  const groups = await getGroupsWithRoles();

  const groupsInProgress = groups.filter((group) =>
    GROUPS_IN_PROGRESS.includes(group.status)
  );

  if (groupsInProgress.length === 0) {
    return (
      <div className="px-6 py-10">
        <h2 className="bg-clip-text font-bold text-2xl text-foreground">
          There are no groups in progress yet
        </h2>
      </div>
    );
  }

  return (
    <>
      {groupsInProgress.map((group) => (
        <div key={group.id}>
          <GroupCard group={group} />
          <Separator />
        </div>
      ))}
    </>
  );
}
