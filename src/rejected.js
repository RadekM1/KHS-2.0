import { BsSignStopFill } from "react-icons/bs";

export default function Rejected() {
  return (
    <div className="m-12 flex flex-row items-center justify-center p-3">
      <div>
        <BsSignStopFill className="h-[50px] w-[50px] text-xl text-red-500" />
      </div>
      <div>
        <span className="m-4 text-red-500">Nedostatečná oprávnění</span>
      </div>
    </div>
  );
}
