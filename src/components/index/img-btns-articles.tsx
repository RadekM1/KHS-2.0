import { ImgBtnArticles } from "./img-btn-articles";
import Link from "next/link";
import { imgArticleBtns } from "@/src/static-objects/objects/index-img-btns";

export const ImgBtnsArticles = () => {
  return (
    <div className="m-10 mt-10 grid w-full grid-cols-2 justify-between gap-4 md:mt-5 lg:grid-cols-4">
      {imgArticleBtns.map((image, i) => (
        <Link key={i} href={image.url}>
          <ImgBtnArticles {...image} />
        </Link>
      ))}
    </div>
  );
};
