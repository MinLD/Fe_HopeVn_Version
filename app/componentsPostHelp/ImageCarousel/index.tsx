import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface ImageCarouselProps {
  images: [
    {
      url: string;
    }
  ];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || !images.length) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (images.length === 1) {
    return (
      <>
        <div className={`relative ${className}`}>
          <img
            src={images[0].url}
            alt="Post image"
            className="w-full h-48 sm:h-64 object-cover rounded-lg cursor-pointer"
            onClick={openModal}
          />
          <button
            onClick={openModal}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <div className="relative max-w-screen-lg max-h-screen-lg p-4">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-white hover:bg-black hover:bg-opacity-50 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={images[0].url}
                alt="Full screen"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className={`relative ${className}`}>
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={images[currentIndex].url}
            alt={`Post image ${currentIndex + 1}`}
            className="w-full h-48 sm:h-64 object-cover cursor-pointer"
            onClick={openModal}
          />

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Zoom button */}
          <button
            onClick={openModal}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-2 space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-screen-lg max-h-screen-lg p-4">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-white hover:bg-black hover:bg-opacity-50 rounded-full z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={images[currentIndex].url}
              alt={`Full screen ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Modal Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-black hover:bg-opacity-50 rounded-full"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 text-white hover:bg-black hover:bg-opacity-50 rounded-full"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Modal Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex ? "bg-white" : "bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
