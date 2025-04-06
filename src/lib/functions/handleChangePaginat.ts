export const handleChangePaginat = (
  value: number,
  setCurrentPage: (page: number) => void,
): void => {
  const temp = value;
  setCurrentPage(temp);
};
