"use client";

import { toast } from "sonner";
import { editEvent } from "../../server-functions/backend/calendar/edit-event";

export const handleEditEvent = async (
  id: number,
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

  if (date.length > 1) {
    toast.error("Upravit lze pouze jednu (vybranou) událost");
    setLoading(false);
    return;
  }
  setLoading(true);

  const tempEventObject = {
    date: date[0].toISOString(),
    event: event,
    startTime: startTime ?? "",
    endTime: endTime ?? "",
    checkBoxDayValue,
    checkBoxNoEndValue,
  };

  const response = await editEvent(id, tempEventObject);
  if (!response.ok) {
    toast.error(response.message);
    setLoading(false);
    return;
  }
  toast.success(response.message);
  setLoading(false);
  fetchData();
};
