import { unstable_cache } from './unstable-cache';

import { db } from '@/db/drizzle';
import {
  type GroupRole,
  type GroupStatusType,
  type LanguageType,
  type ScheduleType,
  type TargetType,
  groupComments,
  groupRoles,
  groups,
  roles,
  userProfile,
  users,
} from '@/db/schema';

import { type SQL, desc, eq, sql } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { verifyToken } from './session';

export async function getUser() {
  const session = (await cookies()).get('session');
  if (!session || !session.value) {
    return null;
  }

  const sessionData = await verifyToken(session.value);

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, sessionData.user.id))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export const getUserProfile = unstable_cache(
  async (userIdentifier: string | number) => {
    if (!userIdentifier) {
      return null;
    }

    let query: SQL<unknown>;
    if (typeof userIdentifier === 'number') {
      query = eq(userProfile.userId, userIdentifier);
    } else {
      query = eq(userProfile.userName, userIdentifier);
    }

    const profile = await db
      .select({
        userName: userProfile.userName,
        name: userProfile.name,
        bio: userProfile.bio,
        icon: userProfile.icon,
        role: userProfile.role,
        email: userProfile.email,
        location: userProfile.location,
        skills: userProfile.skills,
        linkedin: userProfile.linkdin,
        twitter: userProfile.twitter,
        instagram: userProfile.instagram,
        github: userProfile.github,
        aboutMe: userProfile.aboutMe,
        createdAt: userProfile.createdAt,
      })
      .from(userProfile)
      .where(query)
      .limit(1);

    if (profile.length === 0) {
      return null;
    }

    return profile[0];
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['profile'],
  }
);

export type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

export const getRoles = unstable_cache(
  () => {
    return db
      .select({
        id: roles.id,
        name: roles.name,
        img: roles.img,
      })
      .from(roles);
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['roles'],
  }
);

export type Role = Awaited<ReturnType<typeof getRoles>>;

export const getGroups = unstable_cache(
  () => {
    return db.select().from(groups);
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['groups'],
  }
);

export type Group = Awaited<ReturnType<typeof getGroups>>;

export type GroupWithRoles = {
  id: number;
  ownerName: string;
  name: string;
  target: TargetType;
  schedule: ScheduleType;
  language: LanguageType;
  status: GroupStatusType;
  createdAt: Date;
  groupRoles: Pick<GroupRole, 'role' | 'userName'>[];
};

export const getGroupsWithRoles = unstable_cache(
  async () => {
    const query = await db.execute(sql`
    SELECT
      g.id,
      g.owner_name as "ownerName",
      g.name,
      g.target,
      g.schedule,
      g.language,
      g.status,
      g.created_at as "createdAt",
      COALESCE(roles_json.roles, '[]'::json) AS "groupRoles"
    FROM
      groups g
    JOIN LATERAL (
      SELECT json_agg(
        json_build_object(
          'userName', gr.user_name,
          'role', gr.role
        )
        ORDER BY gr.role ASC
      ) AS roles
      FROM group_roles gr
      WHERE gr.group_id = g.id
      LIMIT 8
    ) roles_json ON true
  `);

    return query.rows as GroupWithRoles[];
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['groups'],
  }
);

export type GroupById = GroupWithRoles & {
  description: string;
  requirements: string;
};

export const getUserGroupsWithRoles = unstable_cache(
  async (userName: string) => {
    const query = await db.execute(sql`
        SELECT
          g.id,
          g.owner_name as "ownerName",
          g.name,
          g.target,
          g.schedule,
          g.language,
          g.status,
          g.created_at as "createdAt",
          COALESCE(roles_json.roles, '[]'::json) AS "groupRoles"
        FROM
          groups g
        JOIN LATERAL (
          SELECT json_agg(
            json_build_object(
              'userName', gr.user_name,
              'role', gr.role
            )
            ORDER BY gr.role ASC
          ) AS roles
          FROM group_roles gr
          WHERE gr.group_id = g.id
          LIMIT 8
        ) roles_json ON true
        WHERE EXISTS (
          SELECT 1
          FROM group_roles gr
          WHERE gr.group_id = g.id
          AND gr.user_name = ${userName}
        );
      `);

    return query.rows as GroupWithRoles[];
  },
  [],
  { revalidate: 60 * 60 * 2, tags: ['groups'] }
);

