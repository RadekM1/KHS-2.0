import { ImgArticleBtnType } from "@/src/static-objects/objects/index-img-btns";

export const ImgBtnArticles = (img: ImgArticleBtnType) => {
  return (
    <div className="h-[200px] md:h-[280px] relative group   text-white w-full">
      <img
        alt={img.title}
        className="object-cover brightness-[0.4] group-hover:brightness-[0.6] transform-gpu transition-all ease-in-out duration-300 h-full w-full"
        src={img.src}
      />
      <p className="absolute  text-2xl font-bold text-nowrap top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        {img.title}
      </p>
      <span className="absolute top-[80%] -translate-y-[80%] h-1 opacity-100 group-hover:opacity-0 transform-gpu transition-all ease-in-out duration-300 bg-white w-5 font-bold text-xl left-1/2 -translate-x-1/2"></span>
    </div>
  );
};
