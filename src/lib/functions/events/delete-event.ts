'use client'

import { toast } from "sonner";
import { deleteEvent } from "../../server-functions/backend/calendar/delete-event";

export const handleDeleteEvent = async (
    id:number,
    setLoading: (loading: boolean)=>void,
    fetchData: ()=>void
) =>{
    setLoading(true);
        const confirmed = confirm(
          "opravdu chcete smazat tuto událost z kalendáře ?",
        );
        if (!confirmed) {
          return;
        }
        const response = await deleteEvent(id)
        if(!response.ok){
          setLoading(false)
          toast.error(response.message)
          return
        }
        fetchData();
        setLoading(false);
    }