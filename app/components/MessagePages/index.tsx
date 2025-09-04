"use client";
import React, { useState, useEffect } from "react";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Plus,
  Archive,
  Star,
} from "lucide-react";
import Button from "@/app/ui/Button";
import Card from "@/app/ui/Card";
import Badge from "@/app/ui/Badge";
import Image from "next/image";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "file";
  read: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
    lastSeen?: Date;
    profession?: string;
  };
  lastMessage: Message;
  unreadCount: number;
  messages: Message[];
  isArchived: boolean;
  isStarred: boolean;
}

const MessagesPages: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Auto-save messages to localStorage
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      participant: {
        id: "user1",
        name: "Tran Thi Mai",
        avatar:
          "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        online: true,
        profession: "Community Volunteer",
      },
      lastMessage: {
        id: "msg6",
        senderId: "user1",
        content:
          "Thank you for your help with the donation! My mother is doing much better now.",
        timestamp: new Date("2025-01-20T14:30:00"),
        type: "text",
        read: false,
      },
      unreadCount: 2,
      isArchived: false,
      isStarred: true,
      messages: [
        {
          id: "msg1",
          senderId: "user1",
          content:
            "Hi! I saw your post about helping with medical bills. My mother needs urgent surgery.",
          timestamp: new Date("2025-01-20T14:00:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg2",
          senderId: "me",
          content:
            "Hello! Yes, I'd be happy to help. Can you tell me more about your situation? What kind of surgery does she need?",
          timestamp: new Date("2025-01-20T14:05:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg3",
          senderId: "user1",
          content:
            "She needs heart valve replacement surgery. We've raised about 30% of the funds needed (15 million out of 50 million VND). The doctors say it's urgent.",
          timestamp: new Date("2025-01-20T14:10:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg4",
          senderId: "me",
          content:
            "I understand how difficult this must be for your family. Heart surgery is serious. I can contribute 2 million VND to help with the medical expenses.",
          timestamp: new Date("2025-01-20T14:15:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg5",
          senderId: "user1",
          content:
            "Thank you so much! This means the world to us. How can I send you the payment details? Should I share my bank account information?",
          timestamp: new Date("2025-01-20T14:25:00"),
          type: "text",
          read: false,
        },
        {
          id: "msg6",
          senderId: "user1",
          content:
            "Thank you for your help with the donation! My mother is doing much better now.",
          timestamp: new Date("2025-01-20T14:30:00"),
          type: "text",
          read: false,
        },
      ],
    },
    {
      id: "2",
      participant: {
        id: "emp1",
        name: "VinTech Solutions HR",
        avatar:
          "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
        online: false,
        lastSeen: new Date("2025-01-20T11:00:00"),
        profession: "HR Manager",
      },
      lastMessage: {
        id: "msg9",
        senderId: "emp1",
        content:
          "We'd like to schedule an interview for the Frontend Developer position. Are you available this Thursday at 2 PM?",
        timestamp: new Date("2025-01-20T10:15:00"),
        type: "text",
        read: true,
      },
      unreadCount: 0,
      isArchived: false,
      isStarred: false,
      messages: [
        {
          id: "msg7",
          senderId: "emp1",
          content:
            "Hello! We received your application for the Frontend Developer position. Your experience with React and TypeScript looks impressive.",
          timestamp: new Date("2025-01-20T09:00:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg8",
          senderId: "me",
          content:
            "Thank you for considering my application! I'm very interested in the position and would love to discuss how my skills can contribute to your team.",
          timestamp: new Date("2025-01-20T09:30:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg9",
          senderId: "emp1",
          content:
            "We'd like to schedule an interview for the Frontend Developer position. Are you available this Thursday at 2 PM?",
          timestamp: new Date("2025-01-20T10:15:00"),
          type: "text",
          read: true,
        },
      ],
    },
    {
      id: "3",
      participant: {
        id: "user3",
        name: "Le Minh Quan",
        avatar:
          "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg",
        online: true,
        profession: "Restaurant Owner",
      },
      lastMessage: {
        id: "msg12",
        senderId: "user3",
        content:
          "The rice distribution was successful! We helped 100 families today. Thank you for your support!",
        timestamp: new Date("2025-01-19T16:45:00"),
        type: "text",
        read: true,
      },
      unreadCount: 0,
      isArchived: false,
      isStarred: false,
      messages: [
        {
          id: "msg10",
          senderId: "user3",
          content:
            "Hi! I saw you were interested in helping with our rice distribution event. We're organizing it for this Saturday.",
          timestamp: new Date("2025-01-19T15:00:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg11",
          senderId: "me",
          content:
            "Yes! How can I help with the distribution? Do you need volunteers or financial support?",
          timestamp: new Date("2025-01-19T15:30:00"),
          type: "text",
          read: true,
        },
        {
          id: "msg12",
          senderId: "user3",
          content:
            "The rice distribution was successful! We helped 100 families today. Thank you for your support!",
          timestamp: new Date("2025-01-19T16:45:00"),
          type: "text",
          read: true,
        },
      ],
    },
    {
      id: "4",
      participant: {
        id: "user4",
        name: "Pham Thi Lan",
        avatar:
          "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        online: false,
        lastSeen: new Date("2025-01-19T20:30:00"),
        profession: "Teacher",
      },
      lastMessage: {
        id: "msg13",
        senderId: "user4",
        content:
          "I have some textbooks to give away for free. Are you interested?",
        timestamp: new Date("2025-01-19T14:20:00"),
        type: "text",
        read: true,
      },
      unreadCount: 0,
      isArchived: false,
      isStarred: false,
      messages: [
        {
          id: "msg13",
          senderId: "user4",
          content:
            "I have some textbooks to give away for free. Are you interested?",
          timestamp: new Date("2025-01-19T14:20:00"),
          type: "text",
          read: true,
        },
      ],
    },
  ]);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userConversations", JSON.stringify(conversations));
  }, [conversations]);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("userConversations");
    if (saved) {
      try {
        const parsedConversations = JSON.parse(saved);
        // Convert date strings back to Date objects
        const conversationsWithDates = parsedConversations.map((conv: any) => ({
          ...conv,
          lastMessage: {
            ...conv.lastMessage,
            timestamp: new Date(conv.lastMessage.timestamp),
          },
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          })),
          participant: {
            ...conv.participant,
            lastSeen: conv.participant.lastSeen
              ? new Date(conv.participant.lastSeen)
              : undefined,
          },
        }));
        setConversations(conversationsWithDates);
      } catch (error) {
        console.error("Error loading conversations:", error);
      }
    }
  }, []);

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "me",
      content: newMessage.trim(),
      timestamp: new Date(),
      type: "text",
      read: true,
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === selectedConversation) {
          return {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: newMsg,
          };
        }
        return conv;
      })
    );

    setNewMessage("");
    setIsTyping(false);
  };

  const markAsRead = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map((msg) => ({ ...msg, read: true })),
          };
        }
        return conv;
      })
    );
  };

  const toggleStar = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return { ...conv, isStarred: !conv.isStarred };
        }
        return conv;
      })
    );
  };

  const archiveConversation = (conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return { ...conv, isArchived: !conv.isArchived };
        }
        return conv;
      })
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return formatTime(date);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });
    }
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return formatDate(date);
  };

  const filteredConversations = conversations
    .filter((conv) => !conv.isArchived)
    .filter((conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // const totalUnreadCount = conversations.reduce(
  //   (sum, conv) => sum + conv.unreadCount,
  //   0
  // );

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [newMessage]);

  return (
    <div className=" bg-gray-50 mb-60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        {/* <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tin nhắn</h1>
              <p className="text-gray-600">
                {totalUnreadCount > 0
                  ? `${totalUnreadCount} unread messages`
                  : "All caught up!"}
              </p>
            </div>
          </div>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card padding="none" className="h-full flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => {
                      setSelectedConversation(conversation.id);
                      if (conversation.unreadCount > 0) {
                        markAsRead(conversation.id);
                      }
                    }}
                    className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left relative ${
                      selectedConversation === conversation.id
                        ? "bg-green-50 border-green-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Image
                          width={40}
                          height={40}
                          src={conversation.participant.avatar}
                          alt={conversation.participant.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.participant.online ? (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        ) : (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900 truncate">
                              {conversation.participant.name}
                            </h3>
                            {conversation.isStarred && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDate(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          {conversation.participant.profession}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">
                            {conversation.lastMessage.senderId === "me"
                              ? "You: "
                              : ""}
                            {conversation.lastMessage.content}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="danger" size="sm">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                        {!conversation.participant.online &&
                          conversation.participant.lastSeen && (
                            <p className="text-xs text-gray-400 mt-1">
                              Last seen{" "}
                              {formatLastSeen(
                                conversation.participant.lastSeen
                              )}
                            </p>
                          )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConv ? (
              <Card padding="none" className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Image
                        width={40}
                        height={40}
                        src={selectedConv.participant.avatar}
                        alt={selectedConv.participant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConv.participant.online ? (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      ) : (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {selectedConv.participant.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedConv.participant.online ? (
                          <span className="text-green-600">● Online</span>
                        ) : selectedConv.participant.lastSeen ? (
                          `Last seen ${formatLastSeen(
                            selectedConv.participant.lastSeen
                          )}`
                        ) : (
                          "Offline"
                        )}
                      </p>
                      {selectedConv.participant.profession && (
                        <p className="text-xs text-gray-400">
                          {selectedConv.participant.profession}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Star}
                      onClick={() => toggleStar(selectedConv.id)}
                      className={
                        selectedConv.isStarred ? "text-yellow-500" : ""
                      }
                    />
                    <Button variant="ghost" size="sm" icon={Phone} />
                    <Button variant="ghost" size="sm" icon={Video} />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Archive}
                      onClick={() => archiveConversation(selectedConv.id)}
                    />
                    <Button variant="ghost" size="sm" icon={MoreVertical} />
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto max-h-[70vh] p-4 space-y-4">
                  {selectedConv.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                        {message.senderId !== "me" && (
                          <Image
                            width={20}
                            height={20}
                            src={selectedConv.participant.avatar}
                            alt={selectedConv.participant.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        <div
                          className={`px-4 py-2 rounded-lg ${
                            message.senderId === "me"
                              ? "bg-green-500 text-white rounded-br-sm"
                              : "bg-gray-100 text-gray-900 rounded-bl-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.content}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              message.senderId === "me"
                                ? "text-green-100"
                                : "text-gray-500"
                            }`}
                          >
                            {formatTime(message.timestamp)}
                            {message.senderId === "me" && (
                              <span className="ml-2">
                                {message.read ? "✓✓" : "✓"}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && selectedConv.participant.online && (
                    <div className="flex justify-start">
                      <div className="flex items-end space-x-2">
                        <Image
                          width={20}
                          height={20}
                          src={selectedConv.participant.avatar}
                          alt={selectedConv.participant.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div className="bg-gray-100 px-4 py-2 rounded-lg rounded-bl-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-end space-x-2"
                  >
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        rows={1}
                        className="block w-full pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage(e);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="absolute right-3 bottom-2 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <Button
                      type="submit"
                      size="sm"
                      icon={Send}
                      disabled={!newMessage.trim()}
                      className="mb-0.5"
                    />
                  </form>

                  {/* Quick Emoji Picker */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-16 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10">
                      <div className="grid grid-cols-8 gap-1">
                        {[
                          "😊",
                          "😂",
                          "❤️",
                          "👍",
                          "👏",
                          "🙏",
                          "😢",
                          "😮",
                          "😍",
                          "🤔",
                          "👌",
                          "🔥",
                          "💪",
                          "🎉",
                          "😊",
                          "🤝",
                        ].map((emoji, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setNewMessage((prev) => prev + emoji);
                              setShowEmojiPicker(false);
                            }}
                            className="p-1 hover:bg-gray-100 rounded text-lg"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Choose a conversation from the list to start messaging
                  </p>
                  <Button icon={Plus}>Start New Conversation</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPages;
