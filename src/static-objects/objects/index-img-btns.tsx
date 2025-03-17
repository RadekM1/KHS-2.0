export const imgSectionBtns = [
  {
    src: "https://storage.googleapis.com/khs-zlin/horoskola_main.jpg",
    title: "Kurzy",
    url: "/kurzy",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/vyhody3.png",
    title: "Výhody členství",
    url: "/clenstvi-v-oddile/vyhody-clenstvi",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/for_members.jpg",
    title: "Pro členy",
    url: "/clenstvi-v-oddile",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/about_us.jpg",
    title: "O nás",
    url: "/o-nas",
  },
] as const;

export const imgArticleBtns = [
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/horolezectvi.png",
    title: "HOROLEZECTVÍ",
    url: "/clanky?filter=horolezectvi",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/skalni_lezeni.jpg",
    title: "SKÁLY",
    url: "/clanky?filter=skaly",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/picture_btn/oddil.jpeg",
    title: "ODDÍL",
    url: "/clanky?filter=oddil",
  },
  {
    src: "https://storage.googleapis.com/khs-zlin/blog/blog4.jpg",
    title: "OSTATNÍ",
    url: "/clanky?filter=ostatni",
  },
] as const;

export type ImgArticleBtnType = (typeof imgArticleBtns)[number];

export type ImgSectionBtnType = (typeof imgSectionBtns)[number];
