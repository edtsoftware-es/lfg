import { RoleImage } from '@/components/role-image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ROLES } from '@/constants';
import { getUserProfile, type UserProfile } from '@/lib/queries';
import { getSession } from '@/lib/session';
import { Calendar, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

// const USER_MOCK = {
//   icon: 'https://github.com/shadcn.png',
//   name: 'John Doe',
//   userName: 'john_doe',
//   linkedin: 'https://www.linkedin.com/in/john-doe',
//   twitter: 'https://x.com/john_doe',
//   instagram: 'https://www.instagram.com/john_doe',
//   github: 'https://github.com/john_doe',
//   role: 'FRONTEND',
//   bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, voluptatum? Omnis libero doloremque placeat accusamus, iusto iure est aspernatur explicabo eius ducimus doloribus accusantium cupiditate minus ratione dolorum, hic dolore.',
//   skills: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
//   email: 'john.doe@example.com',
//   location: 'New York, NY',
// };

export default async function Profile() {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  const user = await getUserProfile(session.user.id);

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex flex-col">
          <div className="bg-background/95 pt-1 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4 ">
              <h2 className="font-bold text-xl">Profile</h2>
            </div>
          </div>
          <Separator />
        </div>
        <ProfileContent user={user} />
      </div>
      <Separator orientation="vertical" />
      <div className="hidden h-full w-64 md:block" />
    </div>
  );
}

function ProfileContent({ user }: { user: UserProfile }) {
  const roleName = ROLES[Number(user?.role) as keyof typeof ROLES];

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col items-center gap-3 lg:flex-row">
        <Avatar className="size-16">
          <AvatarImage
            src={user?.icon || 'https://github.com/shadcn.png'}
            alt={user?.name || 'User'}
          />
          <AvatarFallback className="text-3xl">
            {user?.name?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-0.5">
          <h2 className="text-center font-bold text-xl lg:text-start">
            {user?.name ?? 'User'}
          </h2>
          <p className="text-center text-lg text-muted-foreground lg:text-start">
            {`@${user?.userName ?? 'username'}`}
          </p>
        </div>

        <div className="flex space-x-1 lg:ml-auto lg:self-start">
          {user?.linkedin && (
            <Button
              variant="ghost"
              size="icon"
              className="size-fit rounded-full p-3 text-muted-foreground"
              asChild
            >
              <Link href={user?.linkedin ?? 'https://www.linkedin.com'}>
                <Linkedin className="size-6" />
              </Link>
            </Button>
          )}
          {user?.twitter && (
            <Button
              variant="ghost"
              size="icon"
              className="size-fit rounded-full p-3 text-muted-foreground"
              asChild
            >
              <Link href={user?.twitter ?? 'https://x.com'}>
                <Twitter className="size-6" />
              </Link>
            </Button>
          )}
          {user?.instagram && (
            <Button
              variant="ghost"
              size="icon"
              className="size-fit rounded-full p-3 text-muted-foreground"
              asChild
            >
              <Link href={user?.instagram ?? 'https://www.instagram.com'}>
                <Instagram className="size-6" />
              </Link>
            </Button>
          )}
          {user?.github && (
            <Button
              variant="ghost"
              size="icon"
              className="size-fit rounded-full p-3 text-muted-foreground"
              asChild
            >
              <Link href={user?.github ?? 'https://github.com'}>
                <Github className="size-6" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="mt-1 flex flex-col-reverse justify-between gap-5 lg:flex-row lg:items-end lg:gap-2">
        {user?.createdAt && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-4 shrink-0" />
            <p>Joined {format(user.createdAt, 'dd MMMM yyyy')}</p>
          </div>
        )}
        <div className="flex shrink-0 items-center gap-2 rounded-lg border px-3 py-1 dark:border-input">
          <RoleImage variant={'FRONTEND'} />
          <span className="text-card-foreground text-sm capitalize">
            {roleName.toLowerCase()}
          </span>
        </div>
      </div>

      {user?.bio && <p className="mt-5">{user.bio}</p>}

      {user?.aboutMe && (
        <div className="mt-10 space-y-4">
          <h3 className="font-bold text-lg">About me</h3>
          <p>{user.aboutMe}</p>
        </div>
      )}

      {user?.skills && user?.skills?.length > 0 && (
        <div className="mt-10 space-y-4">
          <h3 className="font-bold text-lg">Skills</h3>
          <div className="flex flex-wrap gap-1.5">
            {user?.skills?.map((item, index) => (
              <Badge
                key={index}
                variant="outline"
                className="flex items-center gap-1 border px-2.5 py-1 text-card-foreground dark:border-input"
              >
                {item.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {(user?.email || user?.location) && (
        <div className="mt-10 space-y-4">
          <h3 className="font-bold text-lg">Contact</h3>
          <div className="space-y-2">
            <p>{user?.email}</p>
            <p>{user?.location}</p>
          </div>
        </div>
      )}
    </div>
  );
}
