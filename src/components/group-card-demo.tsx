import { GroupCard } from './group-card';

export default function GroupCardDemo() {
  const exampleGroup = {
    id: '1',
    name: 'Proyecto Innovación Web3',
    state: 'OPEN' as const,
    language: 'Spanish' as const,
    schedule: 'Weekends' as const,
    target: 'Startup' as const,
    rolesNeeded: [
      { role: 'FRONTEND' as const, filled: 1, total: 2 },
      { role: 'BACKEND' as const, filled: 0, total: 2 },
      { role: 'DESIGNER' as const, filled: 1, total: 1 },
      { role: 'PM' as const, filled: 1, total: 1 },
      { role: 'DEVOPS' as const, filled: 0, total: 1 },
    ],
    leader: {
      name: 'Ana García',
      avatar: '/placeholder.svg?height=32&width=32',
    },
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-center gap-8">
      <GroupCard {...exampleGroup} />

      <GroupCard
        id="2"
        name="Equipo de Aprendizaje IA"
        state="ONGOING"
        language="English"
        schedule="Nights"
        target="Learning"
        rolesNeeded={[
          { role: 'FULLSTACK', filled: 2, total: 3 },
          { role: 'MOBILE', filled: 1, total: 1 },
          { role: 'DESIGNER', filled: 0, total: 1 },
        ]}
        leader={{
          name: 'Carlos Ruiz',
          avatar: '/placeholder.svg?height=32&width=32',
        }}
      />

      <GroupCard
        id="3"
        name="Desarrollo App Móvil"
        state="REBUILD"
        language="French"
        schedule="Mornings"
        target="Job"
        rolesNeeded={[
          { role: 'MOBILE', filled: 1, total: 2 },
          { role: 'BACKEND', filled: 1, total: 1 },
          { role: 'DESIGNER', filled: 0, total: 1 },
          { role: 'PM', filled: 0, total: 1 },
        ]}
        leader={{
          name: 'Elena Martín',
          avatar: '/placeholder.svg?height=32&width=32',
        }}
      />
    </div>
  );
}
