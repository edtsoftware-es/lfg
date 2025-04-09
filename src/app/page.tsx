import { Button } from '@/components/ui/button';
import { signOut } from '@/features/auth/actions';
import { LoginForm } from '@/features/auth/ui/login-form';

export default function Home() {
  return (
    <main>
      <h1>Login Form</h1>
      <LoginForm />
      <form>
        <Button formAction={signOut}>Sign Out</Button>
      </form>
    </main>
  );
}
