
interface NewsInputsProps{
    title:string;
    disabled: boolean;
    onChange: (value: string, field: string)=>void;
    expirationDate: string;
    summary: string;
}

export const NewsArticleInputs = ({
    title,
    disabled,
    onChange,
    expirationDate,
    summary
} : NewsInputsProps) =>{

    return (
        <>
        <div className="my-2" />
        <div className="w-full border-t-[1px] border-t-gray-300" />
        <div className="mt-6">
            <span className="text-xl">Nadpis</span>
        </div>

        <div className="my-1 mb-2 min-w-[300px] max-w-[400px]">
            <input
            type="text"
            onChange={(e) => onChange(e.target.value, "title")}
            value={title}
            placeholder="Název novinky (titulek)"
            disabled={disabled}
            className="peer relative h-10 w-full rounded border border-slate-400 px-4 pr-12 text-sm text-slate-700 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:text-white"
            />
        </div>

        <div className="my-1 mb-2 mt-4 min-w-[300px] max-w-[400px] dark:text-white">
            <span className="text-xl">Expirace</span>
            <input
            type="date"
            value={expirationDate}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value, "expirationDate")}
            placeholder="expirace zprávy"
            className="peer relative h-10 w-full rounded border border-slate-400 px-4 pr-12 text-sm text-slate-700 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:text-white"
            />
        </div>
        <div className="flex flex-col items-center justify-center">
            <span className="mb-2 mt-6 text-xl">
            Text na úvodní stránku do feedu
            </span>
            <textarea
            onChange={(e) => onChange(e.target.value, "summary")}
            value={summary}
            disabled={disabled}
            rows={4}
            placeholder="Krátký text co jde na index"
            className="min-w-[350px] max-w-[800px] rounded border border-slate-200 p-4 invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 dark:text-white"
            />
        </div>
        <span className="my-3 mb-30 pt-4 text-xl">Článek novinky</span>
        </>
    )
}