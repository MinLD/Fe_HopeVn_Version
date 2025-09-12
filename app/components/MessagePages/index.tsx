"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from "react"; // 1. Thêm useLayoutEffect
import { Send, Search, MoreVertical } from "lucide-react";
import { Ty_MessageBox } from "@/app/types/message";
import Button from "@/app/ui/Button";
import Card from "@/app/ui/Card";
import Badge from "@/app/ui/Badge";
import Image from "next/image";
import AvatarProfile from "@/app/components/AvatarProfile";
import { formatRelativeTime } from "@/app/lib/formatDate";
import { SendMessagePayload, useStompChat } from "@/app/hooks/useStompChat";
import { useProfileStore } from "@/app/zustand/userStore";
import { MarkReadMessage } from "@/app/service/message";
import { useRouter } from "next/navigation";

type Props = {
  dataMessageBox: Ty_MessageBox[];
  token: string;
};
function MessagePages({ dataMessageBox, token }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [activeRecipientEmail, setActiveRecipientEmail] = useState<
    string | null
  >(dataMessageBox[0]?.receiver.email || null);

  const { profileUser } = useProfileStore();
  const currentUserEmail = profileUser?.email;

  const { messages, setMessages, sendMessage, fetchHistory } = useStompChat(
    currentUserEmail || "",
    profileUser?.id,
    token
  );

  // ✅ SỬA LỖI 2: Tạo ref cho khung chứa tin nhắn
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // ✅ SỬA LỖI 3: Sử dụng useLayoutEffect để cuộn tức thì
  useLayoutEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      // Đặt vị trí cuộn bằng tổng chiều cao của nội dung.
      // Thao tác này diễn ra trước khi người dùng thấy bất cứ thứ gì,
      // nên sẽ không có hiệu ứng cuộn.
      container.scrollTop = container.scrollHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]); // Kích hoạt mỗi khi có tin nhắn mới hoặc đổi cuộc trò chuyện

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [newMessage]);

  useEffect(() => {
    if (activeRecipientEmail) {
      setMessages([]);
      fetchHistory(activeRecipientEmail);
    }
  }, [activeRecipientEmail, fetchHistory, setMessages]);

  const handleReadMessage = async (email: string) => {
    console.log(email);
    try {
      await MarkReadMessage(token, email || "");
      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };
  const handleSend = () => {
    if (newMessage.trim() && currentUserEmail && activeRecipientEmail) {
      const payload: SendMessagePayload = {
        senderEmail: currentUserEmail,
        receiverEmail: activeRecipientEmail,
        content: newMessage,
      };
      sendMessage(payload);
      setNewMessage("");
      router.refresh();
    }
  };

  const selectedConv = dataMessageBox.find(
    (c) => c.receiver.email === activeRecipientEmail
  );

  const filteredConversations = dataMessageBox.filter((conv) =>
    conv.receiver.profile.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" bg-gray-50">
      <div className="py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh - 2px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 h-full">
            <Card padding="none" className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm cuộc trò chuyện..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      setActiveRecipientEmail(conversation.receiver.email);
                      handleReadMessage(conversation.receiver.email);
                    }}
                    className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left relative 
                      ${
                        activeRecipientEmail === conversation.receiver.email
                          ? "bg-green-50 border-l-4 border-green-500"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        {conversation.receiver.profile.profilePicture ? (
                          <Image
                            width={48}
                            height={48}
                            src={
                              conversation.receiver.profile.profilePicture
                                .url || ""
                            }
                            alt={conversation.receiver.profile.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <AvatarProfile
                            name={conversation.receiver.profile.fullName}
                            width="12"
                            height="12"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conversation.receiver.profile.fullName}
                            </h3>
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(
                              conversation.lastMessageTime || ""
                            )}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          {conversation.unreadCount > 0 && (
                            <Badge variant="danger" size="sm">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 h-full">
            {selectedConv ? (
              <Card padding="none" className="h-full flex flex-col relative">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {selectedConv.receiver.profile.profilePicture ? (
                        <Image
                          width={48}
                          height={48}
                          src={
                            selectedConv.receiver.profile.profilePicture.url ||
                            ""
                          }
                          alt={selectedConv.receiver.profile.fullName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <AvatarProfile
                          name={selectedConv.receiver.profile.fullName}
                          width="12"
                          height="12"
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedConv.receiver.profile.fullName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {selectedConv.receiver.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* <Button variant="ghost" size="sm" icon={Phone} />
                    <Button variant="ghost" size="sm" icon={Video} />
                    <Button variant="ghost" size="sm" icon={Archive} /> */}
                    <Button variant="ghost" size="sm" icon={MoreVertical} />
                  </div>
                </div>

                {/* ✅ SỬA LỖI 4: Gắn ref vào đây */}
                <div
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-4 max-h-[370px] min-h-[370px] space-y-4"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender.email === currentUserEmail
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md min-w-0">
                        {message.sender.email !== currentUserEmail && (
                          <>
                            {selectedConv.receiver.profile.profilePicture ? (
                              <Image
                                width={48}
                                height={48}
                                src={
                                  selectedConv.receiver.profile.profilePicture
                                    .url || ""
                                }
                                alt={selectedConv.receiver.profile.fullName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <AvatarProfile
                                name={selectedConv.receiver.profile.fullName}
                                width="12"
                                height="12"
                              />
                            )}
                          </>
                        )}
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            message.sender.email === currentUserEmail
                              ? "bg-green-500 text-white rounded-br-sm"
                              : "bg-gray-100 text-gray-900 rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed break-all">
                            {message.content}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              message.sender.email === currentUserEmail
                                ? "text-green-100"
                                : "text-gray-500"
                            }`}
                          >
                            {formatRelativeTime(message.sentAt)}
                            {message.sender.email === currentUserEmail && (
                              <span className="ml-2">
                                {message.read ? "✓ Đã xem" : ""}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={textareaRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        rows={1}
                        className="max-h-[100px] pl-3 outline-none block w-full pr-10 py-2 border border-gray-300 rounded-lg resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                          }
                        }}
                      />
                    </div>
                    <Button
                      type="button"
                      size="md"
                      icon={Send}
                      disabled={!newMessage.trim()}
                      className="mb-0.5"
                      onClick={handleSend}
                    />
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chọn một cuộc trò chuyện
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Chọn một cuộc trò chuyện từ danh sách để bắt đầu nhắn tin
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagePages;
