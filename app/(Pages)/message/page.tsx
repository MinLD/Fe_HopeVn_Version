import MessagesPages from "@/app/components/MessagePages";
import MyLayout from "@/app/Layout/MyLayOut";
import { GetAllUsersIbed } from "@/app/service/message";
import { Ty_MessageBox } from "@/app/types/message";
import { cookies } from "next/headers";

async function page() {
  const token = (await cookies()).get("authToken")?.value;
  let dataMessageBox: Ty_MessageBox[] = [] as Ty_MessageBox[];
  const handleGetAllMessageBox = async () => {
    try {
      const response = await GetAllUsersIbed(token || "");
      if (response.status === 200) {
        console.log(response.data.result);
        dataMessageBox = response?.data?.result;
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  await handleGetAllMessageBox();
  console.log("dataMessageBox", dataMessageBox);
  return (
    <div>
      <MyLayout>
        {/* <ChatBox token={token || ""} /> */}

        <MessagesPages dataMessageBox={dataMessageBox} token={token || ""} />
      </MyLayout>
    </div>
  );
}

export default page;
