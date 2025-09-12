import { SearchX, Briefcase, HeartHandshake } from "lucide-react";
import Link from "next/link";

interface NoResultsProps {
  keyword: string;
}

export default function NoResults({ keyword }: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4  ">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-8 h-8 text-gray-400" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        Không tìm thấy kết quả nào
      </h2>

      <p className="text-gray-600 mt-2 max-w-md">
        Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp với từ khóa{" "}
        <span className="font-semibold text-gray-800">
          &quot;{keyword}&quot;
        </span>
        .
      </p>

      <div className="mt-8 text-left border-t border-gray-200 pt-6 w-full max-w-md">
        <h3 className="font-semibold text-gray-700 mb-3">Gợi ý tìm kiếm:</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Hãy chắc chắn rằng bạn đã gõ đúng chính tả.</li>
          <li>Thử sử dụng các từ khóa khác, tổng quát hơn.</li>
          <li>Thử bỏ bớt các bộ lọc tìm kiếm (nếu có).</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link href="/tuyen-dung">
          <button className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            <Briefcase className="w-5 h-5 mr-2" />
            Xem tất cả việc làm
          </button>
        </Link>
        <Link href="/ho-tro">
          <button className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            <HeartHandshake className="w-5 h-5 mr-2" />
            Xem các hoàn cảnh
          </button>
        </Link>
      </div>
    </div>
  );
}
