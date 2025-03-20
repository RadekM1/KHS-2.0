import {
  GiHiking,
  GiMountainClimbing,
  GiSkis,
  GiNewspaper,
} from "react-icons/gi";
import { MdHistory } from "react-icons/md";
import { LiaMountainSolid } from "react-icons/lia";
import { VscChecklist } from "react-icons/vsc";
import { BoulderIcon } from "@/src/components/menu/boulderIcon";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoSchoolOutline, IoPeopleOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoLibraryOutline } from "react-icons/io5";
import { TbMoodBoy } from "react-icons/tb";
import { GoThumbsup } from "react-icons/go";

import { FaPeopleGroup, FaHillAvalanche, FaListCheck } from "react-icons/fa6";
import { FaIcicles, FaRegSnowflake } from "react-icons/fa";

export const menuObject = [
  {
    label: "Novinky",
    link: "/novinky",
    submenu: null,
    mobileIcon: IoIosInformationCircleOutline,
  },
  {
    label: "Články",
    link: null,
    mobileIcon: GiNewspaper,
    submenu: [
      {
        label: "Zobrazit vše",
        description: "Seznam všech článků bez filtrování",
        icon: VscChecklist,
        link: "/clanky",
        isVisible: true,
      },
      {
        label: "Skály",
        description: "Od písky v Ádru až po rulu v Chamonix",
        icon: GiMountainClimbing,
        link: "/clanky?filter=skaly",
        filter: "skaly",
        isVisible: true,
      },
      {
        label: "Horolezectví",
        description: "Vícedélky v tatrách, alpách a občas i exotika",
        icon: LiaMountainSolid,
        link: "/clanky?filter=horolezectvi",
        filter: "horolezectvi",
        isVisible: true,
      },
      {
        label: "Oddíl",
        description: "Oddílové akce, soutěže, školení",
        icon: BoulderIcon,
        link: "/clanky?filter=oddil",
        filter: "oddil",
        isVisible: true,
      },
      {
        label: "Ostatní",
        description: "Zápisky z výprav po celém světě",
        icon: GiHiking,
        link: "/clanky?filter=ostatni",
        filter: "ostatni",
        isVisible: true,
      },
    ],
  },
  {
    label: "Kurzy",
    link: null,
    mobileIcon: IoSchoolOutline,
    submenu: [
      {
        label: "Horoškola - skály",
        link: "/kurzy/horoskola-skaly",
        icon: BoulderIcon,
        isVisible: true,
      },
      {
        label: "Horoškola - vícedélky",
        link: "/kurzy/horoskola-vicedelky",
        icon: GiMountainClimbing,
        isVisible: true,
      },
      {
        label: "Lavinová prevence",
        link: "/kurzy/lavinova-prevence",
        icon: FaHillAvalanche,
        isVisible: true,
      },
      {
        label: "Lezení v ledu",
        link: "/kurzy/lezeni-v-ledu",
        icon: FaIcicles,
        isVisible: true,
      },
      {
        label: "Zimní lezení",
        link: "/kurzy/zimni-lezeni",
        icon: FaRegSnowflake,
        isVisible: true,
      },
      {
        label: "Horokruh - lezecký kroužek",
        link: "/kurzy/horokruh",
        icon: TbMoodBoy,
        isVisible: true,
      },
    ],
  },
  {
    label: "Pro členy",
    link: null,
    mobileIcon: GiSkis,
    submenu: [
      {
        label: "Oddílové akce",
        link: "/clenstvi-v-oddile/oddilove-akce",
        icon: HiOutlineTrophy,
        isVisible: true,
      },
      {
        label: "Knihovna",
        link: "/clenstvi-v-oddile/knihovna",
        icon: IoLibraryOutline,
        isVisible: true,
      },
      {
        label: "Půjčovna vybavení",
        link: "/clenstvi-v-oddile/pujcovna-vybaveni",
        icon: GiSkis,
        isVisible: true,
      },
      {
        label: "Výhody členství",
        link: "/clenstvi-v-oddile/vyhody-clenstvi",
        icon: GoThumbsup,
        isVisible: true,
      },
      {
        label: "Podmínky členství",
        link: "/clenstvi-v-oddile/podminky-clenstvi",
        icon: FaListCheck,
        isVisible: true,
      },
    ],
  },
  {
    label: "O nás",
    link: null,
    mobileIcon: IoPeopleOutline,
    submenu: [
      {
        label: "Historie oddílu",
        link: "/o-nas/historie-oddilu",
        icon: MdHistory,
        isVisible: true,
      },
      {
        label: "Vedení oddílu",
        link: "/o-nas/vedeni-oddilu",
        icon: FaPeopleGroup,
        isVisible: true,
      },
      {
        label: "Instruktoři horoškoly",
        link: "/o-nas/instruktori-horoskoly",
        icon: LiaMountainSolid,
        isVisible: true,
      },
      {
        label: "Trenéři lezení",
        link: "/o-nas/treneri-lezeni",
        icon: BoulderIcon,
        isVisible: true,
      },
    ],
  },
  {
    label: "Kontakt",
    link: "/kontakt",
    mobileIcon: FiPhone,
  },
];

