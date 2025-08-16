import PostVolunteerNonActivepage from "@/app/componentAdmin/PostVolunteerNonActivePage";
import SearchFilter from "@/app/components/SearchFilter";

type Props = { token: string };
function PostVolunteerNonActiveManagement({ token }: Props) {
  return (
    <div className="container mx-auto py-2 ">
      <div className="">
        <SearchFilter type="posts" />
        <PostVolunteerNonActivepage token={token || ""} />
      </div>
    </div>
  );
}

export default PostVolunteerNonActiveManagement;
