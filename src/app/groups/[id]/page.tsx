import { GroupStatus } from '@/components/group-status';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { roleConfig } from '@/constants';
import { getGroupById } from '@/lib/queries';
import { cn } from '@/lib/utils';
import { Clock, Crown, Globe, Target } from 'lucide-react';
import type { PageProps } from '../../../../.next/types/app/groups/[id]/page';

const rolesNeeded = [
  { role: 'FRONTEND' as const, filled: 1, total: 2 },
  { role: 'BACKEND' as const, filled: 0, total: 2 },
  { role: 'DESIGNER' as const, filled: 1, total: 1 },
  { role: 'PM' as const, filled: 1, total: 1 },
  { role: 'DEVOPS' as const, filled: 0, total: 1 },
];

function DetailsCard() {
  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <h2 className="bg-clip-text font-bold text-2xl text-foreground">
            Grupo muy crema
          </h2>

          <GroupStatus status="open" />
        </div>

        <div className="flex items-center gap-2.5">
          <Avatar className="size-10">
            <AvatarImage
              src={'https://github.com/shadcn.png'}
              alt={'Kalimero'}
            />
            <AvatarFallback>KA</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <Button
              variant="link"
              size="sm"
              className="p-0 text-card-foreground text-lg"
            >
              Kalimero
            </Button>
            <Crown className="ml-1 size-5" color="#ffaa00" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-1.5">
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground capitalize"
        >
          <Globe className="h-3 w-3 text-card-foreground" />
          Spanish
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground"
        >
          <Clock className="h-3 w-3 text-card-foreground" />
          Afternoon
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 border-card-800 bg-card-800/50 px-2.5 py-1 text-card-foreground"
        >
          <Target className="h-3 w-3 text-card-foreground" />
          Startup
        </Badge>
      </div>

      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(108px,1fr))] gap-1.5">
        {rolesNeeded.map((role, index) => {
          const { icon, color } = roleConfig[role.role];
          const isFilled = role.filled === role.total;

          return (
            <div
              key={index}
              className={cn(
                'flex items-center gap-2 rounded-lg px-2 py-1 transition-all',
                'border border-card-800'
              )}
            >
              <div
                className={`bg-gradient-to-br ${color} rounded-md p-1.5 text-white`}
              >
                {icon}
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    'font-medium text-xs',
                    isFilled ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {role.filled}/{role.total}
                </span>
                <span className="text-card-foreground text-xs capitalize">
                  {role.role.toLowerCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 space-y-4">
        <h3 className="font-bold text-lg">Description</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          minus beatae blanditiis eos exercitationem perspiciatis consequuntur
          ipsum assumenda eligendi nam, expedita corrupti facilis voluptate
          eaque natus voluptas deleniti, ea nihil.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
          distinctio pariatur reiciendis impedit eaque ipsam adipisci? Illum in,
          fugiat quibusdam modi cupiditate soluta deserunt? Incidunt tenetur
          corporis molestiae voluptate earum!
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <h3 className="font-bold text-lg">Requirements</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem
          minus beatae blanditiis eos exercitationem perspiciatis consequuntur
          ipsum assumenda eligendi nam, expedita corrupti facilis voluptate
          eaque natus voluptas deleniti, ea nihil.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil,
          distinctio pariatur reiciendis impedit eaque ipsam adipisci? Illum in,
          fugiat quibusdam modi cupiditate soluta deserunt? Incidunt tenetur
          corporis molestiae voluptate earum!
        </p>
      </div>
    </div>
  );
}

export default async function Webo({ params }: PageProps) {
  const { id } = await params;
  const group = await getGroupById(+id);
  console.log(group);

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <Tabs defaultValue="details" className="flex-1 gap-0">
          <div className="sticky top-0 z-10 flex flex-col">
            <div className="bg-background/95 pt-1 backdrop-blur-sm">
              <div className="flex flex-col">
                <div className="flex h-16 items-center">
                  <TabsList className="size-full bg-background p-0">
                    <TabsTrigger
                      value="details"
                      className="group relative h-full rounded-none border-none p-0 text-xl data-[state=active]:bg-background dark:data-[state=active]:bg-background"
                    >
                      Details
                      <div className="absolute bottom-0 hidden h-1 w-full bg-primary group-data-[state=active]:block" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="members"
                      className="group relative h-full rounded-none border-none p-0 text-xl data-[state=active]:bg-background dark:data-[state=active]:bg-background"
                    >
                      Members
                      <div className="absolute bottom-0 hidden h-1 w-full bg-primary group-data-[state=active]:block" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="requests"
                      className="group relative h-full rounded-none border-none p-0 text-xl data-[state=active]:bg-background dark:data-[state=active]:bg-background"
                    >
                      Requests
                      <div className="absolute bottom-0 hidden h-1 w-full bg-primary group-data-[state=active]:block" />
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Separator />
              </div>
            </div>
          </div>
          <TabsContent value="details">
            <DetailsCard />
          </TabsContent>
          <TabsContent value="members">Members</TabsContent>
          <TabsContent value="requests">Requests</TabsContent>
        </Tabs>
      </div>
      <Separator orientation="vertical" />
      <div className="hidden h-full w-64 lg:block" />
    </div>
  );
}
