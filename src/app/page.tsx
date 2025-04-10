import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import GroupCardDemo from '@/components/group-card-demo';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/actions/auth';
import { getRoles, getUser } from '@/lib/queries';

export default async function Home() {
  const roles = await getRoles();
  const user = await getUser();

  return (
    <main className="flex flex-col items-center justify-center gap-10">
      {user ? (
        <form>
          <Button formAction={signOut}>Sign out</Button>
        </form>
      ) : (
        <>
          <RegisterForm roles={roles} />
          <h1>Sign in</h1>
          <LoginForm />
        </>
      )}

      <div className="flex w-full max-w-7xl justify-center px-6">
        <GroupCardDemo />
      </div>
    </main>
  );
}
