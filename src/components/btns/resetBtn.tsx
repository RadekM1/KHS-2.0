"use client";

interface ResetBtnProps {
  handleReset: () => void;
}

export const ResetBtn: React.FC<ResetBtnProps> = ({ handleReset }) => {
  return (
    <button
      onClick={handleReset}
      className="dark:hover:bg-orage-800 flex self-center h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-orange-50 px-5 text-sm font-medium tracking-wide text-orange-500 shadow-md shadow-orange-100 transition duration-300 hover:bg-orange-100 hover:text-orange-900 hover:shadow-md hover:shadow-orange-100 disabled:cursor-not-allowed disabled:border-orange-100 disabled:bg-orange-100 disabled:shadow-none dark:bg-orange-700 dark:text-white dark:shadow-none dark:hover:text-gray-200 dark:hover:shadow-none dark:disabled:border-orange-800 dark:disabled:bg-orange-600"
    >
      <span>Resetovat filtr</span>
    </button>
  );
};
