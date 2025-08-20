import PostNonActivepage from "@/app/componentAdmin/PostNonActivePage";
import SearchFilter from "@/app/components/SearchFilter";

type Props = { token: string };
function PostNonActiveManagement({ token }: Props) {
  return (
    <div className="container mx-auto py-2 ">
      <div className="">
        <SearchFilter type="posts" />
        <PostNonActivepage token={token || ""} />
      </div>
    </div>
  );
}

export default PostNonActiveManagement;
