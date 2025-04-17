import { GroupCard } from '@/components/group-card';
import { Separator } from '@/components/ui/separator';
import { getGroupsWithRoles } from '@/lib/queries';

const GROUPS_ARCHIVED = ['CLOSED', 'DONE'];

export default async function GroupsArchived() {
  const groups = await getGroupsWithRoles();

  const groupsArchived = groups.filter((group) =>
    GROUPS_ARCHIVED.includes(group.status)
  );

  if (groupsArchived.length === 0) {
    return (
      <div className="px-6 py-10">
        <h2 className="bg-clip-text font-bold text-2xl text-foreground">
          There are no archived groups yet
        </h2>
      </div>
    );
  }

  return (
    <>
      {groupsArchived.map((group) => (
        <div key={group.id}>
          <GroupCard group={group} />
          <Separator />
        </div>
      ))}
    </>
  );
}
