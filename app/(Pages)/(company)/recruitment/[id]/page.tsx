type Props = {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function RecruitmentDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = params;
  const { token } = searchParams || {};
  console.log(token);
  return (
    <div>
      <h1>Chi tiết tuyển dụng ID: {id}</h1>
    </div>
  );
}
