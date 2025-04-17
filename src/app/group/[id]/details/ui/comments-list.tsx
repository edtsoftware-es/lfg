"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { GroupComments } from "@/lib/queries";
import { format } from "date-fns";
interface CommentsListProps {
  comments: GroupComments;
  ownerName: string;
  userName: string | undefined;
}

export function CommentsList({
  comments,
  ownerName,
  userName,
}: CommentsListProps) {
  return (
    <div className="mt-6 space-y-4">
      {comments.map((comment, index) => (
        <Card key={index} className="bg-background">
          <CardHeader
            className={`flex flex-col justify-between md:flex-row md:items-center md:gap-4 ${
              comment.userName === userName && "bg-red"
            }`}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="link"
                size="sm"
                className="p-0 font-bold text-base text-foreground"
              >
                {comment.userName}
              </Button>
              {comment.userName === ownerName && (
                <Crown className="size-5" color="#ffaa00" />
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              {format(comment.createdAt, "dd/MM/yyyy, HH:mm:ss")}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-base text-foreground">{comment.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
