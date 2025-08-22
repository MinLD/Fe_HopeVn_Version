"use client";
import CompanyNonActiveManagement from "@/app/componentAdmin/CompanyNon-ActiveManagement";
import PostNonActiveManagement from "@/app/componentAdmin/PostNon-ActiveManagement";
import PostVolunteerNonActiveManagement from "@/app/componentAdmin/PostVolunteerNon-ActiveManagement";
import UsersManagement from "@/app/componentAdmin/UsersManagement";
import JobCategories from "@/app/componentEmployer/JobCategories";
import DashBoard from "@/app/components/DashBoard";
import { useStateStore } from "@/app/context/StoreProvider";
import Layout from "@/app/Layout/index";
import {
  BookImage,
  BriefcaseIcon,
  ChartColumnStacked,
  CheckCircleIcon,
  HandCoins,
  UserCog,
} from "lucide-react";
type Props = {
  token?: string | null;
};
function AdminPage({ token }: Props) {
  const { isTypeSibar } = useStateStore();
  const data = [
    {
      title: "Quản lý Users",
      label: [
        { id: "UsersManagement", name: "Quản lý người dùng", icon: UserCog },
      ],
    },
    {
      title: "Quản lý Bài Đăng",
      label: [
        {
          id: "PostNonActiveManagement",
          name: "Quản lý bài viết",
          icon: BookImage,
        },
        {
          id: "PostVolunteerNonActiveManagement",
          name: "Quản lý hoàn vốn",
          icon: HandCoins,
        },
      ],
    },
    {
      title: "Quản lý Công ty",
      label: [
        {
          id: "CompanyNon-ActiveManagement",
          name: "Phê duyệt công ty",
          icon: CheckCircleIcon,
        },
        {
          id: "CompanyManagement",
          name: "Quản lý công ty",
          icon: BriefcaseIcon,
        },
        {
          id: "CategoryJobsManagement",
          name: "Danh mục Tuyển Dụng",
          icon: ChartColumnStacked,
        },
      ],
    },
  ];

  const renderComponent = () => {
    switch (isTypeSibar) {
      case "CategoryJobsManagement":
        return (
          <>
            <JobCategories token={token || ""} />
          </>
        );
      case "UsersManagement":
        return <UsersManagement token={token || ""} />;
      case "CategoriesManagement":
        return <div>cate</div>;
      case "CompanyNon-ActiveManagement":
        return (
          <div>
            <CompanyNonActiveManagement token={token || ""} />
          </div>
        );
      case "CompanyManagement":
        return <div>commany</div>;
      case "PostVolunteerNonActiveManagement":
        return (
          <>
            <PostVolunteerNonActiveManagement token={token || ""} />
          </>
        );
      case "PostNonActiveManagement":
        return <PostNonActiveManagement token={token || ""} />;
      default:
        return <div>dass</div>;
    }
  };
  return (
    <Layout>
      <DashBoard data={data} renderComponent={renderComponent} />
    </Layout>
  );
}

export default AdminPage;
