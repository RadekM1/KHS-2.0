import NewsFeed from "@/src/components/index/newsFeed";
import Logo from "@/src/components/index/logo";
import { ArticleFeed } from "../components/index/article-feed";
import { ImgBtnsArticles } from "../components/index/img-btns-articles";
import ImgBtnsNav from "../components/index/img-btns-nav";
import { FcCalendar } from "react-icons/fc";
import dayjs from "dayjs";
import { LogoCloudPartners } from "../components/index/logo-cloud-partners";
import { LogoCloudSponsors } from "../components/index/logo-cloud-sponsors";
import CalendarFrontEndCover from "@/src/components/index/calendar-frontend-cover";
import { czMonths } from "@/src/static-objects/conts/dates";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Klub horských sportů Zlín",
  description:
    "Klub horských sportů Zlín, horolezecký oddíl Zlín. Web od lezců pro lezce. Přehled akci a výprav.",
  icons: {
    icon: "/favicon.ico",
  },
  keywords: [
    "horolezectví Zlín",
    "alpinismus",
    "kurzy alpinismu",
    "skalní lezení",
    "bouldering",
    "kroužek lezení",
    "Horolezecký oddíl Zlín",
    "Klub horských sportů Zlín",
  ],
  authors: [{ name: "Radek Morong", url: "https://www.radekmorong.cz" }],
  alternates: {
    canonical: "https://www.khszlin.com/",
  },
};

export default function LandingPart() {
  const year = dayjs().year();
  const currentMonth = dayjs().month();

  return (
    <section className="mb-10 flex w-full flex-col">
      <Logo />
      <div className="mx-auto flex max-w-screen-xl flex-grow flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-4">
        <ImgBtnsNav />
        <div className="relative flex w-full flex-grow flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="relative flex justify-center">
              <ArticleFeed />
            </div>
          </div>
          <div className="mt-10 w-full  lg:w-1/2">
            <div className="flex items-center w-full justify-center">
              <NewsFeed />
            </div>
          </div>
        </div>
        <div />
        <div className="mb-5 mt-10 flex w-full justify-center text-center text-2xl font-bold text-gray-500  dark:text-white">
          Články dle témat
        </div>
        <ImgBtnsArticles />
        <div />
        <div className="mb-20" />
      </div>
      <div className="flex w-full flex-col border-[1px] border-gray-200 dark:bg-zinc-900 bg-white dark:border-gray-900  ">
        <div className="mx-auto my-5 flex max-w-screen-xl flex-grow flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-4">
          <div className="flex w-full justify-center text-center text-2xl font-bold text-gray-500  dark:text-white lg:px-10">
            <div className="mt-10 flex w-full flex-col flex-wrap text-gray-700">
              <div>
                <div className="mb-10 mt-3 flex flex-row justify-center">
                  <div className="flex flex-shrink">
                    <FcCalendar className="h-8 w-8 self-end text-gray-400" />
                  </div>
                  <h2 className="ml-5 flex flex-shrink text-lg dark:text-gray-200 md:text-2xl">
                    {`Kalendář akcí pro ${czMonths[currentMonth]} ${year}`}
                  </h2>
                </div>
              </div>
              <div className="flex w-full">
                <CalendarFrontEndCover />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <LogoCloudPartners />
      </div>
      <div className="mb-10 border border-gray-200 bg-white  dark:border-gray-900 dark:bg-black ">
        <LogoCloudSponsors />
      </div>
    </section>
  );
}
