
import { GiNewspaper } from "react-icons/gi";
import {
  MdRssFeed,
  MdAccountCircle,
} from "react-icons/md";
import { RiBook3Line } from "react-icons/ri";
import { LuCalendarRange } from "react-icons/lu";
import { IoLibraryOutline } from "react-icons/io5";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { CiLogout, CiLogin } from "react-icons/ci"

export const dashboardMenuData = [
    {
      label: 'Články', link: '/dashboard/dashboard-clanky', icon: GiNewspaper, clearance: ['member', 'editor','admin']
    },
    {
      label: 'Novinky', link: '/dashboard/dashboard-novinky', icon: MdRssFeed, clearance: ['editor','admin']
    },
    {
      label: 'Kalendář', link: '/dashboard/kalendar', icon: LuCalendarRange, clearance: ['editor','admin']
    },
    {
      label: 'Knihovna', link: '/dashboard/knihovna', icon: IoLibraryOutline, clearance: ['editor','admin']
    },
    {
      label: 'Půjčovna', link: '/dashboard/pujcovna', icon: RiBook3Line, clearance: ['editor','admin']
    },
    {
      label: 'Profil', link: '/dashboard/profil', icon: GiNewspaper, clearance: ['user','member','editor','admin']
    },
    {
      label: 'Uživatelé', link: '/dashboard/uzivatele', icon: MdAccountCircle, clearance: ['admin']
    },
  ]



  export const sessionStateMenu = [
    {label: 'Odhlásit', icon: CiLogout, action:'logout',  isSession: true, link: '#' },
    {label: 'Přihlásit', icon: CiLogin, action: 'login',  isSession: false, link: '/login'},
    {label: 'Registrovat', icon: HiOutlineUserPlus, action: 'registration', isSession: false, link: '/registration' }
  ];
