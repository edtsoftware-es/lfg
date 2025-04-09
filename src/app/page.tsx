import { getRoles } from '@/lib/queries';

export default async function Home() {
  const roles = await getRoles();

  return <main>{JSON.stringify(roles, null, 2)}</main>;
}
