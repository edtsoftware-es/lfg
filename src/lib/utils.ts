import type { GroupRole } from '@/db/schema';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isUserInGroupRoles(
  userNameToCheck: string,
  groupRoles: Pick<GroupRole, 'role' | 'userName'>[]
) {
  if (!userNameToCheck || !groupRoles || !Array.isArray(groupRoles)) {
    return false;
  }
  return groupRoles.some((item) => item.userName === userNameToCheck);
}
