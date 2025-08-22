import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface ImageCarouselProps {
  images: { url: string }[];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Xử lý sự kiện bàn phím để điều hướng trong modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, currentIndex]);

  if (!images || !images.length) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Carousel Display */}
        <div className="relative overflow-hidden rounded-lg group">
          <Image
            width={500}
            height={500}
            src={images[currentIndex].url}
            alt={`Post image ${currentIndex + 1}`}
            className="w-full h-48 sm:h-64 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            onClick={() => openModal(currentIndex)}
          />

          {/* Nút điều hướng (chỉ hiển thị khi có nhiều hơn 1 ảnh) */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Nút Zoom */}
          <button
            onClick={() => openModal(currentIndex)}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Dấu chấm chỉ mục (chỉ hiển thị khi có nhiều hơn 1 ảnh) */}
        {images.length > 1 && (
          <div className="flex justify-center mt-2 space-x-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-500 scale-125"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal xem ảnh toàn màn hình */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-90 animate-fadeIn"
          onClick={closeModal}
        >
          {/* Container CỐ ĐỊNH KÍCH THƯỚC cho ảnh */}
          <div
            className="relative w-[90vw] h-[80vh] max-w-[1200px] max-h-[800px] bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Ngăn việc click vào ảnh bị đóng modal
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 p-2 text-white hover:bg-white hover:text-gray-400  hover:bg-opacity-20 rounded-full z-20"
              aria-label="Close image viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Ảnh được đặt với object-cover để lấp đầy container */}
            <Image
              fill
              src={images[currentIndex].url}
              alt={`Full screen ${currentIndex + 1}`}
              className="w-full h-full object-cover" // <-- THAY ĐỔI QUAN TRỌNG
            />

            {/* Nút điều hướng trong Modal (chỉ hiển thị khi có nhiều hơn 1 ảnh) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-40 text-white hover:bg-opacity-60 rounded-full z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-40 text-white hover:bg-opacity-60 rounded-full z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Chỉ mục trong Modal */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === currentIndex ? "bg-white" : "bg-gray-500"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`
            @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
            }
            .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
            }
        `}</style>
    </>
  );
};

export default ImageCarousel;
