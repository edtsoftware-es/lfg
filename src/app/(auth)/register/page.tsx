import { getRoles } from '@/entities/roles/api/get-roles';
import { RegisterForm } from '@/features/auth/ui/register-form';
import Link from 'next/link';

export default async function Page() {
  const roles = await getRoles();
  return (
    <main className="flex h-80 w-full items-center justify-center">
      <section className="flex w-full max-w-xl flex-col items-center justify-center gap-4">
        <h1>Register Form</h1>
        <RegisterForm roles={roles} />
        <Link href={'/login'}>Ya tienes cuenta? Inicia sesión</Link>
      </section>
    </main>
  );
}
