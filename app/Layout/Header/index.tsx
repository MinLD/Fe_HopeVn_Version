import HeaderMenuBottom from "@/app/Layout/Header/component/HeaderMenuBottom";
import HeaderMenuTop from "@/app/Layout/Header/component/HeaderMenuTop";
import axios from "axios";

type Props = {
  token?: string | null;
};

const MyHeader = ({ token = "" }: Props) => {
  return (
    <div className="sticky top-0 z-50">
      <HeaderMenuTop token={token || ""} />
      <HeaderMenuBottom />
    </div>
  );
};

export default MyHeader;
