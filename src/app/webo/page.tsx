import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { SendIcon } from 'lucide-react';

function UserMessage() {
  return (
    <div className="ml-auto w-full max-w-10/12 px-4">
      <div className="flex flex-col gap-4 rounded-xl bg-primary px-3 py-2 text-primary-foreground">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          in dolorum placeat optio explicabo! Veritatis necessitatibus eius
          facere molestiae officiis. Adipisci tenetur aliquam quisquam nulla ex
          error minus? Nemo, quia.
        </p>
      </div>
    </div>
  );
}

function AssistantMessage() {
  return (
    <div className="mr-auto w-full px-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 text-foreground">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis ab
            accusamus porro! Architecto dolorum animi quod! Maiores debitis
            tenetur sunt fugit. Soluta asperiores eaque aut sequi, neque iure
            voluptate quos!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum alias
            dicta similique quaerat vitae mollitia pariatur fugiat praesentium
            at! Eligendi numquam facilis tenetur veniam architecto, nisi hic
            quasi? Perferendis, obcaecati?
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Webo() {
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <div className="sticky top-0 z-10 flex flex-col">
          <div className="bg-background/95 pt-1 backdrop-blur-sm">
            <div className="flex h-16 items-center px-4">
              <h2 className="font-bold text-xl">Webo</h2>
            </div>
          </div>
          <Separator />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 px-4 py-6">
            <ScrollArea>
              <div className="flex flex-col gap-6">
                <UserMessage />
                <AssistantMessage />
                <UserMessage />
                <AssistantMessage />
                <UserMessage />
                <AssistantMessage />
              </div>
            </ScrollArea>
          </div>
          <div className="sticky bottom-0 flex max-h-64 bg-background px-4 pt-1 pb-3">
            <div className="flex flex-1 items-end gap-2 rounded-3xl bg-secondary p-3 transition-colors focus-within:bg-muted-foreground/15 dark:focus-within:bg-muted-foreground/25">
              <Textarea
                placeholder="What's on your mind?"
                className="max-h-full min-h-9 w-full resize-none rounded-2xl border-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
              />
              <Button size="icon" className="rounded-full">
                <SendIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="hidden h-full w-19 lg:block" />
    </div>
  );
}
