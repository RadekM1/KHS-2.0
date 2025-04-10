"use client";

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { CalendarInterface } from "./calendar-interface";
import { LinearProgressBar } from "../../spinners/linear";
import { CalendarEvents } from "@/src/schemas/queries/calendar";
import { toast } from "sonner";
import { getEvents } from "@/src/lib/server-functions/backend/calendar/get-events";
import { Calendar } from "@/src/components/ui/calendar/calendar";
import { cs } from "date-fns/locale";
import { handleAdd } from "@/src/lib/functions/events/insert-event";
import { handleDeleteEvent } from "@/src/lib/functions/events/delete-event";
import { handleEditEvent } from "@/src/lib/functions/events/edit-event";

export const AdminCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState("");

  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<CalendarEvents>([]);
  const [idToHandle, setIdToHandle] = useState(0);
  const [event, setEvent] = useState("");
  const [eventDate, setEventDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [startTime, setStartTime] = useState("09:00:00");
  const [endTime, setEndTime] = useState("15:00:00");
  const [checkBoxDayValue, setCheckBoxDayValue] = useState(false);
  const [checkBoxNoEndValue, setCheckBoxNoEndValue] = useState(false);
  const [editActive, setEditActive] = useState(false);
  const [date, setDate] = React.useState<Date[]>([new Date()]);

  const handleEdit = (id: number) => {
    const row = rows.find((row) => id === row.id);
    if (!row) {
      return;
    }
    setEditActive(true);
    setIdToHandle(id);
    setEvent(row.event ?? "");
    setEventDate(row.date ? dayjs(row.date).format("YYYY-MM-DD") : "");
    setStartTime(row.event_start ?? "9:00:00");
    setEndTime(row.event_end ?? "15:00:00");
    setCheckBoxDayValue(row.check_whole_day);
    setCheckBoxNoEndValue(row.check_no_end);
    setDate(row.date ? [row.date] : [new Date()]);
  };

  const handleChange = (checked: boolean, id: string) => {
    const tempVal = checked;
    const tempId = id;

    if (tempId === "checkBoxNoEnd" && tempVal === true) {
      setCheckBoxDayValue(false);
    } else if (tempId === "checkBoxDay" && tempVal === true) {
      setCheckBoxNoEndValue(false);
    }
    switch (tempId) {
      case "checkBoxNoEnd":
        setCheckBoxNoEndValue(tempVal);
        if (tempVal === true) {
          setEndTime("00:00");
        }
        break;
      case "checkBoxDay":
        setCheckBoxDayValue(tempVal);
        if (tempVal === true) {
          setStartTime("00:00");
          setEndTime("00:00");
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredRows = rows.filter((row) => {
    const eventDate = dayjs(row.date);
    return eventDate.isSame(currentMonth, "month");
  });

  const sortedRows = filteredRows.sort((a, b) =>
    dayjs(a.date).isBefore(b.date) ? -1 : 1,
  );

  const fetchData = async () => {
    setLoading(true);
    const response = await getEvents();
    if (!response.ok) {
      toast.error(response.message);
      setLoading(false);
      return;
    }
    setRows(response.rows);
    setLoading(false);
    handleReset();
  };

  const handleDel = (id: number) => {
    handleDeleteEvent(id, setLoading, fetchData);
  };

  const handleReset = () => {
    setEditActive(false);
    setIdToHandle(0);
    setEvent("");
    setEventDate(selectedDay);
    setStartTime("09:00");
    setEndTime("15:00");
    setCheckBoxDayValue(false);
    setCheckBoxNoEndValue(false);
    setDate([new Date()]);
  };

  const handleAddEvent = () => {
    handleAdd(
      event,
      endTime,
      startTime,
      checkBoxDayValue,
      checkBoxNoEndValue,
      setLoading,
      date,
      fetchData,
    );
  };

  const handleRowEdit = () => {
    handleEditEvent(
      idToHandle,
      event,
      endTime,
      startTime,
      checkBoxDayValue,
      checkBoxNoEndValue,
      setLoading,
      date,
      fetchData,
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full min-h-[4px]">
        {loading && <LinearProgressBar />}
      </div>
      <div className="mx-3 flex w-full flex-col lg:flex-row">
        <Calendar
          onMonthChange={(month) => setCurrentMonth(dayjs(month))}
          selected={date}
          onSelect={setDate}
          mode="multiple"
          locale={cs}
          className="calendar-no-arrows max-h-min rounded-xl individual-calendar dark:bg-zinc-800  border-[1px] border-gray-300 p-4 dark:border-gray-600 text-gray-800 dark:text-white text-base"
        />
        <CalendarInterface
          event={event}
          setEvent={setEvent}
          eventDate={eventDate}
          setEventDate={setEventDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          checkBoxDayValue={checkBoxDayValue}
          checkBoxNoEndValue={checkBoxNoEndValue}
          handleChange={handleChange}
          handleAdd={handleAddEvent}
          handleReset={handleReset}
          editActive={editActive}
          handleRowEdit={handleRowEdit}
          loading={loading}
          sortedRows={sortedRows}
          handleEdit={handleEdit}
          handleDel={handleDel}
          setSelectedDay={setSelectedDay}
          date={date}
        />
      </div>
    </div>
  );
};
