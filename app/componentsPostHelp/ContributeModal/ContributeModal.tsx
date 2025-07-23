import React, { useState } from "react";
import { X, DollarSign, Heart } from "lucide-react";
import { HelpPost } from "@/app/types/PostCart";

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: HelpPost | null;
  onSubmit: (amount: number, description: string) => void;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen,
  onClose,
  post,
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [contributionType, setContributionType] = useState<
    "donation" | "business_help"
  >("donation");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onSubmit(numAmount, description);
      setAmount("");
      setDescription("");
    }
  };

  if (!isOpen || !post) return null;

  const remainingAmount = post.targetAmount
    ? post.targetAmount - post.currentAmount
    : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {post.type === "free" ? "Offer Help" : "Contribute Funds"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-2">{post.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{post.author.name}</p>
            {post.type === "reimbursement" && (
              <div className="text-sm text-gray-600">
                <p>Target: ${post.targetAmount?.toLocaleString()}</p>
                <p>Raised: ${post.currentAmount.toLocaleString()}</p>
                <p className="font-medium text-green-600">
                  Remaining: ${remainingAmount.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* {user?.role === "business" && ( */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contribution Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="donation"
                    checked={contributionType === "donation"}
                    onChange={(e) =>
                      setContributionType(e.target.value as "donation")
                    }
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Donation</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="business_help"
                    checked={contributionType === "business_help"}
                    onChange={(e) =>
                      setContributionType(e.target.value as "business_help")
                    }
                    className="mr-2 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">
                    Business Help (Reimbursable)
                  </span>
                </label>
              </div>
            </div>

            {post?.type === "reimbursement" && (
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Amount ($) *
                </label>
                <input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  max={remainingAmount}
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter amount to contribute"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum: ${remainingAmount.toLocaleString()}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                {post.type === "free"
                  ? "How can you help?"
                  : "Message (optional)"}
              </label>
              <textarea
                id="description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder={
                  post.type === "free"
                    ? "Describe how you can help..."
                    : "Add a supportive message..."
                }
                required={post.type === "free"}
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                {post.type === "free" ? (
                  <>
                    <Heart className="h-4 w-4" />
                    <span>Offer Help</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="h-4 w-4" />
                    <span>Contribute</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
