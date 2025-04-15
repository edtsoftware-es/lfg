'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { sendCommentAction } from '@/lib/actions/send-comment';
import type { ActionState } from '@/lib/middleware';
import { SendIcon } from 'lucide-react';
import { useActionState } from 'react';

export function NewMessageForm({
  groupId,
  userName,
}: { groupId: number; userName?: string }) {
  const [newCommentState, newCommentFormAction, _newCommentIsPending] =
    useActionState<ActionState, FormData>(sendCommentAction, { error: '' });

  if (!userName) {
    return null;
  }

  return (
    <>
      <form
        action={newCommentFormAction}
        className="mt-6 flex items-end gap-2 rounded-3xl bg-secondary p-3 transition-colors focus-within:bg-muted-foreground/15 dark:focus-within:bg-muted-foreground/25"
      >
        <Textarea
          placeholder="What's on your mind?"
          name="message"
          className="max-h-64 min-h-9 w-full resize-none rounded-2xl border-0 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
        <input hidden type="hidden" name="userName" value={userName} />
        <input hidden type="hidden" name="groupId" value={groupId} />
        <Button size="icon" className="rounded-full">
          <SendIcon className="size-4" />
        </Button>
      </form>
      {newCommentState?.error && (
        <p className="pt-2 pl-1 text-destructive">{newCommentState.error}</p>
      )}
    </>
  );
}
