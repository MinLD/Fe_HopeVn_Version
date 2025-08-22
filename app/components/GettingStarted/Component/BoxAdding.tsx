import { useState } from "react";
type props = {
  src: string;
  label: string;
  title: string;
  id: number;
};

function BoxAdding({  label, title, id }: props) {
  const [isOpen, setIsOpen] = useState(id===0);

  return (
    <div
      className="mt-2 overflow-hidden rounded-lg border-b-2"
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="flex w-full items-center justify-between p-4 text-left">
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div
          className={`space-y-2 p-4 text-gray-700 transition-all duration-500 ${isOpen ? "opacity-[100%]" : "opacity-[0%]"}`}
        >
          {/* <img src={src} alt="" /> */}
          <p>{label}</p>

          <div className="mt-4 flex flex-col gap-2 text-green-600 md:flex-row md:justify-between"></div>
        </div>
      )}
    </div>
  );
}

export default BoxAdding;
