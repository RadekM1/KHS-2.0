'use client'

import { FaPen } from "react-icons/fa";
import { CheckBox } from "../../btns/checkbox";
import { SpinnerSmallOrange } from "../../spinners/spinnerSmallOrange";
import { MdDeleteForever } from "react-icons/md";
import dayjs from "dayjs";
import { czMonths, czDays } from "@/src/static-objects/conts/dates";
import { CalendarEvents } from "@/src/schemas/queries/calendar";

interface CalendarUiProps{
    event: string;
    setEvent: (event: string)=>void
    eventDate: string;
    setEventDate: (eventDate: string)=>void;
    setSelectedDay: (selectedDay: string)=>void;
    startTime: string;
    setStartTime: (startTime: string)=>void;
    endTime: string;
    setEndTime: (endTime:string)=>void;
    editActive: boolean;
    loading: boolean;
    handleEdit: (id:number)=>void;
    handleAdd: ()=>void;
    handleRowEdit: ()=>void;
    handleChange: (checked: boolean, id:string)=>void;
    checkBoxNoEndValue: boolean;
    checkBoxDayValue: boolean;
    sortedRows: CalendarEvents;
    handleDel: (id:number)=>void;
    handleReset: ()=>void;
    date: Date[];
}

export const CalendarInterface = ({
    event,
    setEvent,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    editActive,
    loading,
    handleEdit,
    handleAdd,
    handleRowEdit,
    handleChange,
    checkBoxNoEndValue,
    checkBoxDayValue,
    sortedRows,
    handleDel,
    handleReset,
    date
}: CalendarUiProps) =>{
    return (
        <div className="my-5 flex flex-grow flex-col justify-center align-top lg:self-start">
        <div className="flex flex-col justify-center">
          <div className="flex w-full px-4 flex-grow justify-center">
            <div className="my-1 w-full items-start justify-start flex">
              <input
                type="text"
                value={event}
                placeholder="Název události"
                aria-label="Search content"
                onChange={(e) => setEvent(e.target.value)}
                className="peer relative px-4 h-10 w-full rounded border border-slate-400  pr-12 text-sm  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 "
              />
            </div>
          </div>
          <div className="flex flex-col justify-evenly md:flex-row">
              <ul className="px-5 flex-col m-2 py-3 my-6 border-gray-300 rounded-xl border-[1px] flex">
                <h3 className="text-gray-600 mb-2 dark:text-gray-300">Vybrané datum</h3>
               {date.map((event,i)=>{
                const day = dayjs(event)
                const stringDate = day.format("DD.MM.YYYY")
                return (
                  <li key={i}>
                  {stringDate}
                  </li>
                )
               })}
              </ul>
            <div>
              <form className="mx-auto grid max-w-[16rem] grid-cols-2 gap-4 autofill:bg-white focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400">
                <div className="focus:border-orange-300">
                  <div className="relative my-6 focus:border-orange-300">
                    <input
                      type="time"
                      id="start-time"
                      className="focus-b block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-orange-200 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-500 dark:focus:ring-blue-500"
                      min="09:00"
                      max="18:00"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="relative my-6">
                    <input
                      type="time"
                      id="end-time"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm leading-none text-gray-900 focus:border-blue-500 focus:ring-orange-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      min="09:00"
                      max="18:00"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="mx-3 my-6">
              {!editActive ? (
                <button
                  disabled={loading}
                  onClick={() => handleAdd()}
                  className="mx-4 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-green-500 px-4 text-sm font-medium tracking-wide text-white shadow-md shadow-green-200 transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none dark:bg-green-800 dark:shadow-none dark:hover:bg-green-900"
                >
                  {loading ? <SpinnerSmallOrange /> : <span>Uložit</span>}
                </button>
              ) : (
                <div className="flex flex-row">
                  <button
                    onClick={() => handleRowEdit()}
                    disabled={loading}
                    className="mx-4 inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded bg-green-500 px-4 text-sm font-medium tracking-wide text-white shadow-md shadow-green-200 transition duration-300 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none dark:bg-green-800 dark:shadow-none dark:hover:bg-green-900"
                  >
                    {loading ? (
                      <SpinnerSmallOrange />
                    ) : (
                      <span>Aktualizovat</span>
                    )}
                  </button>

                  <button
                    onClick={() => handleReset()}
                    disabled={loading}
                    className="mx-4 inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-orange-500 px-4 text-xs font-medium tracking-wide text-white shadow-md shadow-orange-200 transition duration-300 hover:bg-orange-600 hover:shadow-sm hover:shadow-orange-200 focus:bg-orange-700 focus:shadow-sm focus:shadow-orange-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none dark:bg-orange-800 dark:shadow-none dark:hover:bg-orange-900 dark:focus:bg-orange-950"
                  >
                    {loading ? <SpinnerSmallOrange /> : <span>Zrušit</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-6 flex flex-row self-center border-b-[1px] border-b-slate-200 dark:border-b-slate-800">
          <CheckBox
            handleChange={handleChange}
            disabled={loading}
            checked={checkBoxDayValue}
            id="checkBoxDay"
            label="celodenní"
          />
          <CheckBox
            handleChange={handleChange}
            disabled={loading}
            checked={checkBoxNoEndValue}
            id="checkBoxNoEnd"
            label="bez ukončení"
          />
        </div>

        <table
          aria-label="Novinky"
          role="feed"
          className="w-full table-auto items-center justify-center self-center text-sm md:ml-5 xl:w-2/3"
        >
          <tbody>
            {sortedRows.map((row) => {
              const tempDay = dayjs(row.date);
              const dayInWeek = tempDay.day();
              const dayInMonth = tempDay.date();
              const checkDay = row.check_whole_day === true ? "celodenní" : "";
              const checkNoEnd = row.check_no_end === true ? "neurčeno" : "";

              const eventStartInCycle = row?.event_start ?? '';
              const eventEndInCycle = row?.event_end ?? '';

              return (
                <tr
                  key={row.id}
                  className="flex border-b-[1px] border-b-slate-200 dark:border-b-slate-800"
                >
                  <td className="flex-shrink py-2 pl-3 text-start text-xs font-thin text-slate-800 dark:text-gray-200 sm:text-sm">
                    {`${dayInMonth}. ${czMonths[tempDay.month()]} (${czDays[dayInWeek]})`}
                  </td>
                  <td className="flex-grow py-2 text-start text-xs font-thin text-slate-800 dark:text-gray-200 sm:text-sm">
                    &nbsp;-{row.event}
                  </td>
                  <td className="flex-shrink py-2 text-end text-xs font-thin text-orange-600 dark:text-orange-200 sm:text-sm">
                    {` ${checkDay && checkDay} ${checkDay ? "" : eventStartInCycle.slice(0,5)} ${checkDay ? "" : "-"} ${checkNoEnd ? checkNoEnd : ""} ${checkDay || checkNoEnd ? "" : eventEndInCycle.slice(0,5)}`}
                  </td>
                  <td>
                    <button
                      disabled={loading}
                      onClick={() => handleDel(row.id)}
                    >
                      {loading ? (
                        ""
                      ) : (
                        <MdDeleteForever className="h-8 w-8 pl-2 text-red-500" />
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      disabled={loading}
                      onClick={() => handleEdit(row.id)}
                    >
                      {loading ? (
                        ""
                      ) : (
                        <FaPen className="h-6 w-6 pl-2 pt-2 text-orange-400" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}