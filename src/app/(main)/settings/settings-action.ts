"use server";

import { authActionClient } from "@lib/safe-action";
import { revalidatePath } from "next/cache";
import z from "zod";

export const getSettings = authActionClient.action(async ({ ctx }) => {
  return await ctx.db.user.findUnique({
    where: { externalUserId: ctx.user.externalUserId },
  });
});

const updateEmailNotificationSettingsSchema = z.object({
  sendUpcomingReminder: z.boolean(),
  sendDailyDigest: z.boolean(),
  sendWeeklyReport: z.boolean(),
});

export const updateEmailNotificationSettings = authActionClient
  .schema(updateEmailNotificationSettingsSchema)
  .action(async ({ ctx, parsedInput }) => {
    await ctx.db.user.update({
      where: { externalUserId: ctx.user.externalUserId },
      data: parsedInput,
    });
    return revalidatePath("/settings");
  });

const updateNotifSettingsSchema = z.object({
  sendNotifReminder: z.boolean(),
  sendUpcomingNotifReminder: z.boolean(),
  sendAchievementAlert: z.boolean(),
  sendStreakReminder: z.boolean(),
});

export const updateNotifSettings = authActionClient
  .schema(updateNotifSettingsSchema)
  .action(async ({ ctx, parsedInput }) => {
    await ctx.db.user.update({
      where: { externalUserId: ctx.user.externalUserId },
      data: parsedInput,
    });
    return revalidatePath("/settings");
  });
