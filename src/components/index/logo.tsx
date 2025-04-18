import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex mt-16 text-center flex-col">
      <div className="flex-center flex w-full text-center filter transition duration-500 ease-in-out dark:brightness-75">
        <Image
          src="/launch.webp"
          alt="Landing Image"
          width={1700}
          height={500}
          priority
          className="hidden md:block"
        />
      </div>
    </div>
  );
}
