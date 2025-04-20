import { Separator } from '@/components/ui/separator';
import { getUserApplies } from '@/lib/queries';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { UserRequestCard } from './ui/user-apply-card';

export default async function GroupsRequests() {
  const session = await getSession();

  if (!session) {
    redirect('/');
  }

  const userApplies = await getUserApplies(session.user.id);

  if (!userApplies || userApplies?.length === 0) {
    return (
      <div className="px-6 py-10">
        <h2 className="bg-clip-text font-bold text-2xl text-foreground">
          There are no applies yet
        </h2>
      </div>
    );
  }

  return (
    <>
      {userApplies.map((apply, index) => (
        <div key={index}>
          <UserRequestCard {...apply} />
          <Separator />
        </div>
      ))}
    </>
  );
}
