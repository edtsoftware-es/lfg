import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
  sql,
} from 'drizzle-orm';
import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

export const languageEnum = pgEnum('language_enum', [
  'SPANISH',
  'ENGLISH',
  'FRENCH',
  'DEUTSCHE',
  'CHINESE',
]);
export const targetEnum = pgEnum('target_enum', [
  'STARTUP',
  'JOB',
  'LEARNING',
  'OTHERS',
]);
export const scheduleEnum = pgEnum('schedule_enum', [
  'MORNINGS',
  'AFTERNOON',
  'WEEKENDS',
  'NIGHTS',
  'ANY',
]);
export const applyStatesEnum = pgEnum('apply_states_enum', [
  'PENDING',
  'ACCEPTED',
  'REJECTED',
]);
export const groupStatesEnum = pgEnum('group_states_enum', [
  'OPEN',
  'ONGOING',
  'CLOSED',
  'REBUILD',
  'DONE',
]);

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey().notNull(),
    username: varchar('username', { length: 30 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    disabled: boolean('disabled').default(false).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex('idx_users_username').on(table.username),
    check('username_length_check', sql`LENGTH(${table.username}) > 2`),
  ]
);

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(userProfile, {
    fields: [users.id],
    references: [userProfile.userId],
  }),
  ownedGroups: many(groups),
  applies: many(applies),
  comments: many(groupComments),
  userGroups: many(usersToGroup),
}));

