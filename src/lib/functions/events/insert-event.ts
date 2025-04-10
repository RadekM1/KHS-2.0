"use client";

import { toast } from "sonner";
import { insertEvents } from "../../server-functions/backend/calendar/insert-events";

export const handleAdd = async (
  event: string,
  endTime: string,
  startTime: string,
  checkBoxDayValue: boolean,
  checkBoxNoEndValue: boolean,
  setLoading: (loading: boolean) => void,
  date: Date[],
  fetchData: () => void,
) => {
  if (!event || event.trim() === "") {
    toast.error("Není zadaný název události");
    setLoading(false);
    return;
  }

  if (!startTime && checkBoxDayValue === false) {
    toast.error("Není zadaný čas události");
    setLoading(false);
    return;
  }

  if (date.length === 0) {
    toast.error("Není zadané datum dálosti");
    setLoading(false);
    return;
  }
  setLoading(true);

  const tempEventObject = date.map((eventDate) => {
    eventDate.setHours(12, 0, 0, 0);
    return {
      date: eventDate.toISOString(),
      event: event,
      startTime: startTime ?? "00:00",
      endTime: endTime ?? "00:00",
      checkBoxDayValue,
      checkBoxNoEndValue,
    };
  });

  const response = await insertEvents(tempEventObject);
  if (!response.ok) {
    toast.error(response.message);
    setLoading(false);
    return;
  }
  toast.success(response.message);
  setLoading(false);
  fetchData();
};
