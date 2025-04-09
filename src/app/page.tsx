import { LoginForm } from '@/features/auth/ui/login-form';
import { RegisterForm } from '@/features/auth/ui/register-form';
import { getRoles } from '@/lib/queries';

export default async function Home() {
  const roles = await getRoles();

  return (
    <main>
      {JSON.stringify(roles, null, 2)}
      <RegisterForm roles={[]} />

      <h1>Sign in</h1>
      <LoginForm />
    </main>
  );
}
