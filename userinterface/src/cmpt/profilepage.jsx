// ProfilePage.jsx
import { useState } from "react";
import { 
  User, MapPin, Globe, Calendar, Edit, 
  Camera, Mail, Users, MoreVertical,
  Heart, MessageSquare, Share2, Bookmark,
  Briefcase, Link
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user data
const mockUserData = {
  id: 1,
  email: "alex@example.com",
  username: "alexdev",
  name: "Alex Johnson",
  bio: "Full-stack developer | React enthusiast | Open source contributor",
  profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  address: "San Francisco",
  country: "USA",
  role: "Senior Developer",
  createdAt: "2023-06-15T10:30:00Z",
  followers: 1242,
  following: 356,
  posts: 48
};

// Mock posts
const mockPosts = [
  {
    id: 1,
    content: "Just shipped a major feature update! 🚀 The new real-time collaboration is now live.",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
    createdAt: "2024-01-15T10:30:00Z",
    likes: 245,
    comments: 42,
    tags: ["webdev", "react", "realtime"]
  },
  {
    id: 2,
    content: "Learning Rust in 2024. The memory safety features are incredible!",
    imageUrl: null,
    createdAt: "2024-01-14T08:15:00Z",
    likes: 189,
    comments: 31,
    tags: ["rust", "programming", "learning"]
  },
  {
    id: 3,
    content: "Our team just won the hackathon! 🏆 Built a complete app in 48 hours.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    createdAt: "2024-01-13T16:45:00Z",
    likes: 312,
    comments: 56,
    tags: ["hackathon", "team", "win"]
  }
];

export default function ProfilePage() {
  const [user] = useState(mockUserData);
  const [posts] = useState(mockPosts);
  const [isFollowing, setIsFollowing] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  // Format relative time
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {/* Profile Header Row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-background">
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback className="text-xl">
                    {user.name?.charAt(0) || user.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-1 -right-1 h-8 w-8 bg-background"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold">{user.name}</h1>
                  <Badge variant="secondary" className="text-xs">
                    {user.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>
                <p className="text-sm text-foreground max-w-md">{user.bio}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button 
                variant={isFollowing ? "outline" : "default"}
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" size="sm">
                Message
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <span className="h-4 w-4 mr-2">🗑️</span>
                    Delete Profile
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold">{user.posts}</div>
              <div className="text-xs text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{user.followers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">{user.following}</div>
              <div className="text-xs text-muted-foreground">Following</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">48K</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {user.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            {user.address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.address}, {user.country}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {formatDate(user.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span>Tech Industry</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Recent Posts</h2>
          <span className="text-sm text-muted-foreground">{posts.length} posts</span>
        </div>

        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{user.username}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(post.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Post</DropdownMenuItem>
                    <DropdownMenuItem>Delete Post</DropdownMenuItem>
                    <DropdownMenuItem>Share Post</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Post Content */}
              <p className="text-sm mb-3">{post.content}</p>
              
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Image */}
              {post.imageUrl && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="w-full h-auto max-h-[300px] object-cover"
                  />
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-1 mt-3 pt-3 border-t">
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                  <Heart className="h-3.5 w-3.5" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
                  <Bookmark className="h-3.5 w-3.5" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Followers/Following Preview */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Followers Preview</h3>
            <Button variant="ghost" size="sm" className="text-xs">
              View all
            </Button>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <Avatar className="h-12 w-12 mb-2">
                  <AvatarFallback className="bg-blue-100 text-blue-800">
                    U{i}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium">user{i}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}