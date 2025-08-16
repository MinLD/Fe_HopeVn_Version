"use client";
import { Briefcase, DollarSign, Gift, Plus } from "lucide-react";
import { useState } from "react";

function FloatingActionButton() {
  const [showMenu, setShowMenu] = useState(false);
  //   const [showModal, setShowModal] = useState(false);
  //   const [modalType, setModalType] = useState<
  //     "job" | "help-request" | "donation"
  //   >("job");

  const openModal = (type: "job" | "help-request" | "donation") => {
    // setModalType(type);
    // setShowModal(true);
    setShowMenu(false);
  };

  const menuItems = [
    {
      type: "job" as const,
      label: "Post Job",
      icon: Briefcase,
      color: "bg-blue-500 hover:bg-blue-600",
      textColor: "text-blue-600",
    },
    {
      type: "help-request" as const,
      label: "Request Help",
      icon: DollarSign,
      color: "bg-red-500 hover:bg-red-600",
      textColor: "text-red-600",
    },
    {
      type: "donation" as const,
      label: "Offer Donation",
      icon: Gift,
      color: "bg-emerald-500 hover:bg-emerald-600",
      textColor: "text-emerald-600",
    },
  ];
  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        {/* Menu Items */}
        {showMenu && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-fade-in">
            {menuItems.map(({ type, label, icon: Icon, color }) => (
              <button
                key={type}
                onClick={() => openModal(type)}
                className={`flex items-center space-x-3 px-4 py-3 ${color} text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center ${
            showMenu ? "rotate-45" : ""
          }`}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default FloatingActionButton;
