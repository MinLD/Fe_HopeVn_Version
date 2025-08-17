import { Leaf } from "lucide-react";
import React from "react";

const SplashScreen = () => {
  return (
    <>
      <style>
        {`
          /* --- Animation Keyframes --- */

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes growStem {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          @keyframes gentleSway {
            0%, 100% { transform: rotate(-2deg); }
            50% { transform: rotate(2deg); }
          }

          @keyframes textFadeUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Hiệu ứng xoay tròn cho các chấm nhỏ */
          @keyframes orbit {
            from { transform: rotate(0deg) translateX(65px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(65px) rotate(-360deg); }
          }
        `}
      </style>

      {/* Lớp phủ toàn màn hình */}
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-100">
        {/* Container chính cho logo và hiệu ứng xoay */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Các chấm nhỏ xoay xung quanh */}
          <div
            className="absolute w-2 h-2 bg-emerald-300 rounded-full"
            style={{
              animation: "orbit 4s linear infinite",
              animationDelay: "0s",
            }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-emerald-400 rounded-full"
            style={{
              animation: "orbit 4s linear infinite",
              animationDelay: "-1s",
            }}
          ></div>
          <div
            className="absolute w-2 h-2 bg-emerald-300 rounded-full"
            style={{
              animation: "orbit 4s linear infinite",
              animationDelay: "-2s",
            }}
          ></div>
          <div
            className="absolute w-3 h-3 bg-emerald-400 rounded-full"
            style={{
              animation: "orbit 4s linear infinite",
              animationDelay: "-3s",
            }}
          ></div>

          {/* Container cho logo chiếc lá */}
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              animation: "gentleSway 3s ease-in-out infinite",
              animationDelay: "1s",
            }}
          >
            <Leaf
              size={"80%"}
              className="text-emerald-500"
              strokeWidth={1.5}
              style={{
                transformOrigin: "bottom center",
                animation:
                  "growStem 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                animationDelay: "0.2s",
                opacity: 0,
              }}
            />
          </div>
        </div>

        {/* Dòng chữ loading */}
        <p
          className="mt-8 text-xl font-light text-emerald-800 tracking-widest"
          style={{
            animation: "textFadeUp 1s ease-out forwards",
            animationDelay: "1.2s",
            opacity: 0,
          }}
        >
          LOADING
        </p>
      </div>
    </>
  );
};

export default SplashScreen;
