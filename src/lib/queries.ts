import { unstable_cache } from "./unstable-cache";

import { db } from "@/db/drizzle";
import {
  groupComments,
  groups,
  roles,
  userProfile,
  users,
  type GroupStateType,
  type LanguageType,
  type ScheduleType,
  type TargetType,
  type GroupRole,
} from "@/db/schema";

import { type SQL, eq, sql } from "drizzle-orm";
import { cookies } from "next/headers";
import { verifyToken } from "./session";

export async function getUser() {
  const session = (await cookies()).get("session");
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
    if (typeof userIdentifier === "number") {
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
      })
      .from(userProfile)
      .where(query)
      .limit(1);

    if (profile.length === 0) {
      return null;
    }

    return profile[0];
  },
  ["profile"],
  {
    revalidate: 60 * 60 * 2,
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
  ["roles"],
  {
    revalidate: 60 * 60 * 2,
  }
);

export type Role = Awaited<ReturnType<typeof getRoles>>;

export const getGroups = unstable_cache(
  () => {
    return db.select().from(groups);
  },
  ["groups"],
  {
    revalidate: 60 * 60 * 2,
  }
);

export type Group = Awaited<ReturnType<typeof getGroups>>;

export type GroupWithRoles = {
  id: number;
  owner_name: string;
  name: string;
  target: TargetType;
  schedule: ScheduleType;
  language: LanguageType;
  state: GroupStateType;
  created_at: Date;
  groupRoles: Pick<GroupRole, "role" | "userName">[];
};

export const getGroupsWithRoles = unstable_cache(
  async () => {
    const query = await db.execute(sql`
    SELECT
      g.id,
      g.owner_name,
      g.name,
      g.target,
      g.schedule,
      g.language,
      g.state,
      g.created_at,
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
  ["groups"],
  { revalidate: 60 * 60 * 2 }
);

export type GroupById = Omit<GroupWithRoles, "created_at" | "groupRoles"> & {
  description: string;
  requirements: string;
  createdAt: Date;
  groupRoles: (Pick<GroupRole, "role"> & { user_name: string })[];
};

export const getGroupById = unstable_cache(
  async (groupId: number) => {
    const result = await db.execute(sql`
    SELECT
      g.id,
      g.owner_name,
      g.name,
      g.description,
      g.requirements,
      g.target,
      g.schedule,
      g.language,
      g.state,
      g.created_at AS "createdAt",
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'user_name', gr.user_name,
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
  ["group"],
  { revalidate: 60 * 60 * 2 }
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
      .where(eq(groupComments.groupId, groupId));
  },
  ["comments"],
  {
    revalidate: 60 * 60 * 2,
  }
);

export type GroupComments = Awaited<ReturnType<typeof getGroupCommennts>>;
