import { z } from "zod";

export const eventSchema = z.object({
  id: z.number(),
  date: z.date(),
  event: z.string(),
  event_start: z.string().nullable(),
  event_end: z.string().nullable(),
  check_whole_day: z.boolean(),
  check_no_end: z.boolean(),
});

export const eventsSchema = z.array(eventSchema);

export type CalendarEvent = z.infer<typeof eventSchema>;

export type CalendarEvents = z.infer<typeof eventsSchema>;
