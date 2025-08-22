import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { GetAllJobCategory } from "@/app/service/employer";
import EmployerCreateCategory from "@/app/componentEmployer/EmployerCreateCategory";

export interface JobCategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}
type Props = {
  token: string;
};

export default function JobCategories({ token }: Props) {
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  console.log(formData);
  const [editingId, setEditingId] = useState<number | null>(null);
  console.log(editingId);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState<number>(-1);
  console.log(isEditProfile);

  const [AddUser, setAddUser] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await GetAllJobCategory(token as string);
      if (response.status === 200) {
        console.log(response.data.result);
        setCategories(response?.data?.result);
        setIsLoading(false);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  console.log(categories);

  // // Handle form submission
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     if (editingId) {
  //       // Update category
  //       await axios.put(`/api/job-categories/${editingId}`, formData);
  //     } else {
  //       // Create new category
  //       await axios.post("/api/job-categories", formData);
  //     }
  //     fetchCategories();
  //     resetForm();
  //   } catch (error) {
  //     console.error("Error saving category:", error);
  //   }
  // };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/api/job-categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Handle edit
  const handleEdit = (category: JobCategory) => {
    setEditingId(category.id);
    setFormData({ name: category.name, description: category.description });
  };

  // Reset form
  // const resetForm = () => {
  //   setFormData({ name: "", description: "" });
  //   setEditingId(null);
  // };
  // Fetch categories
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mx-auto py-2 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 sm:text-center">
        Quản lý danh mục công việc
      </h1>

      <div className="flex flex-col xl:flex-row justify-between mb-6 gap-4">
        <div className="relative  sm:w-2/3 w-4/5">
          <input
            type="text"
            id="searchInput"
            placeholder="Tìm kiếm công việc..."
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
          Thêm Danh Mục Công Việc
        </button>
        {AddUser && (
          <div>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsEditProfile(-1)}
            ></div>

            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white p-4 w-[800px] h-auto rounded-xl shadow-lg">
                <EmployerCreateCategory
                  setClose={() => setAddUser(false)}
                  token={token}
                  handleGetAllCategories={fetchCategories}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Category" : "Add New Category"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={4}
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div> */}

      {/* Categories List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Danh sách danh mục</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories?.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.name}
                    </td>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(category.createdAt), "PPp")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
