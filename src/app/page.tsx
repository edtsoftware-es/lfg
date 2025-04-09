import { Button } from '@/components/ui/button';
import { signOut } from '@/features/auth/actions';
import { LoginForm } from '@/features/auth/ui/login-form';
import { RegisterForm } from '@/features/auth/ui/register-form';
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
          <RegisterForm roles={[]} />
          <h1>Sign in</h1>
          <LoginForm />
        </>
      )}
    </main>
  );
}
