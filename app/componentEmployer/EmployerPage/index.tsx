"use client";
import JobCategories from "@/app/componentEmployer/JobCategories";
import JobsManagement from "@/app/componentEmployer/JobsManagement";
import DashBoard from "@/app/components/DashBoard";
import { useStateStore } from "@/app/context/StoreProvider";
import Layout from "@/app/Layout/index";
import { BriefcaseBusiness } from "lucide-react";

type Props = { token: string };
function EmployerPage({ token }: Props) {
  const { setTypeSibar, isTypeSibar } = useStateStore();
  const data = [
    {
      title: "Quản lý",
      label: [
        {
          id: "JobsManagement",
          name: "Quản lý Tuyển Dụng",
          icon: BriefcaseBusiness,
        },
      ],
    },
  ];

  const renderComponent = () => {
    switch (isTypeSibar) {
      case "JobsManagement":
        return (
          <div>
            <JobsManagement token={token || ""} />
          </div>
        );

      default:
        return <div>DashBoard</div>;
    }
  };
  return (
    <Layout>
      <DashBoard data={data} renderComponent={renderComponent} />
    </Layout>
  );
}

export default EmployerPage;
