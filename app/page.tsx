import AboutUsShop from "@/app/components/AboutUsShop";
import AgencySection from "@/app/components/AgencySection";
import Banner from "@/app/components/Banner";
import GettingStarted from "@/app/components/GettingStarted";
import HopeJobListing from "@/app/components/HopeJobListing";

import MyLayout from "@/app/Layout/MyLayOut";

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
