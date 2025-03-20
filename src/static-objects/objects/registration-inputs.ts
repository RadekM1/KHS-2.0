import { MdOutlinePersonOutline } from "react-icons/md";
import { IconType } from "react-icons/lib";
import { MdOutlineMail } from "react-icons/md";

export const inputs: {
  label: string;
  name: "firstName" | "lastName" | "email";
  type: "text" | "email";
  icon: IconType;
}[] = [
  {
    label: "Jméno",
    name: "firstName",
    type: "text",
    icon: MdOutlinePersonOutline,
  },
  {
    label: "Příjmení",
    name: "lastName",
    type: "text",
    icon: MdOutlinePersonOutline,
  },
  { label: "E-mail", name: "email", type: "email", icon: MdOutlineMail },
];