export const getGroupById = unstable_cache(
  async (groupId: number) => {
    const result = await db.execute(sql`
    SELECT
      g.id,
      g.owner_name AS "ownerName",
      g.name,
      g.description,
      g.requirements,
      g.target,
      g.schedule,
      g.language,
      g.status,
      g.created_at AS "createdAt",
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'userName', gr.user_name,
              'role', gr.role
            )
            ORDER BY gr.role ASC
          )
          FROM group_roles gr
          WHERE gr.group_id = g.id
        ),
        '[]'::json
      ) AS "groupRoles"
    FROM
      groups g
    WHERE
      g.id = ${groupId}
  `);

    return result.rows[0] as GroupById;
  },
  [],
  { revalidate: 60 * 60 * 2, tags: ['groups'] }
);

export const getGroupMembers = unstable_cache(
  async (groupId: number) => {
    return await db
      .select({
        userName: groupRoles.userName,
      })
      .from(groupRoles)
      .where(eq(groupRoles.groupId, groupId));
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['groups'],
  }
);

export type GroupMemberInfo = {
  userId: number;
  userName: string;
  name: string | null;
  icon: string;
  bio: string;
  role: number;
};

export const getGroupMembersInfo = unstable_cache(
  async (groupId: number) => {
    const query = await db.execute(sql`
        SELECT
            u.user_id AS "userId",
            u.user_name AS "userName",
            u.name,
            u.icon,
            u.bio,
            g.role
        FROM
            user_profile u
        JOIN
            group_roles g ON u.user_name = g.user_name
        WHERE
            g.group_id = ${groupId}
        AND u.user_name IS NOT NULL;
      `);
    return query.rows as GroupMemberInfo[];
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['groups'],
  }
);

export const getGroupCommennts = unstable_cache(
  (groupId: number) => {
    return db
      .select({
        userName: groupComments.userName,
        message: groupComments.message,
        createdAt: groupComments.createdAt,
      })
      .from(groupComments)
      .where(eq(groupComments.groupId, groupId))
      .orderBy((comments) => [desc(comments.createdAt)]);
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['groups'],
  }
);

export const preloadGroupComments = (groupId: number) => {
  void getGroupCommennts(groupId);
};

export type GroupApplies = {
  userName: string;
  role: number;
  message: string;
  status: string;
  createdAt: string;
  icon: string;
};

export const getGroupApplies = unstable_cache(
  async (groupId: number) => {
    const query = await db.execute(sql`
        SELECT
            a.user_name AS "userName",
            a.role,
            a.message,
            a.status,
            a.created_at AS "createdAt",
            u.icon
        FROM
            applies a
        JOIN
            user_profile u ON u.user_name = a.user_name
        WHERE
            group_id = ${groupId}
      `);
    return query.rows as GroupApplies[];
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['groups'],
  }
);

export type GroupComments = Array<{
  userName: string | null;
  message: string;
  createdAt: Date;
}>;

export const getUserApplies = unstable_cache(
  async (userId: number) => {
    const query = await db.execute(
      sql`
        SELECT
            a.id,
            a.group_id AS "groupId",
            g.name,
            a.role,
            a.message,
            a.created_at AS "createdAt"
        FROM
            applies a
        JOIN
            groups g ON a.group_id = g.id
        WHERE
            a.user_id = ${userId} AND a.status = 'PENDING';
    `
    );
    return query.rows as UserApplies[];
  },
  [],
  {
    revalidate: 60 * 60 * 2,
    tags: ['userApplies'],
  }
);

export type UserApplies = {
  id: number;
  groupId: number;
  name: string;
  role: number;
  message: string;
  createdAt: string;
};
