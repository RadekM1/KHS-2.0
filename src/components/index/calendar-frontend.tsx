"use client";

import React, { useState, useEffect } from "react";
import { SpinnerBigOrange } from "../spinners/spinnerBigOrange";
import { calendarFetch } from "@/src/lib/server-functions/frontend/calendar-fetch";
import { CalendarEvents } from "@/src/schemas/queries/calendar";
import { Calendar } from "../ui/calendar/calendar";
import { cs } from "date-fns/locale";
import { CalendarEventsTable } from "./calendar-events";

export const CalendarFrontEnd = () => {
  const [rowsLoading, setRowsLoading] = useState(false);
  const [rows, setRows] = useState<CalendarEvents>([]);
  const [selected, setSelected] = useState<Date[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setRowsLoading(true);
    const response = await calendarFetch();
    setRows(response.data ?? []);
    const tempDate = response.data?.map((row) => row.date) ?? [];
    setSelected(tempDate);
    setRowsLoading(false);
  };

  return (
    <div className="flex w-full flex-col lg:flex-row">
      {rowsLoading ? (
        <SpinnerBigOrange />
      ) : (
        <>
          <Calendar
            disabled={true}
            selected={selected}
            disableNavigation={true}
            mode="multiple"
            locale={cs}
            className="calendar-no-arrows rounded-xl individual-calendar dark:bg-zinc-800  border-[1px] border-gray-300 p-4 dark:border-gray-600 text-gray-800 dark:text-white text-base"
          />
          <CalendarEventsTable rows={rows} />
        </>
      )}
    </div>
  );
};
