const HopeJobListing = () => {
  return (
    <div className="bg-white p-6 text-gray-800">
      <h2 className="text-2xl font-bold text-green-700">
        Cơ hội việc làm cho người có hoàn cảnh khó khăn
      </h2>
      <p className="mt-2">
        Hope là nền tảng kết nối những người có hoàn cảnh khó khăn, người khuyết
        tật và mắc bệnh hiểm nghèo với các cơ hội việc làm phù hợp. Chúng tôi
        mong muốn giúp đỡ những ai đang gặp trở ngại trong cuộc sống có thể tìm
        được công việc ổn định, cải thiện thu nhập và xây dựng tương lai vững
        chắc.
      </p>
      <div className="mt-6 rounded-lg bg-green-100 bg-[url('https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/job-new/hotline_bg.png')] p-4">
        <h3 className="text-xl font-bold text-green-700">Hotline Tư Vấn</h3>
        <div className="mt-2 rounded-lg bg-white p-4 shadow-md">
          <p className="font-semibold text-green-600">Hỗ trợ người tìm việc</p>
          <h4 className="mt-2 text-lg font-bold text-gray-800">
            Cần hỗ trợ? Hãy liên hệ ngay với chúng tôi
          </h4>
          <div className="s:flex-row mt-3 flex flex-col gap-2 self-end">
            <span className="rounded-lg bg-green-600 px-4 py-2 font-bold text-white">
              (084+) 0918607139
            </span>
            <button className="ml-4 rounded-lg bg-green-600 px-4 py-2 text-white shadow-md hover:bg-green-700">
              GỌI NGAY
            </button>
          </div>
          <p className="mt-2 text-gray-600">
            Email hỗ trợ ứng viên:{" "}
            <span className="font-semibold text-green-600">hopevn.site@gmail.com</span>
          </p>
        </div>
      </div>

      <h3 className="mt-4 text-xl font-bold">
        Vì sao nên tìm việc làm tại Hope?
      </h3>

      <h4 className="mt-2 text-lg font-semibold">
        Việc làm phù hợp và bền vững
      </h4>
      <ul className="ml-6 list-disc">
        <li>
          Hàng ngàn tin tuyển dụng được cập nhật thường xuyên, ưu tiên cho người
          có hoàn cảnh khó khăn.
        </li>
        <li>
          Hệ thống thông minh gợi ý công việc phù hợp theo kỹ năng và điều kiện
          của bạn.
        </li>
      </ul>

      <h4 className="mt-2 text-lg font-semibold">
        Hỗ trợ viết CV và ứng tuyển miễn phí
      </h4>
      <ul className="ml-6 list-disc">
        <li>
          Cung cấp mẫu CV đơn giản, dễ sử dụng, giúp bạn tạo hồ sơ chuyên
          nghiệp.
        </li>
        <li>
          Hướng dẫn ứng tuyển và kết nối với nhà tuyển dụng một cách dễ dàng.
        </li>
      </ul>

      <h4 className="mt-2 text-lg font-semibold">
        Kết nối trực tiếp với nhà tuyển dụng
      </h4>
      <ul className="ml-6 list-disc">
        <li>
          Nhà tuyển dụng có chính sách hỗ trợ đặc biệt cho ứng viên có hoàn cảnh
          khó khăn.
        </li>
        <li>
          Hệ thống thông minh giúp bạn theo dõi tiến trình ứng tuyển và phản hồi
          từ nhà tuyển dụng.
        </li>
      </ul>

      <p className="mt-4">
        Tại <span className="font-bold text-green-700">Hope</span>, chúng tôi
        cam kết hỗ trợ bạn tìm được công việc phù hợp nhất với khả năng và hoàn
        cảnh của mình. Dù bạn đang tìm việc tại{" "}
        <span className="font-bold text-green-600">Hà Nội</span>,{" "}
        <span className="font-bold text-green-600">TP.HCM</span> hay bất kỳ nơi
        nào khác, Hope luôn sẵn sàng đồng hành cùng bạn để tìm kiếm một tương
        lai tốt đẹp hơn.
      </p>
    </div>
  );
};

export default HopeJobListing;
