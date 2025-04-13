// import { LoginForm } from '@/components/auth/login-form';
// import { RegisterForm } from '@/components/auth/register-form';
import { GroupCard } from '@/components/group-card';
import { Separator } from '@/components/ui/separator';
import { getGroupsWithRoles } from '@/lib/queries';
// import { Button } from '@/components/ui/button';
// import { signOut } from '@/lib/actions/auth';
// import { getRoles, getUser } from '@/lib/queries';

export default async function Home() {
  // const roles = await getRoles();
  // const user = await getUser();
  const groups = await getGroupsWithRoles();

  return (
    <div className="flex h-full">
      {/* {user ? (
        <form>
          <Button formAction={signOut}>Sign out</Button>
        </form>
      ) : (
        <>
          <RegisterForm roles={roles} />
          <h1>Sign in</h1>
          <LoginForm />
        </>
      )} */}

      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex flex-col">
          <div className="bg-background/95 pt-1 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4 ">
              <h2 className="font-bold text-xl">Home</h2>
            </div>
          </div>
          <Separator />
        </div>
        {groups.map((group) => (
          <div key={group.id}>
            <GroupCard group={group} />
            <Separator />
          </div>
        ))}
      </div>
      <Separator orientation="vertical" />
      <div className="hidden h-full w-64 md:block" />
    </div>
  );
}
