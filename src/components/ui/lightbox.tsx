"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { Slide } from "yet-another-react-lightbox";
import { Captions } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import { Video } from "yet-another-react-lightbox/plugins";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { ImgInGallerySchema } from "@/src/schemas/gallery";

interface lightBoxProps {
  input: ImgInGallerySchema[];
  active: number;
  toggler: boolean;

  setToggler: (toggler: boolean) => void;
}

const LightBox = ({ input, active, toggler, setToggler }: lightBoxProps) => {
  const filteredInput: Slide[] = input.map((item) => {
    if (item.media_type === "video") {
      return {
        type: "video",
        sources: [{ src: item.src, type: "video/mp4" }],
        poster: item?.thumbnail ?? "",
        description: item.description,
      };
    } else {
      return {
        src: item.src,
        alt: item.alt,
        type: "image",
        description: item.description,
      };
    }
  });

  return (
    <>
      <Lightbox
        key={active}
        open={toggler}
        close={() => setToggler(false)}
        slides={filteredInput}
        index={active}
        plugins={[Fullscreen, Captions, Video]}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        }}
        render={{
          iconPrev: () => <IoIosArrowDropleftCircle className="h-12 w-12" />,
          iconNext: () => <IoIosArrowDroprightCircle className="h-12 w-12" />,
        }}
      />
    </>
  );
};

export default LightBox;
