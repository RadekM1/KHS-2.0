export const imgSectionBtns = [
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/course.webp",
    title: "Kurzy",
    alt: "btn picture kurzy",
    url: "/kurzy/uvodni-info",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/benefit.webp",
    title: "Výhody členství",
    alt: "btn picture členství",
    url: "/clenstvi-v-oddile/vyhody-clenstvi",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/for_members.jpg",
    title: "Půjčovna",
    alt: "btn picture půjčovna",
    url: "/clenstvi-v-oddile/pujcovna-vybaveni",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/about_us.jpg",
    title: "O nás",
    alt: "btn picture o nás",
    url: "/o-nas",
  },
] as const;

export const imgArticleBtns = [
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/climb.webp",
    title: "HOROLEZECTVÍ",
    alt: "btn picture horolezectví",
    url: "/clanky?filter=horolezectvi",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/rock.webp",
    title: "SKÁLY",
    alt: "btn picture skály",
    url: "/clanky?filter=skaly",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/oddil.webp",
    title: "ODDÍL",
    alt: "btn picture oddíl",
    url: "/clanky?filter=oddil",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/others.webp",
    title: "OSTATNÍ",
    alt: "btn picture ostatní",
    url: "/clanky?filter=ostatni",
  },
] as const;

export type ImgArticleBtnType = (typeof imgArticleBtns)[number];

export type ImgSectionBtnType = (typeof imgSectionBtns)[number];
