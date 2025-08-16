"use client";

import AdminCreateUser from "@/app/componentAdmin/AdminCreateUser";
import ProfileEdit from "@/app/componentAdmin/ProfileEdit";
import ProfileSellerEdit from "@/app/componentAdmin/ProfileSellerEdit";
import ModalConfirm from "@/app/components/ModalConfirm";
import Spanning from "@/app/components/Spanning";
import { BanUsers, DeleteUsers, GetAllUsers } from "@/app/service/admin";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type prop = {
  token: string;
};
function UsersManagement({ token }: prop) {
  const titleTable = [
    {
      id: 0,
      name: "ID",
    },
    {
      id: 1,
      name: "Họ Tên",
    },
    {
      id: 2,
      name: "Email",
    },
    {
      id: 3,
      name: "Vai Trò",
    },
    {
      id: 4,
      name: "Trạng Thái",
    },
    {
      id: 5,
      name: "Hành Động",
    },
  ];
  const [data, setData] = useState<Ty_User[]>([]);
  const [isEditProfile, setIsEditProfile] = useState<number>(-1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [ConfirmDelete, setConfirmDelete] = useState<string>("");
  const [AddUser, setAddUser] = useState<boolean>(false);

  const handleGetAllUsers = async () => {
    setLoading(true);
    await GetAllUsers(token)
      .then((res) => {
        setData(res?.data?.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleDeleteUser = () => {
    setLoading(true);
    DeleteUsers(token, ConfirmDelete)
      .then(async () => {
        toast.success("Xóa người dùng thành công");
        await handleGetAllUsers();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };
  const handleBanUser = async (id: string, accepted: string) => {
    console.log(id, accepted);
    const banStatus = accepted === "true" ? true : false;
    console.log(banStatus);
    setLoading(true);
    try {
      await BanUsers(token, id, banStatus);
      toast.success(
        banStatus ? "Unbanned successfully" : "Banned successfully"
      );
      await handleGetAllUsers();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  console.log(data);

  return (
    <>
      <div className="container mx-auto py-2 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 sm:text-center">
          Quản Lý Người Dùng
        </h1>

        <div className="flex flex-col xl:flex-row justify-between mb-6 gap-4">
          <div className="relative  sm:w-2/3 w-4/5">
            <input
              type="text"
              id="searchInput"
              placeholder="Tìm kiếm người dùng..."
              className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="w-5 h-5 absolute left-3 top-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            className="w-3/4 sm:w-2/5  bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={() => setAddUser(true)}
          >
            Thêm Người Dùng
          </button>
          {AddUser && (
            <div>
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                onClick={() => setIsEditProfile(-1)}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                  <AdminCreateUser
                    token={token}
                    setClose={() => setAddUser(false)}
                    handleGetAllUsers={handleGetAllUsers}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        {isLoading ? (
          <div>
            <Spanning />
          </div>
        ) : (
          <div className="max-w-[100vw] overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {titleTable.map((item) => (
                    <th
                      key={item.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, k) => (
                  <tr key={k || item?.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item?.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.profile?.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item?.roles[0]?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        id="status"
                        value={item?.accepted === false ? "false" : "true"}
                        onChange={(e) => {
                          const value = e.target.value;
                          handleBanUser(item.id, value || "");
                        }}
                        disabled={item?.roles[0]?.name === "ADMIN"}
                        className={`${
                          item?.roles[0]?.name === "ADMIN"
                            ? "cursor-not-allowed"
                            : ""
                        } h-[35px] pl-2 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]`}
                      >
                        <option value="true">Hoạt động</option>
                        <option value="false">Khóa tài khoản</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer"
                        onClick={() => {
                          setIsEditProfile(k);
                        }}
                      >
                        Xem
                      </button>
                      <button
                        className={`text-red-500 hover:text-red-700 cursor-pointer ${
                          item?.roles[0]?.name === "ADMIN"
                            ? "hover:cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => setConfirmDelete(item?.id)}
                        disabled={item?.roles[0]?.name === "ADMIN"}
                      >
                        Xóa
                      </button>
                      {ConfirmDelete === item?.id && (
                        <ModalConfirm
                          setClose={() => setConfirmDelete("")}
                          handle={() => handleDeleteUser()}
                        />
                      )}

                      {isEditProfile === k && (
                        <div>
                          <div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                            onClick={() => setIsEditProfile(-1)}
                          ></div>

                          <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                              {item?.roles[0]?.name === "SELLER" ? (
                                <ProfileSellerEdit
                                  id={item?.id || ""}
                                  setClose={() => setIsEditProfile(-1)}
                                  email={item?.email || ""}
                                  name={item?.profile?.fullName || ""}
                                  phone={item?.profile?.phone || ""}
                                  type="admin"
                                  description={"dsadad"}
                                  image=""
                                  taxCode=""
                                />
                              ) : (
                                <ProfileEdit
                                  token={token}
                                  id={item?.profile?.id || ""}
                                  setClose={() => setIsEditProfile(-1)}
                                  email={item?.email || ""}
                                  fullName={item?.profile?.fullName || ""}
                                  phone={item?.phone || ""}
                                  dob={item?.profile?.dob || ""}
                                  gender={item?.profile?.gender || ""}
                                  type="admin"
                                  country={item?.profile?.country || ""}
                                  city={item?.profile?.city || ""}
                                  address={item?.profile?.address || ""}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default UsersManagement;