export const oNas = [
  {
    id: 1,
    name: "Historie oddílu",
    href: "/o-nas/historie-oddilu",
    icon: MdHistory,
  },
  {
    id: 2,
    name: "Vedení oddílu",
    href: "/o-nas/vedeni-oddilu",
    icon: FaPeopleGroup,
  },
  {
    id: 3,
    name: "Instruktoři horoškoly",
    href: "/o-nas/instruktori-horoskoly",
    icon: LiaMountainSolid,
  },
  {
    id: 4,
    name: "Trenéři lezení",
    href: "/o-nas/treneri-lezeni",
    icon: BoulderIcon,
  },
];

export const kurzy = [
  {
    id: 1,
    name: "Horoškola - skály",
    href: "/kurzy/horoskola-skaly",
    icon: BoulderIcon,
  },
  {
    id: 2,
    name: "Horoškola - vícedélky",
    href: "/kurzy/horoskola-vicedelky",
    icon: GiMountainClimbing,
  },
  {
    id: 3,
    name: "Lavinová prevence",
    href: "/kurzy/lavinova-prevence",
    icon: FaHillAvalanche,
  },
  {
    id: 4,
    name: "Lezení v ledu",
    href: "/kurzy/lezeni-v-ledu",
    icon: FaIcicles,
  },
  {
    id: 5,
    name: "Zimní lezení",
    href: "/kurzy/zimni-lezeni",
    icon: FaRegSnowflake,
  },
  {
    id: 6,
    name: "Horokruh - lezecký kroužek pro mládež",
    href: "/kurzy/horokruh",
    icon: TbMoodBoy,
  },
];

export const articles = [
  {
    id: 1,
    name: "Skály",
    description: "Od písků v Ádru až po rulu v Chamonix",
    href: "/clanky?filter=skaly",
    filter: "skaly",
    icon: GiMountainClimbing,
  },
  {
    id: 2,
    name: "Horolezectví",
    description: "Vícedélky v tatrách, alpách a občas i exotika",
    href: "/clanky?filter=horolezectvi",
    filter: "horolezectvi",
    icon: LiaMountainSolid,
  },
  {
    id: 3,
    name: "Oddíl",
    description: "Oddílové akce, soutěže, školení",
    href: "/clanky?filter=oddil",
    filter: "oddil",
    icon: BoulderIcon,
  },
  {
    id: 4,
    name: "Ostatní",
    description: "Zápisky z výprav po celém světě",
    href: "/clanky?filter=ostatni",
    filter: "ostatni",
    icon: GiHiking,
  },
];

export const proCleny = [
  {
    id: 1,
    name: "Oddílové akce",
    href: "/clenstvi-v-oddile/oddilove-akce",
    icon: HiOutlineTrophy,
  },
  {
    id: 2,
    name: "Knihovna",
    href: "/clenstvi-v-oddile/knihovna",
    icon: IoLibraryOutline,
  },
  {
    id: 3,
    name: "Půjčovna vybavení",
    href: "/clenstvi-v-oddile/pujcovna-vybaveni",
    icon: GiSkis,
  },
  {
    id: 4,
    name: "Výhody členství",
    href: "/clenstvi-v-oddile/vyhody-clenstvi",
    icon: GoThumbsup,
  },
  {
    id: 5,
    name: "Podmínky členství",
    href: "/clenstvi-v-oddile/podminky-clenstvi",
    icon: FaListCheck,
  },
];
