import { Button } from '@/components/ui/button';
import { signOut } from './actions';
import { LoginForm } from './auth.client';

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
