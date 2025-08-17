import AboutUsShop from "@/app/components/AboutUsShop";
import AgencySection from "@/app/components/AgencySection";
import Banner from "@/app/components/Banner";
import FloatingActionButton from "@/app/components/FloatingActionButton";
import GettingStarted from "@/app/components/GettingStarted";
import HopeJobListing from "@/app/components/HopeJobListing";
import SplashScreen from "@/app/components/Splash Screen";

import MyLayout from "@/app/Layout/MyLayOut";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      {" "}
      <div className="">
        <Banner />
      </div>
      <MyLayout>
        <AgencySection />
        <GettingStarted />
        <AboutUsShop />
        <div className="mt-10 mb-10">
          <HopeJobListing />
        </div>
      </MyLayout>
    </>
  );
}
