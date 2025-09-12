import NoResults from "@/app/components/NoResults";
import MyLayout from "@/app/Layout/MyLayOut";
import { SearchAll } from "@/app/service/search";
import { Ty_Search } from "@/app/types/search";
import { dataPost as DataPostType } from "@/app/types/post"; // Đổi tên để tránh xung đột
import { Ty_PostVolunteer } from "@/app/components/PendingCompanyCard";
import { JobPostingProps } from "@/app/componentEmployer/JobPosting";
import SearchPage from "@/app/components/SearchPage";
import { cookies } from "next/headers";
interface TopSearchPageProps {
  searchParams: {
    q: string;
  };
}

export default async function TopSearchPage({
  searchParams,
}: TopSearchPageProps) {
  const { q: keyword } = await searchParams;
  const token = (await cookies()).get("authToken")?.value;
  let searchData: Ty_Search[] = [] as Ty_Search[];
  let dataPost: DataPostType[] = [] as DataPostType[];
  let dataJobs: JobPostingProps[] = [] as JobPostingProps[];
  let dataPostVolunteer: Ty_PostVolunteer[] = [] as Ty_PostVolunteer[];
  try {
    const searchResults = await SearchAll(keyword);
    searchData = searchResults.data.result.data as Ty_Search[];
  } catch (error) {
    console.error("Failed to fetch search results:", error);
  }
  console.log(searchData);
  const categoryposts = searchData.reduce(
    (acumulator, post) => {
      if (post.employerId) {
        acumulator.jobs.push(post as any);
      } else if (post.userId && post.type) {
        acumulator.posts.push(post as any);
      } else {
        acumulator.postsVolunteer.push(post as any);
      }
      return acumulator;
    },
    {
      posts: [] as DataPostType[],
      postsVolunteer: [] as Ty_PostVolunteer[],
      jobs: [] as JobPostingProps[],
    }
  );
  dataPost = categoryposts.posts;
  dataPostVolunteer = categoryposts.postsVolunteer;
  dataJobs = categoryposts.jobs;
  console.log("dataPost", dataPost);
  console.log("dataPostVolunteer", dataPostVolunteer);
  console.log("dataJobs", dataJobs);
  if (searchData.length === 0) {
    return <NoResults keyword={keyword} />;
  }
  return (
    <MyLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Kết quả tìm kiếm cho:{" "}
          <span className="text-green-600">&quot;{keyword}&quot;</span>
        </h1>
        <SearchPage
          dataJobs={dataJobs}
          dataPosts={dataPost}
          dataPostsVolunteer={dataPostVolunteer}
          token={token || ""}
        />
      </div>
    </MyLayout>
  );
}
