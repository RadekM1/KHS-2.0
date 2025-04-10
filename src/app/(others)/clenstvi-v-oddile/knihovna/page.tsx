import { BooksTableFrontend } from "@/src/components/tables/books-table-frontend";

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 flex flex-nowrap flex-row text-2xl">
        Knihovna
      </h1>
      <BooksTableFrontend />
    </section>
  );
}
