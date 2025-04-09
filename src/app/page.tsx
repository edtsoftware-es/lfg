import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';
import { Button } from '@/components/ui/button';
import { signOut } from '@/lib/actions/auth';
import { getRoles, getUser } from '@/lib/queries';

export default async function Home() {
  const roles = await getRoles();
  const user = await getUser();

  return (
    <main>
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
    </main>
  );
}
