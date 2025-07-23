import HeaderMenuBottom from "@/app/Layout/Header/component/HeaderMenuBottom";
import HeaderMenuTop from "@/app/Layout/Header/component/HeaderMenuTop";

function MyHeader() {
  return (
    <div className="sticky top-0 z-50">
      <HeaderMenuTop />
      <HeaderMenuBottom />
    </div>
  );
}

export default MyHeader;
