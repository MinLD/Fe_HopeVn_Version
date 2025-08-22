import Spanning from "@/app/components/Spanning";
import { Camera, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  setClose: () => void;
  id: string;
  image: string;
  name: string;
  description: string;
  taxCode: string;
  phone: string;
  email: string;
  type: string;
};

function ProfileSellerEdit({
  phone,
  setClose,
  image,
  name,
  description,
  taxCode,
}: Props) {
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Tên Công Ty",
      disabled: false,
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "Số Điện Thoại",
      disabled: false,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      placeholder: "Mô Tả",
      disabled: false,
    },
    {
      id: 3,
      name: "taxCode",
      type: "text",
      placeholder: "Mã Thuế",
      disabled: false,
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  // const { fetchProfile } = useProfileStore();
  const [avatar, setAvatar] = useState<File | null | any>(null);

  const [formData, setFormData] = useState({
    name: name || "",
    description: description || "",
    taxCode: taxCode || "",
    image: image || "",
    phone: phone || "",
  });
  useEffect(() => {
    console.log("Props:", { name, description, taxCode, image });
    setFormData({
      name: name || "",
      description: description || "",
      taxCode: taxCode || "",
      image: image || "",
      phone: phone || "",
    });
    console.log("FormData updated:", formData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, taxCode, image, phone, setFormData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const data = new FormData();

    // Kiểm tra và thêm dữ liệu nếu có thay đổi
    if (formData.name !== (name || "") && formData.name.length >= 3) {
      data.append("name", formData.name);
    } else if (formData.name.length < 3 && formData.name !== (name || "")) {
      toast.error("Name must be at least 3 characters.");
      setLoading(false);
      return;
    }

    if (formData.phone !== (phone || "") && formData.phone.length >= 10) {
      data.append("phone", formData.phone);
    } else if (formData.phone.length < 10 && formData.phone !== (phone || "")) {
      toast.error("Phone must be at least 10 characters.");
      setLoading(false);
      return;
    }

    if (
      formData.description !== (description || "") &&
      formData.description.length >= 20
    ) {
      data.append("description", formData.description);
    } else if (
      formData.description.length < 20 &&
      formData.description !== (description || "")
    ) {
      toast.error("Description must be at least 20 characters.");
      setLoading(false);
      return;
    }

    if (formData.taxCode !== (taxCode || "") && formData.taxCode.length >= 6) {
      data.append("taxCode", formData.taxCode);
    } else if (
      formData.taxCode.length < 6 &&
      formData.taxCode !== (taxCode || "")
    ) {
      toast.error("Tax code must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (avatar instanceof File) {
      data.append("image", avatar || "");
    }

    // Kiểm tra xem có dữ liệu nào được thêm vào FormData không
    if (
      data.has("name") ||
      data.has("description") ||
      data.has("taxCode") ||
      data.has("image") ||
      data.has("phone")
    ) {
      for (const [key, value] of data.entries()) {
        console.log(`${key}: ${value}`);
      }
      // await UpdateSeller(data, id)
      //   .then((res : any) => {
      //     console.log(res);
      //     fetchProfile();
      //     toast.success("Update successfully.");
      //     setLoading(false);
      //     setClose();
      //   })
      //   .catch((error : any) => {
      //     toast.error(error?.response?.data?.message || "An error occurred.");
      //     console.log(error);
      //     setLoading(false);
      //   });
    } else {
      toast.warning("No changes made.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between ">
        {" "}
        <h2 className="text-xl font-bold ">Thông Tin Của Seller</h2>
        <X
          size={35}
          color="#afacac"
          strokeWidth={0.5}
          onClick={() => setClose()}
          className="hover:cursor-pointer"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 ">
        {inputs.map((input) => (
          <div key={input.id} className="relative">
            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name as keyof typeof formData]}
              className="h-[50px] pl-2 pt-4 border border-[#8e8e8e] rounded-md w-full text-[#3c3c3c] text-[16px]"
              onChange={(e) => handleChange(input.name, e.target.value)}
              disabled={input.disabled}
            />
            <p className="absolute top-1 left-2 text-[#8e8e8e] text-[12px]">
              {input.name}
            </p>
          </div>
        ))}
        <div className="relative">
          <input
            type="file"
            name="image"
            className="h-[50px] pl-4 pt-4 border border-gray-300 rounded-lg w-full text-gray-700 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            accept="image/*"
            placeholder="Image"
          />
          <p className="absolute top-1 left-2 text-gray-500 text-[12px]">
            Ảnh Cửa Hàng
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative w-[250px] h-[250px] rounded-2xl overflow-hidden border-2 border-transparent bg-gradient-to-br from-indigo-100 to-pink-100 transition-all duration-300 hover:shadow-xl hover:border-indigo-400">
            {formData.image || avatar ? (
              <Image
                src={
                  avatar instanceof File || avatar instanceof Blob
                    ? URL.createObjectURL(avatar)
                    : formData.image || ""
                }
                alt="Avatar"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl"
                onError={() => console.log("Error loading image")}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center ">
                <div className="text-center flex flex-col items-center justify-center">
                  <Camera size={80} color="#4b5563" strokeWidth={1.5} />
                  <p className="text-gray-700 font-bold mt-3  drop-shadow-md">
                    Thêm Ảnh Ngay
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-2 items-center  ">
        <div className="text-[#3c3c3c] hover:cursor-pointer" onClick={setClose}>
          Cancel
        </div>
        <button
          className="bg-[#3c3c3c] text-white p-3 rounded-md hover:cursor-pointer"
          onClick={handleSubmit}
        >
          {loading ? <Spanning /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default ProfileSellerEdit;
