import { MdError } from "react-icons/md";

const Custom404 = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
    <div className="my-44 flex flex-row items-center justify-center p-3">
      <div>
        <MdError className="h-[50px] w-[50px] text-xl text-orange-500" />
      </div>
      <div>
        <span className="m-4 text-orange-500">Stránka neexistuje</span>
      </div>
    </div>
</div>
  );
};
export default Custom404;
