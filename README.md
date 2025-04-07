This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Programming Community Web Application

## General Description
This web application will allow programmers to join groups to develop collaborative projects. Users can create groups, request to join existing groups, share comments, and manage joint development projects.

---

## Main Functionalities

### Authentication and User Management
- Registration and login.
- User profiles with private areas.
- Modification of personal information (name, icon, etc.).
- Viewing own profile.
- Logging in and out.
- Retrieving user details by ID (public access).

### Group Management
- Viewing a feed of groups (public and private).
- Creating groups (for authenticated users).
- Viewing group details:
  - Limited version (public).
  - Full version (for authenticated users).
- Requesting to join groups.
- Editing group information (by authenticated users).
- Accepting requests (by authenticated users).
- Modifying group status.
- Deleting groups (only by the owner).
- Filtering groups.
- Group detail view differentiated based on whether the user is a regular member or a leader.

### Comment Management
- Creating comments in groups (for authenticated users).
- Viewing group comments (for authenticated users).

### Request Management
- Sending requests to join groups.
- Accepting or rejecting requests (only by the owner).
- **Restrictions:**
  - Maximum of 5 active requests per user.
  - Only one active request allowed at a time for the same group.

### Roles
- Definition of roles: UX/UI, Front-end, Back-end, Fullstack, DevOps.
- Retrieving the list of roles (public access).
- Modifying user data, including the role.
- A user can have different roles in different groups.

---

## System Rules
- A user can have different roles in different groups.
- A user can belong to a maximum of 3 groups (including the one they created).
- Each group must have a single owner.
- Maximum of 8 members per group.
- Only one active request allowed at a time for the same group.
- Maximum of 5 active requests per user.

---

## Application Views
- **Home:** Main page.
- **Groups:** List of groups in which the user is involved (owned or joined via request).
- **Group Filtering.**
- **Group Detail View:** Variants depending on whether the user is a regular member or a leader.
- **Profile View.**
- **Settings.**
- **Messages:** Latest messages.

---

## System Entities
- User
- Group
- Roles
- Comments
- Requests
- user_to_group

---

## Technological Stack
- **Frontend:** React 19, Tailwind CSS 4, Next.js 15, Lucide React.
- **Backend:** Node.js (implied).
- **Security:** bcrypt, shadcn.
- **Utilities:** await-to.
- **Database:** PostgreSQL with Neon.
- **ORM:** Drizzle.
- **Validation:** Zod (schemas and validation).
- **Special Features:** AI Chatbot with context.

