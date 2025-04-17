"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sendCommentAction } from "@/lib/actions/send-comment";
import type { ActionState } from "@/lib/middleware";
import { GroupComments } from "@/lib/queries";
import { SendIcon } from "lucide-react";
import { useActionState, useOptimistic, useRef } from "react";
import { CommentsList } from "./comments-list";

export function NewMessageForm({
  groupId,
  userName,
  initialComments,
  ownerName,
}: {
  groupId: number;
  userName?: string;
  initialComments: GroupComments;
  ownerName: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [optimisticComments, setOptimisticComments] = useOptimistic(
    initialComments,
    (
      currentComments,
      newComment: { userName: string; message: string; createdAt: Date }
    ) => [newComment, ...currentComments]
  );

  const [newCommentState, newCommentFormAction, _newCommentIsPending] =
    useActionState<ActionState, FormData>(sendCommentAction, { error: "" });

  if (!userName) {
    return null;
  }

  return (
    <>
      <form
        action={(formData) => {
          const newComment = {
            userName,
            message: formData.get("message") as string,
            createdAt: new Date(),
          };
          setOptimisticComments(newComment);
          if (textareaRef.current) {
            textareaRef.current.value = "";
          }
          newCommentFormAction(formData);
        }}
        className="mt-6 flex items-end gap-2 rounded-3xl bg-secondary p-3 transition-colors focus-within:bg-muted-foreground/15 dark:focus-within:bg-muted-foreground/25"
      >
        <Textarea
          ref={textareaRef}
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
      <CommentsList
        comments={optimisticComments}
        ownerName={ownerName}
        userName={userName}
      />
    </>
  );
}
