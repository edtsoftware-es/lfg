import { ROLES } from '@/constants';
import type { GroupWithRoles } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { RoleImage } from './role-image';

type RoleListProps = {
  group: GroupWithRoles;
};

export function RoleList({ group }: RoleListProps) {
  const groupedRoles = Object.groupBy(group.groupRoles, ({ role }) => role);
  return (
    <>
      {Object.entries(groupedRoles).map(([roleId, roles = []], index) => {
        const roleName = ROLES[Number(roleId) as keyof typeof ROLES];
        const total = roles.length;
        const filled = roles.filter((role) => role.userName !== null).length;
        const isFilled = filled === total;

        return (
          <div
            key={index}
            className="flex items-center gap-2 rounded-lg border px-2 py-1 dark:border-input"
          >
            <RoleImage variant={roleName} />
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-medium text-xs',
                  isFilled ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {filled}/{total}
              </span>
              <span className="text-card-foreground text-xs capitalize">
                {roleName.toLowerCase()}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
