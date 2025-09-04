"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Giả sử đây là kiểu dữ liệu sản phẩm của bạn
interface Product {
  id: number;
  name: string;
}

// --- BƯỚC 1: TẠO DỮ LIỆU GIẢ LẬP ---
// Tạo một "database giả" chứa 200 sản phẩm
const allProducts: Product[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Sản phẩm ${i + 1}`,
}));

// --- BƯỚC 2: VIẾT LẠI HÀM fetchProducts ĐỂ GIẢ LẬP API ---
// Hàm này giờ sẽ lấy dữ liệu từ database giả ở trên
const fetchProducts = async (
  page: number
): Promise<{ products: Product[]; hasMore: boolean }> => {
  const limit = 10; // Mỗi lần tải 10 sản phẩm
  const offset = (page - 1) * limit;

  console.log(`Đang tải trang ${page}...`);

  // Giả lập độ trễ mạng (ví dụ: 500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Lấy một "trang" dữ liệu từ database giả
  const productsOnPage = allProducts.slice(offset, offset + limit);

  // Kiểm tra xem còn sản phẩm để tải nữa không
  const hasMore = offset + limit < allProducts.length;

  return {
    products: productsOnPage,
    hasMore: hasMore,
  };
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observer = useRef<IntersectionObserver | null>(null);

  // Sử dụng useCallback để chỉ tạo lại hàm callback khi dependencies thay đổi
  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // Khi phần tử cuối cùng hiện ra, tải thêm sản phẩm
          loadMoreProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // Hàm để tải thêm sản phẩm
  const loadMoreProducts = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const { products: newProducts, hasMore: newHasMore } = await fetchProducts(
      nextPage
    );
    setProducts((prev) => [...prev, ...newProducts]);
    setPage(nextPage);
    setHasMore(newHasMore);
    setIsLoading(false);
  }, [page, isLoading, hasMore]);

  // Tải sản phẩm lần đầu
  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      const { products, hasMore } = await fetchProducts(1);
      setProducts(products);
      setHasMore(hasMore);
      setIsLoading(false);
    };
    initialLoad();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product, index) => {
          // Gắn ref vào phần tử cuối cùng trong danh sách
          if (products.length === index + 1) {
            return (
              <div
                ref={lastProductRef}
                key={product.id}
                className="border p-4 rounded-lg bg-green-100"
              >
                {product.name} (phần tử cuối)
              </div>
            );
          } else {
            return (
              <div key={product.id} className="border p-4 rounded-lg">
                {product.name}
              </div>
            );
          }
        })}
      </div>

      {/* Hiển thị loading và thông báo cuối trang */}
      {isLoading && (
        <p className="text-center my-4 font-semibold">
          Đang tải thêm sản phẩm...
        </p>
      )}
      {!hasMore && (
        <p className="text-center my-4 font-semibold text-green-700">
          Bạn đã xem hết sản phẩm.
        </p>
      )}
    </div>
  );
}
