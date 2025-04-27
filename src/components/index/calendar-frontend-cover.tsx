import { calendarFetch } from "@/src/lib/server-functions/frontend/calendar-fetch";
import { CalendarFrontEnd } from "./calendar-frontend";

export default async function CalendarFrontEndCover() {
  const rows = await calendarFetch();

  return <CalendarFrontEnd rows={rows} />;
}
