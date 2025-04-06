// eslint-disable-next-line
export const ArraySort = <T extends Record<string, any>>(
  rows: T[],
  sortingColumn: string,
  sortingOrder: string,
  setRows: (sortedArray: T[]) => void,
) => {
  const sortedArray = [...rows].sort((a, b) => {
    const aValue = a[sortingColumn];
    const bValue = b[sortingColumn];

    const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;

    const parseDate = (dateString: string): Date => {
      const parts = dateString.split(".").map(Number);
      const [day, month, year] = parts as [number, number, number];
      return new Date(year, month - 1, day);
    };

    const isADate = dateRegex.test(aValue);
    const isBDate = dateRegex.test(bValue);

    if (isADate && isBDate) {
      const aDate = parseDate(aValue);
      const bDate = parseDate(bValue);
      return (
        (aDate.getTime() - bDate.getTime()) * (sortingOrder === "asc" ? 1 : -1)
      );
    }

    if (aValue === bValue) return 0;

    return (aValue > bValue ? 1 : -1) * (sortingOrder === "asc" ? 1 : -1);
  });

  setRows(sortedArray);
};

export default ArraySort;
