import { useState } from "react";
import { 
  Search, Users, TrendingUp, Filter, Calendar, 
  Hash, Star, Eye, Zap, MessageSquare,
  ChevronRight, MoreVertical, Check, Users2, Bookmark,
  Flame, TrendingUp as TrendingUpIcon, Clock, ThumbsUp
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const RightSidebar = () => {
  const [activeFilter, setActiveFilter] = useState("trending");
  const [followedUsers, setFollowedUsers] = useState(new Set([1, 3]));
  const [selectedTags, setSelectedTags] = useState(["react", "typescript"]);

  const userProfile = {
    name: "Alex Johnson",
    username: "@alexdev",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    followers: "2.4K",
    following: "512"
  };

  const suggestedUsers = [
    { id: 1, name: "Sarah Chen", username: "@sarahcodes", role: "Frontend", mutual: 12, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { id: 2, name: "Mike Wilson", username: "@mikew", role: "DevOps", mutual: 8, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
    { id: 3, name: "Priya Sharma", username: "@priya_ai", role: "ML", mutual: 5, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { id: 4, name: "David Lee", username: "@david_ux", role: "Design", mutual: 15, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David" },
  ];

  const trendingTags = [
    { tag: "reactjs", posts: "2.3K", trending: true },
    { tag: "nextjs", posts: "1.8K", trending: true },
    { tag: "typescript", posts: "1.5K", trending: false },
    { tag: "tailwind", posts: "1.2K", trending: true },
    { tag: "graphql", posts: "890", trending: false },
    { tag: "docker", posts: "756", trending: false },
    { tag: "aws", posts: "1.1K", trending: true },
    { tag: "python", posts: "2.1K", trending: false },
  ];

  const filters = [
    { id: "trending", label: "Trending", icon: Flame },
    { id: "latest", label: "Latest", icon: Clock },
    { id: "popular", label: "Popular", icon: ThumbsUp },
    { id: "following", label: "Following", icon: Users },
  ];

  const events = [
    { id: 1, title: "React Conf 2024", date: "Dec 15", type: "virtual", attendees: "1.2K" },
    { id: 2, title: "Tech Meetup", date: "Dec 20", type: "in-person", attendees: "340" },
    { id: 3, title: "Dev Workshop", date: "Jan 5", type: "virtual", attendees: "890" },
  ];

  const handleFollow = (userId) => {
    setFollowedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <aside className="hidden xl:block fixed top-0 right-0 w-80 h-screen bg-background border-l z-30">
      <div className="h-full flex flex-col">
        {/* Compact User Profile */}
        <div className="flex-shrink-0 pt-18 px-4 pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  AJ
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-sm">{userProfile.name}</h3>
                <p className="text-xs text-muted-foreground">{userProfile.username}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs">
            <div className="text-center">
              <div className="font-bold">{userProfile.followers}</div>
              <div className="text-muted-foreground">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{userProfile.following}</div>
              <div className="text-muted-foreground">Following</div>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-9 h-9 text-sm"
            />
          </div>

          {/* Feed Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Feed Filters</Label>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                Clear
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {filters.map(filter => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className="h-9 justify-start gap-2 text-xs"
                >
                  <filter.icon className="h-3.5 w-3.5" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Trending Tags</Label>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {trendingTags.slice(0, 6).map((item) => (
                <Button
                  key={item.tag}
                  variant={selectedTags.includes(item.tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(item.tag)}
                  className="h-9 justify-between text-xs"
                >
                  <span>#{item.tag}</span>
                  {item.trending && <Flame className="h-3 w-3 text-orange-500" />}
                </Button>
              ))}
            </div>
          </div>

          {/* Suggested Connections */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users2 className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Suggested Accounts</Label>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                See all
              </Button>
            </div>
            <div className="space-y-3">
              {suggestedUsers.map(user => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.role} • {user.mutual} mutual</div>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={followedUsers.has(user.id) ? "outline" : "default"}
                    className="h-7 px-3 text-xs"
                    onClick={() => handleFollow(user.id)}
                  >
                    {followedUsers.has(user.id) ? "Following" : "Follow"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Upcoming Events</Label>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                Create
              </Button>
            </div>
            <div className="space-y-2">
              {events.map(event => (
                <Card key={event.id} className="overflow-hidden hover:bg-accent/50">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium mb-1">{event.title}</div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <Eye className="h-3 w-3 inline mr-1" />
                        {event.attendees}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2 h-9">
              <Bookmark className="h-4 w-4" />
              <span className="text-sm">Saved Posts</span>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 h-9">
              <Zap className="h-4 w-4" />
              <span className="text-sm">Popular Today</span>
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-foreground">About</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground">Help</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground">Privacy</a>
            </div>
            <div>© 2024 SocialApp</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;