export const roles = pgTable('roles', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  img: varchar('img', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type Role = InferSelectModel<typeof roles>;
export type NewRole = InferInsertModel<typeof roles>;

export const rolesRelations = relations(roles, ({ many }) => ({
  groupRoles: many(groupRoles),
  userGroups: many(usersToGroup),
}));

export const userProfile = pgTable(
  'user_profile',
  {
    userId: integer('user_id')
      .primaryKey()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    userName: varchar('user_name').references(() => users.username),
    name: varchar('name', { length: 40 }),
    bio: varchar('bio', { length: 160 }),
    icon: varchar('icon', { length: 255 }).default('placeholder'),
    role: integer('role')
      .notNull()
      .references(() => roles.id),
    email: varchar('email', { length: 144 }),
    location: varchar('location', { length: 144 }),
    skills: text('skills').array(),
    linkdin: varchar('linkdin', { length: 240 }),
    twitter: varchar('linkdin', { length: 240 }),
    instagram: varchar('linkdin', { length: 240 }),
    github: varchar('linkdin', { length: 240 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('idx_user_profile_name').on(table.userName)]
);

export type UserProfile = InferSelectModel<typeof userProfile>;
export type NewUserProfile = InferInsertModel<typeof userProfile>;

export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(users, {
    fields: [userProfile.userId],
    references: [users.id],
  }),
}));

export const groups = pgTable(
  'groups',
  {
    id: serial('id').primaryKey().notNull(),
    ownerId: integer('owner_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    icon: text('icon').notNull().default('placeholder'),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    requirements: text('requirements'),
    target: targetEnum('target').notNull(),
    schedule: scheduleEnum('schedule').notNull().default('ANY'),
    language: languageEnum('language').notNull(),
    state: groupStatesEnum('state').notNull().default('OPEN'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('idx_groups_owner').on(table.ownerId),
    index('idx_groups_state').on(table.state),
    check('name_min_length', sql`LENGTH(${table.name}) > 5`),
  ]
);

export type Group = InferSelectModel<typeof groups>;
export type NewGroup = InferInsertModel<typeof groups>;

export const groupsRelations = relations(groups, ({ one, many }) => ({
  owner: one(users, {
    fields: [groups.ownerId],
    references: [users.id],
  }),
  roles: many(groupRoles),
  applies: many(applies),
  comments: many(groupComments),
  members: many(usersToGroup),
}));

export const groupRoles = pgTable(
  'group_roles',
  {
    id: serial('id').primaryKey().notNull(),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    userName: varchar('user_name').references(() => users.username, {
      onDelete: 'set null',
    }),
    role: integer('role')
      .notNull()
      .references(() => roles.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('idx_group_roles_group_id').on(table.groupId),
    uniqueIndex('idx_group_roles_user_composite').on(
      table.groupId,
      table.userName
    ),
  ]
);

export type GroupRole = InferSelectModel<typeof groupRoles>;
export type NewGroupRole = InferInsertModel<typeof groupRoles>;

export const groupRolesRelations = relations(groupRoles, ({ one }) => ({
  group: one(groups, {
    fields: [groupRoles.groupId],
    references: [groups.id],
  }),
  roleRef: one(roles, {
    fields: [groupRoles.role],
    references: [roles.id],
  }),
  user: one(users, {
    fields: [groupRoles.userName],
    references: [users.username],
  }),
}));

export const applies = pgTable(
  'applies',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    userName: varchar('user_name')
      .references(() => users.username)
      .notNull(),
    message: varchar('message', { length: 144 }),
    role: integer('role')
      .notNull()
      .references(() => roles.id),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    state: applyStatesEnum('state').notNull().default('PENDING'),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index('idx_applies_group_id').on(table.groupId),
    index('idx_applies_user_id').on(table.userId),
    index('idx_applies_user_id_state').on(table.userId, table.state),
  ]
);

export type Apply = InferSelectModel<typeof applies>;
export type NewApply = InferInsertModel<typeof applies>;

export const appliesRelations = relations(applies, ({ one }) => ({
  user: one(users, {
    fields: [applies.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [applies.groupId],
    references: [groups.id],
  }),
  roleRef: one(roles, {
    fields: [applies.role],
    references: [roles.id],
  }),
}));

export const groupComments = pgTable(
  'group_comments',
  {
    id: serial('id').primaryKey().notNull(),
    userName: varchar('user_name').references(() => users.username, {
      onDelete: 'cascade',
    }),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    description: text('description').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('idx_group_comments_group_id').on(table.groupId)]
);

export type GroupComment = InferSelectModel<typeof groupComments>;
export type NewGroupComment = InferInsertModel<typeof groupComments>;

export const groupCommentsRelations = relations(groupComments, ({ one }) => ({
  user: one(users, {
    fields: [groupComments.userName],
    references: [users.username],
  }),
  group: one(groups, {
    fields: [groupComments.groupId],
    references: [groups.id],
  }),
}));

export const usersToGroup = pgTable(
  'users_to_group',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    role: integer('role')
      .notNull()
      .references(() => roles.id),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index('idx_users_to_group_user').on(table.userId)]
);

export type UserToGroup = InferSelectModel<typeof usersToGroup>;
export type NewUserToGroup = InferInsertModel<typeof usersToGroup>;

export const usersToGroupRelations = relations(usersToGroup, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroup.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [usersToGroup.groupId],
    references: [groups.id],
  }),
  roleRef: one(roles, {
    fields: [usersToGroup.role],
    references: [roles.id],
  }),
}));

export type LanguageType = (typeof languageEnum.enumValues)[number];
export type TargetType = (typeof targetEnum.enumValues)[number];
export type ScheduleType = (typeof scheduleEnum.enumValues)[number];
export type ApplyStateType = (typeof applyStatesEnum.enumValues)[number];
export type GroupStateType = (typeof groupStatesEnum.enumValues)[number];

export interface UserWithRelations extends User {
  profile?: UserProfile;
  ownedGroups?: Group[];
  applies?: Apply[];
  comments?: GroupComment[];
  userGroups?: UserToGroup[];
}

export interface GroupWithRelations extends Group {
  owner?: User;
  roles?: GroupRole[];
  applies?: Apply[];
  comments?: GroupComment[];
  members?: UserToGroup[];
}

export interface UserToGroupWithRelations extends UserToGroup {
  user?: User;
  group?: Group;
  roleInfo?: Role;
}

export interface ApplyWithRelations extends Apply {
  user?: User;
  group?: Group;
}

export interface GroupCommentWithRelations extends GroupComment {
  user?: User;
  group?: Group;
}

export const schema = {
  users,
  userProfile,
  roles,
  groups,
  groupRoles,
  applies,
  groupComments,
  usersToGroup,
};
