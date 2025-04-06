'use client'

import { CheckboxWithText } from "../ui/inputs/checkbox";

interface NewsInputsProps{
    title:string;
    disabled: boolean;
    onChange: (value: string, field: string)=>void;
    active: boolean;
    setActive: (isActive: boolean)=>void;
}

export const NewsArticleInputs = ({
    title,
    disabled,
    onChange,
    active,
    setActive,
} : NewsInputsProps) =>{

    const handleCheckbox = () =>{
        setActive(!active)
    }

    return (
        <div className="w-full justify-center flex flex-col items-center gap-5">
            <h2 className="text-xl mt-5">Nadpis</h2>
            <div className="mb-2 min-w-[300px] max-w-[400px]">
                <input
                type="text"
                onChange={(e) => onChange(e.target.value, "title")}
                value={title}
                placeholder="Název novinky (titulek)"
                disabled={disabled}
                className="peer relative h-10 w-full rounded border border-slate-400 px-4 pr-12 text-sm text-slate-700 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:text-white"
                />
            </div>
            <CheckboxWithText 
                key={1}
                handleChange={() => handleCheckbox()}
                checked={active}
                id="news-active"
                label="Aktivní"
            />
            <span className="my-3 mb-30 pt-4 text-xl">Článek novinky</span>
        </div>
    )
}