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

// Enumerations - kept as is, enums are efficient in PostgreSQL
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

// Tabla users - Using integer instead of bigint for most use cases
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey().notNull(),
    username: varchar('username', { length: 30 }).notNull(),
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

// Tipos para users
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Relaciones de users
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

// Tabla roles - simplified
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

// Tipos para roles
export type Role = InferSelectModel<typeof roles>;
export type NewRole = InferInsertModel<typeof roles>;

// Relaciones de roles
export const rolesRelations = relations(roles, ({ many }) => ({
  groupRoles: many(groupRoles),
  userGroups: many(usersToGroup),
}));

// Tabla user_profile - simplified
export const userProfile = pgTable('user_profile', {
  userId: integer('user_id')
    .primaryKey()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  bio: varchar('bio', { length: 160 }),
  icon: varchar('icon', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Tipos para user_profile
export type UserProfile = InferSelectModel<typeof userProfile>;
export type NewUserProfile = InferInsertModel<typeof userProfile>;

// Relaciones de user_profile
export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(users, {
    fields: [userProfile.userId],
    references: [users.id],
  }),
}));

// Tabla groups - optimized
export const groups = pgTable(
  'groups',
  {
    id: serial('id').primaryKey().notNull(),
    ownerId: integer('owner_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
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

// Tipos para groups
export type Group = InferSelectModel<typeof groups>;
export type NewGroup = InferInsertModel<typeof groups>;

// Relaciones de groups
export const groupsRelations = relations(groups, ({ one, many }) => ({
  owner: one(users, {
    fields: [groups.ownerId],
    references: [users.id],
  }),
  filters: many(groupsFilter),
  roles: many(groupRoles),
  applies: many(applies),
  comments: many(groupComments),
  members: many(usersToGroup),
}));

// Tabla groups_filter - optimized with composite index
export const groupsFilter = pgTable(
  'groups_filter',
  {
    id: serial('id').primaryKey().notNull(),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id, { onDelete: 'cascade' }),
    type: varchar('type', { length: 20 }).notNull(),
    value: varchar('value', { length: 50 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    // Combined index for more efficient filtering
    index('idx_groups_filter_composite').on(
      table.groupId,
      table.type,
      table.value
    ),
  ]
);

// Tipos para groups_filter
export type GroupFilter = InferSelectModel<typeof groupsFilter>;
export type NewGroupFilter = InferInsertModel<typeof groupsFilter>;

// Relaciones de groups_filter
export const groupsFilterRelations = relations(groupsFilter, ({ one }) => ({
  group: one(groups, {
    fields: [groupsFilter.groupId],
    references: [groups.id],
  }),
}));

// Tabla group_roles - optimized
export const groupRoles = pgTable(
  'group_roles',
  {
    id: serial('id').primaryKey().notNull(),
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
  (table) => [
    // Single composite index instead of two separate indexes
    uniqueIndex('idx_group_roles_composite').on(table.groupId, table.role),
  ]
);

// Tipos para group_roles
export type GroupRole = InferSelectModel<typeof groupRoles>;
export type NewGroupRole = InferInsertModel<typeof groupRoles>;

// Relaciones de group_roles
export const groupRolesRelations = relations(groupRoles, ({ one }) => ({
  group: one(groups, {
    fields: [groupRoles.groupId],
    references: [groups.id],
  }),
  roleRef: one(roles, {
    fields: [groupRoles.role],
    references: [roles.id],
  }),
}));

// Tabla applies - optimized
export const applies = pgTable(
  'applies',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
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
    // Combined index for state filtering with user/group context
    index('idx_applies_state_user_group').on(
      table.state,
      table.userId,
      table.groupId
    ),
    // Unique constraint to prevent duplicate applications
    uniqueIndex('idx_unique_user_group_apply').on(table.userId, table.groupId),
  ]
);

// Tipos para applies
export type Apply = InferSelectModel<typeof applies>;
export type NewApply = InferInsertModel<typeof applies>;

// Relaciones de applies
export const appliesRelations = relations(applies, ({ one }) => ({
  user: one(users, {
    fields: [applies.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [applies.groupId],
    references: [groups.id],
  }),
}));

// Tabla group_comments - optimized
export const groupComments = pgTable(
  'group_comments',
  {
    id: serial('id').primaryKey().notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
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
  (table) => [
    // Combined index since comments are typically queried by group
    index('idx_group_comments_group_user').on(
      table.groupId,
      table.userId,
      table.createdAt
    ),
  ]
);

// Tipos para group_comments
export type GroupComment = InferSelectModel<typeof groupComments>;
export type NewGroupComment = InferInsertModel<typeof groupComments>;

// Relaciones de group_comments
export const groupCommentsRelations = relations(groupComments, ({ one }) => ({
  user: one(users, {
    fields: [groupComments.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [groupComments.groupId],
    references: [groups.id],
  }),
}));

// Tabla users_to_group - optimized
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
  (table) => [
    // Combined index for role-based group membership queries
    index('idx_users_to_group_group_role').on(table.groupId, table.role),
    // Index for user's group membership queries
    index('idx_users_to_group_user').on(table.userId),
    // Unique constraint
    uniqueIndex('idx_unique_user_group').on(table.userId, table.groupId),
  ]
);

// Tipos para users_to_group
export type UserToGroup = InferSelectModel<typeof usersToGroup>;
export type NewUserToGroup = InferInsertModel<typeof usersToGroup>;

// Relaciones de users_to_group
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

// Tipo para los valores de las enumeraciones
export type LanguageType = (typeof languageEnum.enumValues)[number];
export type TargetType = (typeof targetEnum.enumValues)[number];
export type ScheduleType = (typeof scheduleEnum.enumValues)[number];
export type ApplyStateType = (typeof applyStatesEnum.enumValues)[number];
export type GroupStateType = (typeof groupStatesEnum.enumValues)[number];

// Tipos con relaciones incluidas
export interface UserWithRelations extends User {
  profile?: UserProfile;
  ownedGroups?: Group[];
  applies?: Apply[];
  comments?: GroupComment[];
  userGroups?: UserToGroup[];
}

export interface GroupWithRelations extends Group {
  owner?: User;
  filters?: GroupFilter[];
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

// Exportación de todas las tablas para operaciones en bloque
export const schema = {
  users,
  userProfile,
  roles,
  groups,
  groupsFilter,
  groupRoles,
  applies,
  groupComments,
  usersToGroup,
};
