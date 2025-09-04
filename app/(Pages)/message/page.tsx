import MessagesPages from "@/app/components/MessagePages";
import ChatBox from "@/app/components/PrivateChat";
import MyLayout from "@/app/Layout/MyLayOut";
import { cookies } from "next/headers";

async function page() {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div>
      <MyLayout>
        <ChatBox token={token || ""} />

        <MessagesPages />
      </MyLayout>
    </div>
  );
}

export default page;
