import MedalsPages from "@/app/components/ModalPages";
import MyLayout from "@/app/Layout/MyLayOut";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Huân chương",
};
function page() {
  return (
    <div>
      <MyLayout>
        <MedalsPages />
      </MyLayout>
    </div>
  );
}

export default page;
