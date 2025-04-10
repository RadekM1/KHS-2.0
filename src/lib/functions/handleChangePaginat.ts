export const handleChangePaginat = (
  _event: React.ChangeEvent<HTMLElement>,
  value: string,
  setCurrentPage: (page: string) => void
) => {
  const temp = value;
  setCurrentPage(temp);
};
