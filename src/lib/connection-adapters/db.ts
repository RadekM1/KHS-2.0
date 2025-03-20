interface QueryParams {
  sqlConnection: any;
  query: string;
  values?: (string | number)[];
}

export const executeQuery = async ({
  sqlConnection,
  query,
  values,
}: QueryParams) => {
  const result = await sqlConnection.query(query, values);
  return result;
};
