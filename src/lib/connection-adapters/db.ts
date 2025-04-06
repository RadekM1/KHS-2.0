interface QueryParams {
  //eslint-disable-next-line
  sqlConnection: any;
  query: string;
  values?: (string | number | JSON | boolean)[];
}

export const executeQuery = async ({
  sqlConnection,
  query,
  values,
}: QueryParams) => {
  const result = await sqlConnection.query(query, values);
  return result;
};
