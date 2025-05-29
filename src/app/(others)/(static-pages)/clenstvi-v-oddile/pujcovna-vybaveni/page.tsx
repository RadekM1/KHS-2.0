import { RentalTableFrontend } from "@/src/components/tables/rental-table-frontend";

export default function page() {
  return (
    <section className="w-full flex min-h-screen flex-col text-gray-800 dark:text-white items-center text-center">
      <h1 className="items-center my-4 flex flex-nowrap flex-row text-2xl">
        Půjčovna vybavení
      </h1>
      <RentalTableFrontend />
    </section>
  );
}
