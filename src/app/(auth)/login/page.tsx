import { Button } from '@/components/ui/button';
import { signOut } from '@/features/auth/actions';
import { LoginForm } from '@/features/auth/ui/login-form';

export default function Page() {
  return (
    <main className="flex h-80 w-full items-center justify-center">
      <section className="flex w-full max-w-xl flex-col items-center justify-center">
        <h1>Login Form</h1>
        <LoginForm />
        <form className="pt-8">
          <Button formAction={signOut}>Sign Out</Button>
        </form>
      </section>
    </main>
  );
}
