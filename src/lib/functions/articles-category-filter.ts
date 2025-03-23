import { ParsedPostCardSchema } from "@/src/schemas/queries/articles";

export const categoryFilter = (
  hory: boolean,
  skaly: boolean,
  oddil: boolean,
  ostatni: boolean,
  row: ParsedPostCardSchema,
) => {
  if (skaly && row.category.toLowerCase().includes("skaly")) {
    return true;
  }

  if (hory && row.category.toLowerCase().includes("hory")) {
    return true;
  }

  if (oddil && row.category.toLowerCase().includes("oddil")) {
    return true;
  }

  if (ostatni && row.category.toLowerCase().includes("ostatni")) {
    return true;
  }

  return false;
};
