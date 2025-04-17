"use server";

import { db } from "@/db/drizzle";
import { groupComments } from "@/db/schema";
import { z } from "zod";
import { to } from "../await-to";
import { validatedAction } from "../middleware";
import { revalidateTag } from "next/cache";

export type NewMessageFormState = {
  error?: boolean;
  message: string;
  payload?: FormData;
};

const newCommentSchema = z.object({
  userName: z.string().min(3),
  groupId: z.string().min(1),
  message: z.string().min(1),
});

export const sendCommentAction = validatedAction(
  newCommentSchema,
  async (data) => {
    const { message, groupId, userName } = data;

    const [error, _result] = await to(
      db
        .insert(groupComments)
        .values({ message: message, userName: userName, groupId: +groupId })
        .returning()
    );

    if (error) {
      return {
        error: "An error occurred while submitting the comment.",
      };
    }

    revalidateTag("groups");
  }
);
