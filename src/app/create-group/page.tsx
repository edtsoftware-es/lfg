import { CreateGroupForm } from '@/components/create-group-form';

export default function CreateGroupPage() {
  return (
    <main className="flex w-full justify-center">
      <div className="container max-w-[600px] py-10">
        <h1 className="mb-6 text-center font-bold text-3xl">
          Create a New Group
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
          Find your perfect team and start building something amazing together!
        </p>
        <CreateGroupForm />
      </div>
    </main>
  );
}
