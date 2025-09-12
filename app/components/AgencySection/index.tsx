import Image from "next/image";

function AgencySection() {
  return (
    <div>
      <div className="flex flex-col items-center px-6 py-6 text-center">
        {/* Icon */}
        <div className="mb-4">
          <Image
            width={100}
            height={100}
            src="https://cdn-icons-png.flaticon.com/128/16964/16964717.png"
            alt="Icon"
            className="h-25 w-30"
          />
        </div>

        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold text-[#44337A] md:text-3xl">
          Lá lành đùm lá rách
        </h2>

        {/* Nội dung */}
        <p className="mt-4 max-w-[250px] text-[15px] text-[#444] xl:text-2xl xl:max-w-2xl">
          Trong cuộc sống, một bàn tay đưa ra có thể thay đổi cả một cuộc đời.
          Hãy cùng nhau trao đi yêu thương, sẻ chia những điều tốt đẹp và mang
          lại hy vọng cho những người đang cần giúp đỡ. Khi chúng ta chung tay,
          ánh sáng của sự tử tế sẽ lan tỏa khắp mọi nơi.
        </p>

        {/* Nút */}
        <button className="mt-6 rounded bg-[#C0392B] px-6 py-3 text-white transition duration-300 hover:bg-[#A93226]">
          Tìm hiểu thêm
        </button>
      </div>
    </div>
  );
}

export default AgencySection;
