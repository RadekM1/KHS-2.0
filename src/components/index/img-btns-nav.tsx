import { ImgBtnNav } from "./img-btn-nav";
import Link from "next/link";
import { imgSectionBtns } from "@/src/static-objects/objects/index-img-btns";

export default function ImgBtnsNav() {
  return (
    <div className="grid w-full grid-cols-1 justify-between gap-3 sm:grid-cols-2 mt-5 lg:grid-cols-4">
      {imgSectionBtns.map((image, i) => (
        <Link key={i} href={image.url}>
          <ImgBtnNav {...image} />
        </Link>
      ))}
    </div>
  );
}
