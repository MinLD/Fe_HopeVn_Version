"use client";
import { SearchAll } from "@/app/service/search";
import { Ty_Search } from "@/app/types/search";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
type Props = {
  onSearch: (query: string) => void;
};
function SearchInput({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Ty_Search[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchContainerRef = useRef<HTMLFormElement | null | any>(null);

  const router = useRouter();
  const handleSeach = async () => {
    await SearchAll(query).then((results) => {
      console.log(results.data.result);
      setSuggestions(results.data.result.data);
      setIsLoading(false);
    });
  };
  // Debouncing: Chỉ gọi API sau khi người dùng ngừng gõ 300ms
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    handleSeach();

    setIsLoading(true);
    const debounceTimer = setTimeout(async () => {}, 300);

    // Cleanup: Hủy timer nếu người dùng gõ tiếp
    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // // Đóng gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setSuggestions([]); // Ẩn gợi ý sau khi tìm kiếm
  };
  const handleSuggestionClick = (suggestion: string) => {
    // Chỉ cần đặt giá trị mới, không cần xóa giá trị cũ
    setQuery(suggestion);
    setSuggestions([]);

    // Sau khi người dùng nhấp vào gợi ý, nên thực hiện tìm kiếm luôn
    handleReturn(suggestion);
  };
  const handleReturn = (keyword: string) => {
    router.push(`/search/top?q=${keyword}`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        ref={searchContainerRef}
        className=" ml-5 mr-5 hidden sm:block relative  w-full flex-1 max-w-[300px] md:max-w-[500px]   transition-all ease-in-out duration-300"
      >
        <input
          value={query}
          placeholder="Tìm kiếm việc làm, hoàn cảnh cần giúp đỡ..."
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReturn(query)}
          className="pl-3 p-1 pr-8  w-full flex-1 border rounded-[10px] border-[#fff] placeholder:text-[14px] text-[#fff] outline-none"
        />
        <span
          className="absolute top-2 right-2"
          onClick={() => handleReturn(query)}
        >
          <IoSearchSharp size={20} />
        </span>
        {/* Hộp gợi ý */}
        {suggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 text-[#272727] rounded-lg shadow-lg z-10">
            <ul>
              {suggestions.slice(0, 10).map((suggestion) => (
                <li
                  key={suggestion.id + suggestion.title}
                  onClick={() => handleSuggestionClick(suggestion.title.trim())}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg`}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
            {isLoading && (
              <div className="px-4 py-2 text-gray-500">Đang tìm...</div>
            )}
          </div>
        )}
      </form>
    </>
  );
}

export default SearchInput;
