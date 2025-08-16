import CompanyNonActivePage from "@/app/componentAdmin/CompanyNonActivePage";
import SearchFilter from "@/app/components/SearchFilter";

type Props = { token: string };
function CompanyNonActiveManagement({ token }: Props) {
  return (
    <div className="container mx-auto py-2 ">
      <div className="">
        <SearchFilter type="posts" />
        <CompanyNonActivePage token={token || ""} />
      </div>
    </div>
  );
}

export default CompanyNonActiveManagement;
