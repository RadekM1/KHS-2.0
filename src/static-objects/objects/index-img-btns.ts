export const imgSectionBtns = [
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/course.webp",
    title: "Kurzy",
    url: "/kurzy",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/benefit.webp",
    title: "Výhody členství",
    url: "/clenstvi-v-oddile/vyhody-clenstvi",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/for_members.jpg",
    title: "Půjčovna",
    url: "/clenstvi-v-oddile/pujcovna-vybaveni",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/about_us.jpg",
    title: "O nás",
    url: "/o-nas",
  },
] as const;

export const imgArticleBtns = [
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/climb.webp",
    title: "HOROLEZECTVÍ",
    url: "/clanky?filter=horolezectvi",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/rock.webp",
    title: "SKÁLY",
    url: "/clanky?filter=skaly",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/oddil.webp",
    title: "ODDÍL",
    url: "/clanky?filter=oddil",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/others.webp",
    title: "OSTATNÍ",
    url: "/clanky?filter=ostatni",
  },
] as const;

export type ImgArticleBtnType = (typeof imgArticleBtns)[number];

export type ImgSectionBtnType = (typeof imgSectionBtns)[number];
