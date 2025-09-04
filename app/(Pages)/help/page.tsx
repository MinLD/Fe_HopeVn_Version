import { Ty_PostVolunteer } from "@/app/components/PendingCompanyCard";
import PostsLoadingSkeleton from "@/app/components/PostsLoadingSkeleton";
import HelpPage from "@/app/componentsPostHelp/HelpsPage";
import { getAllPost, GetAllPostVolunteer } from "@/app/service/User";
import { dataPost as DataPostType } from "@/app/types/post"; // Đổi tên để tránh xung đột
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Giúp đỡ",
};
async function page() {
  const token = (await cookies()).get("authToken")?.value;
  let isLoading = true;

  // Khai báo biến để lưu dữ liệu
  let dataPost: DataPostType[] = [];
  let dataPostVolunteer: Ty_PostVolunteer[] = [];
  let dataPostFree: DataPostType[] = [];
  let dataPostRequestHelp: DataPostType[] = [];
  let dataPostGive: DataPostType[] = [];
  try {
    // Gọi cả hai API đồng thời bằng Promise.all
    const [postRes, volunteerRes] = await Promise?.all([
      getAllPost(),
      GetAllPostVolunteer(),
    ]);

    // Gán dữ liệu sau khi cả hai promise đã hoàn thành
    // Thêm '|| []' để phòng trường hợp API không trả về dữ liệu như mong đợi
    dataPost = postRes.data.result.data || [];
    dataPostVolunteer = volunteerRes.data.result.data || [];

    isLoading = false;
  } catch (err) {
    // Xử lý lỗi nếu một trong các cuộc gọi API thất bại
    console.error("Lỗi khi lấy dữ liệu bài viết:", err);
    // Trong ứng dụng thực tế, bạn có thể muốn hiển thị một trang lỗi ở đây
    isLoading = false;
  }

  // Sử dụng dữ liệu trong component
  const categorizedPosts = dataPost.reduce(
    (accumulator, post) => {
      if (post.type === "Tự do") {
        accumulator.free.push(post);
      } else if (post.type === "Yêu cầu Hỗ trợ") {
        accumulator.requestHelp.push(post);
      } else if (post.type === "Trao tặng / Góp sức") {
        accumulator.give.push(post);
      }
      return accumulator;
    },
    {
      free: [] as DataPostType[],
      requestHelp: [] as DataPostType[],
      give: [] as DataPostType[],
    }
  );

  dataPostFree = categorizedPosts.free;
  dataPostRequestHelp = categorizedPosts.requestHelp;
  dataPostGive = categorizedPosts.give;

  console.log(dataPost);

  // Bây giờ, câu lệnh return sẽ chỉ chạy SAU KHI dữ liệu đã được lấy xong
  return (
    <>
      <Suspense fallback={<PostsLoadingSkeleton />}>
        <HelpPage
          token={token || ""}
          dataPost={dataPost}
          dataPostVolunteer={dataPostVolunteer}
          dataPostFree={dataPostFree}
          dataPostRequestHelp={dataPostRequestHelp}
          dataPostGive={dataPostGive}
          isLoading={isLoading}
        />
      </Suspense>
    </>
  );
}

export default page;
