import { CalendarEvents } from "@/src/schemas/queries/calendar";
import dayjs from "dayjs";
import { czDays, czMonths } from "@/src/static-objects/conts/dates";

export const CalendarEventsTable = ({ rows }: { rows: CalendarEvents }) => {
  return (
    <table
      aria-label="tabulka akcí v měsíci"
      role="event feed"
      className="w-full h-full table-auto items-center justify-center self-center text-sm md:ml-5 xl:w-2/3"
    >
      <tbody>
        {rows.map((row) => {
          const tempDay = dayjs(row.date);
          const dayInWeek = tempDay.day();
          const dayInMonth = tempDay.date();
          let eventStartInCycle;
          let eventEndInCycle;
          const eventStartTime = new Date(`1970-01-01T${row.event_start}`);
          const formattedEventStart = eventStartTime.toTimeString().slice(0, 5);
          const eventEndTime = new Date(`1970-01-01T${row.event_end}`);
          const formattedEventEnd = eventEndTime.toTimeString().slice(0, 5);
          const checkDay = row.check_whole_day === true ? "celodenní" : "";
          const checkNoEnd = row.check_no_end === true ? "neurčeno" : "";
          eventStartInCycle = row.event_start ? formattedEventStart : "";
          eventEndInCycle = row.event_end ? formattedEventEnd : "";

          return (
            <tr
              key={row.id}
              className="flex border-b-[1px] border-b-slate-200 dark:border-b-slate-800"
            >
              <td className="flex-shrink py-2 pl-3 text-start text-xs font-thin text-slate-800 dark:text-gray-200 sm:text-sm">
                {`${dayInMonth}. ${czMonths[tempDay.month()]} (${czDays[dayInWeek]})`}
              </td>
              <td className="flex-grow py-2 text-start text-xs font-thin text-slate-800 dark:text-gray-200 sm:text-sm">
                {` - ${row.event}`}
              </td>
              <td className="flex-shrink py-2 text-end text-xs font-thin text-orange-600 dark:text-orange-200 sm:text-sm">
                {` ${checkDay && checkDay} ${checkDay ? "" : eventStartInCycle} ${checkDay ? "" : "-"} ${checkNoEnd ? checkNoEnd : ""} ${checkDay || checkNoEnd ? "" : eventEndInCycle}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
