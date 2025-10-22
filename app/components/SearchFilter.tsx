import React, { useState } from "react";
import { MapPin, Filter, X } from "lucide-react";
import { industries, vietnamProvinces } from "@/app/data";

interface FilterState {
  search: string;
  location: string;
  industry: string;
  salaryMin: string;
  salaryMax: string;
  urgent: boolean;
}

interface SearchFilterProps {
  onFilterChange?: (filters: FilterState) => void;
  type?: "jobs" | "posts";
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onFilterChange = () => {},
  type = "jobs",
}) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    location: "",
    industry: "",
    salaryMin: "",
    salaryMax: "",
    urgent: false,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | boolean
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: "",
      location: "",
      industry: "",
      salaryMin: "",
      salaryMax: "",
      urgent: false,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className=" p-6 rounded-lg shadow-sm">
      {/* Search Bar */}
      {/* <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder={`Tìm kiếm `}
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div> */}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => handleFilterChange("urgent", !filters.urgent)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            filters.urgent
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Khẩn cấp
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4 mr-1" />
          bộ lọc
        </button>
        {(filters.location ||
          filters.industry ||
          filters.salaryMin ||
          filters.salaryMax) && (
          <button
            onClick={clearFilters}
            className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          >
            <X className="w-4 h-4 mr-1" />
            Xóa lọc
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lương
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <select
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Danh mục</option>
                  {vietnamProvinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Industry */}
            {type === "jobs" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={filters.industry}
                  onChange={(e) =>
                    handleFilterChange("industry", e.target.value)
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Industries</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Salary Range (only for jobs) */}
          {type === "jobs" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary Range (millions VND)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.salaryMin}
                    onChange={(e) =>
                      handleFilterChange("salaryMin", e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.salaryMax}
                    onChange={(e) =>
                      handleFilterChange("salaryMax", e.target.value)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
