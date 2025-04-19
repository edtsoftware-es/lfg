'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { sendMessageAction } from '@/lib/actions/send-message';
import { Loader, SendIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';

const initialState = {
  error: true,
  message: '',
};

export default function Webo() {
  const [newMessageState, newMessageFormAction, newMessageIsPending] =
    useActionState(sendMessageAction, initialState);

  useEffect(() => {
    if (!newMessageState.error) {
      alert(newMessageState.message);
    }
  }, [newMessageState]);

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
                {/* <UserMessage />
                <AssistantMessage /> */}
              </div>
            </ScrollArea>
          </div>
          <div className="sticky bottom-0 flex max-h-64 bg-background px-4 pt-1 pb-3">
            <form
              action={newMessageFormAction}
              className="flex flex-1 items-end gap-2 rounded-3xl bg-secondary p-3 transition-colors focus-within:bg-muted-foreground/15 dark:focus-within:bg-muted-foreground/25"
            >
              <Textarea
                placeholder="What's on your mind?"
                name="message"
                required
                minLength={10}
                className="max-h-full min-h-9 w-full resize-none rounded-2xl border-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
              />
              <Button
                size="icon"
                className="rounded-full"
                disabled={newMessageIsPending}
              >
                {newMessageIsPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <SendIcon className="size-4" />
                )}
              </Button>
              {newMessageState.error && (
                <p className="text-destructive">{newMessageState.error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="hidden h-full w-19 lg:block" />
    </div>
  );
}

function UserMessage({ message }: { message: string }) {
  console.log(message);
  return (
    <div className="ml-auto w-full max-w-10/12 px-4">
      <div className="flex flex-col gap-4 rounded-xl bg-primary px-3 py-2 text-primary-foreground">
        <p>{message}</p>
      </div>
    </div>
  );
}

function AssistantMessage({ text }: { text: string }) {
  return (
    <div className="mr-auto w-full px-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-4 text-foreground">
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
