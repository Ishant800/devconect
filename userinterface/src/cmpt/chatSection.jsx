// components/ChatSection.jsx
import { useState, useRef, useEffect } from "react";
import { 
  Search, MessageSquare, Phone, Video, MoreVertical,
  CheckCircle, Circle, Send, Paperclip, Smile, ImageIcon,
  ArrowLeft, Check, CheckCheck, Clock, Users, UserPlus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahcodes",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    isOnline: true,
    lastSeen: "just now",
    lastMessage: "Hey! Let's work on that React component",
    unreadCount: 2,
    timestamp: "10:30 AM"
  },
  {
    id: 2,
    name: "Mike Wilson",
    username: "@mikew",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    isOnline: true,
    lastSeen: "online",
    lastMessage: "The deployment went smoothly!",
    unreadCount: 0,
    timestamp: "Yesterday"
  },
  {
    id: 3,
    name: "Priya Sharma",
    username: "@priya_ai",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    isOnline: false,
    lastSeen: "2 hours ago",
    lastMessage: "Can you review my PR?",
    unreadCount: 1,
    timestamp: "2 days ago"
  },
  {
    id: 4,
    name: "David Lee",
    username: "@david_ux",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    isOnline: true,
    lastSeen: "online",
    lastMessage: "Loved your design!",
    unreadCount: 0,
    timestamp: "1 week ago"
  },
];

// Mock chat data
const mockChats = {
  1: [
    { id: 1, senderId: 1, text: "Hey! Let's work on that React component", timestamp: "10:30 AM", status: "read" },
    { id: 2, senderId: 0, text: "Sure! What do you have in mind?", timestamp: "10:31 AM", status: "read" },
    { id: 3, senderId: 1, text: "I was thinking about building a reusable modal component with TypeScript", timestamp: "10:32 AM", status: "read" },
    { id: 4, senderId: 0, text: "That sounds great! Want to collaborate on GitHub?", timestamp: "10:33 AM", status: "read" },
  ],
  2: [
    { id: 1, senderId: 2, text: "The deployment went smoothly!", timestamp: "Yesterday", status: "read" },
    { id: 2, senderId: 0, text: "Awesome! Great work!", timestamp: "Yesterday", status: "read" },
  ],
  3: [
    { id: 1, senderId: 3, text: "Can you review my PR?", timestamp: "2 days ago", status: "read" },
    { id: 2, senderId: 0, text: "Sure, send me the link", timestamp: "2 days ago", status: "read" },
  ],
  4: [
    { id: 1, senderId: 4, text: "Loved your design!", timestamp: "1 week ago", status: "read" },
    { id: 2, senderId: 0, text: "Thank you! Really appreciate it", timestamp: "1 week ago", status: "read" },
  ]
};

export default function ChatSection() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineUsers = filteredUsers.filter(user => user.isOnline);
  const offlineUsers = filteredUsers.filter(user => !user.isOnline);

  useEffect(() => {
    if (selectedUser) {
      setMessages(mockChats[selectedUser.id] || []);
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const newMsg = {
      id: messages.length + 1,
      senderId: 0,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");

    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        senderId: selectedUser.id,
        text: "Thanks for your message!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
        {/* Left Column - User List */}
        <div className={cn(
          "lg:col-span-1 flex flex-col",
          selectedUser && "hidden lg:flex"
        )}>
          {/* Header */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Messages</h2>
                  <Badge variant="secondary" className="text-xs">
                    {mockUsers.filter(u => u.unreadCount > 0).length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </CardContent>
          </Card>

          {/* User List */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {/* Online Users */}
            {onlineUsers.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    Online Now
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {onlineUsers.length} online
                  </span>
                </div>
                <div className="space-y-2">
                  {onlineUsers.map(user => (
                    <UserListItem
                      key={user.id}
                      user={user}
                      isSelected={selectedUser?.id === user.id}
                      onClick={() => setSelectedUser(user)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Messages */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-medium text-muted-foreground uppercase">
                  All Messages
                </span>
                <span className="text-xs text-muted-foreground">
                  {offlineUsers.length} offline
                </span>
              </div>
              <div className="space-y-2">
                {offlineUsers.map(user => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    isSelected={selectedUser?.id === user.id}
                    onClick={() => setSelectedUser(user)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Chat Area */}
        <div className={cn(
          "lg:col-span-2 flex flex-col",
          !selectedUser && "hidden lg:flex"
        )}>
          {selectedUser ? (
            <>
              {/* Chat Header */}
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedUser(null)}
                        className="lg:hidden"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedUser.avatar} />
                          <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
                          selectedUser.isOnline ? "bg-green-500" : "bg-gray-300"
                        )} />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold">{selectedUser.name}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-muted-foreground">
                            {selectedUser.isOnline ? "Online" : "Last seen recently"}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{selectedUser.username}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Messages Area */}
              <Card className="flex-1 mb-4">
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                          <Send className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                        <p className="text-muted-foreground">
                          Send your first message to start the conversation
                        </p>
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <MessageBubble
                            key={message.id}
                            message={message}
                            isOwnMessage={message.senderId === 0}
                          />
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button type="button" variant="ghost" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!newMessage.trim()}
                      className="flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No chat selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a conversation from the list or start a new chat
              </p>
              <Button>
                Start New Chat
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// User List Item Component
function UserListItem({ user, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
        isSelected 
          ? "bg-primary/10 border border-primary/20" 
          : "hover:bg-accent"
      )}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className={cn(
          "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-background",
          user.isOnline ? "bg-green-500" : "bg-gray-300"
        )} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm truncate">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.timestamp}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={cn(
            "text-xs truncate",
            user.unreadCount > 0 ? "font-medium" : "text-muted-foreground"
          )}>
            {user.lastMessage}
          </span>
        </div>
      </div>
      
      {user.unreadCount > 0 && (
        <Badge className="h-5 min-w-5 px-1 flex items-center justify-center">
          {user.unreadCount}
        </Badge>
      )}
    </button>
  );
}

// Message Bubble Component
function MessageBubble({ message, isOwnMessage }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return <Clock className="h-3 w-3" />;
    }
  };

  return (
    <div className={cn(
      "flex gap-3",
      isOwnMessage && "flex-row-reverse"
    )}>
      {!isOwnMessage && (
        <Avatar className="h-8 w-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-[70%] space-y-1",
        isOwnMessage && "text-right"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-2 inline-block",
          isOwnMessage
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted rounded-bl-none"
        )}>
          <p className="text-sm">{message.text}</p>
        </div>
        
        <div className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground",
          isOwnMessage ? "justify-end" : "justify-start"
        )}>
          <span>{message.timestamp}</span>
          {isOwnMessage && (
            <>
              <span>•</span>
              {getStatusIcon(message.status)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}