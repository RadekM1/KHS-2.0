"use client";

import { Calendar } from "../ui/calendar/calendar";
import { cs } from "date-fns/locale";
import { CalendarEventsTable } from "./calendar-events";
import { CalendarEvents } from "@/src/schemas/queries/calendar";

export const CalendarFrontEnd = ({ rows }: { rows: CalendarEvents }) => {
  const selected: Date[] = rows.map((event) => new Date(event.date));

  return (
    <div className="flex w-full flex-col items-center justify-center lg:flex-row">
      <Calendar
        disabled={true}
        selected={selected}
        disableNavigation={true}
        mode="multiple"
        locale={cs}
        className="calendar-no-arrows rounded-xl justify-center self-center items-center individual-calendar dark:bg-zinc-800  border-[1px] border-gray-300 p-4 dark:border-gray-600 text-gray-800 dark:text-white text-base"
      />
      <CalendarEventsTable rows={rows} />
    </div>
  );
};
