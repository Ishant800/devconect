// // FeedSection.jsx
// import { useState } from "react";
// import { 
//   FaHeart, FaRegHeart, FaComment, FaShare, 
//   FaBookmark, FaRegBookmark, FaEllipsisH,
//   FaThumbsUp, FaRegComment, FaPaperPlane,
//   FaCheckCircle, FaGlobeAmericas
// } from "react-icons/fa";
// import { FiShare2 } from "react-icons/fi";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";

// const FeedSection = () => {
//   const [likedPosts, setLikedPosts] = useState({});
//   const [savedPosts, setSavedPosts] = useState({});
//   const [commentInputs, setCommentInputs] = useState({});

//   // Dummy posts data
//   const dummyPosts = [
//     {
//       id: 1,
//       user: {
//         id: 1,
//         name: "Alex Johnson",
//         username: "@alexdev",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
//         role: "Full Stack Developer",
//         isVerified: true,
//         isOnline: true
//       },
//       content: "Just launched my new portfolio website built with Next.js 14 and Tailwind CSS! 🚀 The performance improvements are insane. Check it out and let me know what you think!",
//       imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
//       createdAt: "2024-01-15T10:30:00Z",
//       likes: 245,
//       comments: 42,
//       shares: 18,
//       tags: ["webdev", "nextjs", "tailwind", "portfolio"],
//       category: "Tech",
//       readTime: "3 min"
//     },
//     {
//       id: 2,
//       user: {
//         id: 2,
//         name: "Sarah Chen",
//         username: "@sarahcodes",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//         role: "Frontend Engineer",
//         isVerified: true,
//         isOnline: false
//       },
//       content: "Working on a new React component library with accessibility as the main focus. Making sure every component follows WCAG 2.1 guidelines. What's your favorite accessibility tool?",
//       imageUrl: null,
//       createdAt: "2024-01-15T08:15:00Z",
//       likes: 189,
//       comments: 31,
//       shares: 12,
//       tags: ["react", "a11y", "webaccessibility", "frontend"],
//       category: "Development"
//     },
//     {
//       id: 3,
//       user: {
//         id: 3,
//         name: "Mike Wilson",
//         username: "@mikew",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
//         role: "DevOps Engineer",
//         isVerified: false,
//         isOnline: true
//       },
//       content: "Successfully migrated our Kubernetes cluster to the latest version with zero downtime! The new features are game-changing for our microservices architecture. 🎯",
//       imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w-800&auto=format&fit=crop&q=60",
//       createdAt: "2024-01-14T16:45:00Z",
//       likes: 312,
//       comments: 56,
//       shares: 24,
//       tags: ["kubernetes", "devops", "microservices", "cloud"],
//       category: "DevOps",
//       readTime: "2 min"
//     },
//     {
//       id: 4,
//       user: {
//         id: 4,
//         name: "Priya Sharma",
//         username: "@priya_ai",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
//         role: "ML Engineer",
//         isVerified: true,
//         isOnline: false
//       },
//       content: "Just published a paper on our latest work with transformer models for medical imaging. The results show a 15% improvement in accuracy compared to previous state-of-the-art models!",
//       imageUrl: null,
//       createdAt: "2024-01-14T14:20:00Z",
//       likes: 428,
//       comments: 89,
//       shares: 37,
//       tags: ["ai", "machinelearning", "research", "healthtech"],
//       category: "AI/ML"
//     },
//     {
//       id: 5,
//       user: {
//         id: 5,
//         name: "David Lee",
//         username: "@david_ux",
//         avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
//         role: "UI/UX Designer",
//         isVerified: true,
//         isOnline: true
//       },
//       content: "Redesigned our mobile app dashboard with a focus on user retention. The new analytics show a 40% increase in daily active users! Sharing some design principles that worked for us.",
//       imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
//       createdAt: "2024-01-14T11:10:00Z",
//       likes: 189,
//       comments: 34,
//       shares: 19,
//       tags: ["design", "ux", "mobile", "product"],
//       category: "Design",
//       readTime: "4 min"
//     }
//   ];

//   // Format date
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) {
//       return "Just now";
//     } else if (diffInHours < 24) {
//       return `${diffInHours}h ago`;
//     } else if (diffInHours < 168) {
//       return `${Math.floor(diffInHours / 24)}d ago`;
//     } else {
//       return date.toLocaleDateString('en-US', { 
//         month: 'short', 
//         day: 'numeric' 
//       });
//     }
//   };

//   // Handle like
//   const handleLike = (postId) => {
//     setLikedPosts(prev => ({
//       ...prev,
//       [postId]: !prev[postId]
//     }));
//   };

//   // Handle save
//   const handleSave = (postId) => {
//     setSavedPosts(prev => ({
//       ...prev,
//       [postId]: !prev[postId]
//     }));
//   };

//   // Handle comment input
//   const handleCommentInput = (postId, value) => {
//     setCommentInputs(prev => ({
//       ...prev,
//       [postId]: value
//     }));
//   };

//   // Handle comment submit
//   const handleCommentSubmit = (postId) => {
//     const comment = commentInputs[postId];
//     if (comment?.trim()) {
//       console.log(`Comment on post ${postId}:`, comment);
//       setCommentInputs(prev => ({
//         ...prev,
//         [postId]: ""
//       }));
//     }
//   };

//   // Post Card Component
//   const PostCard = ({ post }) => {
//     const isLiked = likedPosts[post.id] || false;
//     const isSaved = savedPosts[post.id] || false;
//     const commentInput = commentInputs[post.id] || "";

//     return (
//       <Card className="mb-6 border-border hover:shadow-md transition-shadow duration-300">
//         {/* Post Header */}
//         <CardHeader className="pb-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Avatar className="h-10 w-10 border-2 border-background">
//                   <AvatarImage src={post.user.avatar} />
//                   <AvatarFallback className="bg-primary text-primary-foreground">
//                     {post.user.name.charAt(0)}
//                   </AvatarFallback>
//                 </Avatar>
//                 {post.user.isOnline && (
//                   <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
//                 )}
//               </div>
              
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2">
//                   <h4 className="font-semibold text-sm hover:text-primary cursor-pointer">
//                     {post.user.name}
//                   </h4>
//                   {post.user.isVerified && (
//                     <FaCheckCircle className="h-3 w-3 text-blue-500" />
//                   )}
//                   <Badge variant="outline" className="text-xs py-0 px-1.5">
//                     {post.user.role}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <p className="text-xs text-muted-foreground">
//                     {post.user.username} • {formatDate(post.createdAt)}
//                   </p>
//                   {post.category && (
//                     <Badge variant="secondary" className="text-xs py-0 px-2">
//                       {post.category}
//                     </Badge>
//                   )}
//                   {post.readTime && (
//                     <span className="text-xs text-muted-foreground">
//                       • {post.readTime} read
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <Button variant="ghost" size="icon" className="h-8 w-8">
//               <FaEllipsisH className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>

//         {/* Post Content */}
//         <CardContent className="pb-3">
//           <p className="text-sm text-foreground whitespace-pre-line mb-3">
//             {post.content}
//           </p>
          
//           {/* Tags */}
//           {post.tags && post.tags.length > 0 && (
//             <div className="flex flex-wrap gap-1 mb-3">
//               {post.tags.map((tag, index) => (
//                 <Badge 
//                   key={index} 
//                   variant="outline" 
//                   className="text-xs py-0.5 px-2 hover:bg-secondary cursor-pointer"
//                 >
//                   #{tag}
//                 </Badge>
//               ))}
//             </div>
//           )}
          
//           {/* Image */}
//           {post.imageUrl && (
//             <div className="rounded-lg overflow-hidden border border-border">
//               <img
//                 src={post.imageUrl}
//                 alt="Post"
//                 className="w-full h-auto max-h-[400px] object-cover hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//           )}
//         </CardContent>

//         <Separator />

//         {/* Engagement Stats */}
//         <div className="px-6 py-3">
//           <div className="flex items-center justify-between text-xs text-muted-foreground">
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-1">
//                 <FaThumbsUp className="h-3 w-3 text-blue-500" />
//                 <span>{post.likes.toLocaleString()} likes</span>
//               </div>
//               <div className="flex items-center gap-1 cursor-pointer hover:text-primary">
//                 <FaRegComment className="h-3 w-3" />
//                 <span>{post.comments.toLocaleString()} comments</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <FiShare2 className="h-3 w-3 text-green-500" />
//                 <span>{post.shares.toLocaleString()} shares</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-1">
//               <FaGlobeAmericas className="h-3 w-3" />
//               <span>Public</span>
//             </div>
//           </div>
//         </div>

//         <Separator />

//         {/* Action Buttons */}
//         <CardFooter className="p-3">
//           <div className="grid grid-cols-4 gap-1 w-full">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => handleLike(post.id)}
//               className={`gap-2 rounded-lg ${isLiked ? 'text-red-600 hover:text-red-700 bg-red-50' : ''}`}
//             >
//               {isLiked ? (
//                 <FaHeart className="h-4 w-4" />
//               ) : (
//                 <FaRegHeart className="h-4 w-4" />
//               )}
//               <span className="hidden sm:inline">Like</span>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               className="gap-2 rounded-lg hover:bg-blue-50"
//             >
//               <FaComment className="h-4 w-4" />
//               <span className="hidden sm:inline">Comment</span>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               className="gap-2 rounded-lg hover:bg-green-50"
//             >
//               <FaShare className="h-4 w-4" />
//               <span className="hidden sm:inline">Share</span>
//             </Button>

//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => handleSave(post.id)}
//               className={`gap-2 rounded-lg ${isSaved ? 'text-blue-600 hover:text-blue-700 bg-blue-50' : ''}`}
//             >
//               {isSaved ? (
//                 <FaBookmark className="h-4 w-4" />
//               ) : (
//                 <FaRegBookmark className="h-4 w-4" />
//               )}
//               <span className="hidden sm:inline">Save</span>
//             </Button>
//           </div>
//         </CardFooter>

//         {/* Quick Comment Input */}
//         <div className="px-6 pb-4 pt-2">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-8 w-8">
//               <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
//               <AvatarFallback>Y</AvatarFallback>
//             </Avatar>
//             <div className="flex-1 flex items-center gap-2">
//               <input
//                 type="text"
//                 value={commentInput}
//                 onChange={(e) => handleCommentInput(post.id, e.target.value)}
//                 placeholder="Write a comment..."
//                 className="flex-1 px-3 py-2 text-sm border border-input rounded-full focus:outline-none focus:ring-2 focus:ring-ring"
//                 onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
//               />
//               <Button 
//                 size="sm" 
//                 variant="ghost"
//                 onClick={() => handleCommentSubmit(post.id)}
//                 disabled={!commentInput.trim()}
//                 className="h-8 w-8 p-0"
//               >
//                 <FaPaperPlane className="h-3 w-3" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Card>
//     );
//   };

//   // Create Post Card
//   const CreatePostCard = () => (
//     <Card className="mb-6">
//       <CardContent className="p-4">
//         <div className="flex items-center gap-3 mb-4">
//           <Avatar className="h-10 w-10">
//             <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
//             <AvatarFallback>Y</AvatarFallback>
//           </Avatar>
//           <Button
//             variant="outline"
//             className="flex-1 justify-start text-muted-foreground hover:text-foreground"
//             onClick={() => console.log("Create post clicked")}
//           >
//             What's on your mind?
//           </Button>
//         </div>
//         <Separator className="mb-4" />
//         <div className="grid grid-cols-3 gap-2">
//           <Button variant="ghost" size="sm" className="gap-2 hover:bg-blue-50">
//             <FaThumbsUp className="h-4 w-4 text-blue-500" />
//             <span className="text-xs">Feeling/Activity</span>
//           </Button>
//           <Button variant="ghost" size="sm" className="gap-2 hover:bg-green-50">
//             <FiShare2 className="h-4 w-4 text-green-500" />
//             <span className="text-xs">Photo/Video</span>
//           </Button>
//           <Button variant="ghost" size="sm" className="gap-2 hover:bg-purple-50">
//             <FaPaperPlane className="h-4 w-4 text-purple-500" />
//             <span className="text-xs">Live Video</span>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="w-full max-w-2xl mx-auto px-4">
//       {/* Create Post */}
//       <CreatePostCard />
      
//       {/* Feed Header */}
//       <div className="mb-6">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold text-lg">Latest Posts</h3>
//               <div className="flex items-center gap-2">
//                 <Badge variant="secondary" className="text-xs">
//                   {dummyPosts.length} posts
//                 </Badge>
//                 <span className="text-xs text-muted-foreground">
//                   • Updated just now
//                 </span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
      
//       {/* Posts Feed */}
//       <div>
//         {dummyPosts.map(post => (
//           <PostCard key={post.id} post={post} />
//         ))}
//       </div>
      
//       {/* Load More */}
//       <div className="text-center mt-8 mb-12">
//         <Button variant="outline" className="gap-2">
//           <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
//             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//           </svg>
//           Load More Posts
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FeedSection;



// FeedSection.jsx
import { useState } from "react";
import { 
  FaHeart, FaRegHeart, FaComment, FaShare, 
  FaBookmark, FaRegBookmark, FaEllipsisH,
  FaCheckCircle, FaRegComment
} from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeedSection = () => {
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  // Dummy posts data
  const dummyPosts = [
    {
      id: 1,
      user: {
        id: 1,
        name: "Alex Johnson",
        username: "@alexdev",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        role: "Full Stack",
        isVerified: true,
        isOnline: true
      },
      content: "Just launched my new portfolio website built with Next.js 14 and Tailwind CSS! 🚀 The performance improvements are insane. Check it out and let me know what you think!",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=60",
      createdAt: "2024-01-15T10:30:00Z",
      likes: 245,
      comments: 42,
      tags: ["webdev", "nextjs", "tailwind"],
      category: "Tech"
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Sarah Chen",
        username: "@sarahcodes",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        role: "Frontend",
        isVerified: true,
        isOnline: false
      },
      content: "Working on a new React component library with accessibility as the main focus. Making sure every component follows WCAG 2.1 guidelines.",
      imageUrl: null,
      createdAt: "2024-01-15T08:15:00Z",
      likes: 189,
      comments: 31,
      tags: ["react", "a11y", "frontend"],
      category: "Dev"
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Mike Wilson",
        username: "@mikew",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        role: "DevOps",
        isVerified: false,
        isOnline: true
      },
      content: "Successfully migrated our Kubernetes cluster to the latest version with zero downtime! The new features are game-changing.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
      createdAt: "2024-01-14T16:45:00Z",
      likes: 312,
      comments: 56,
      tags: ["kubernetes", "devops", "cloud"],
      category: "Infra"
    }
  ];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle like
  const handleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle save
  const handleSave = (postId) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  // Handle comment input
  const handleCommentInput = (postId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  // Handle comment submit
  const handleCommentSubmit = (postId) => {
    const comment = commentInputs[postId];
    if (comment?.trim()) {
      console.log(`Comment on post ${postId}:`, comment);
      setCommentInputs(prev => ({
        ...prev,
        [postId]: ""
      }));
    }
  };

  // Post Card Component
  const PostCard = ({ post }) => {
    const isLiked = likedPosts[post.id] || false;
    const isSaved = savedPosts[post.id] || false;
    const commentInput = commentInputs[post.id] || "";

    return (
      <Card className="mb-2 border-border hover:border-primary/20 transition-colors">
        {/* Post Header */}
        <div className="p-2 pb-2 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {post.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-sm truncate max-w-[120px]">
                    {post.user.name}
                  </span>
                  {post.user.isVerified && (
                    <FaCheckCircle className="h-3 w-3 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-muted-foreground">
                    {post.user.username}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {post.category && (
                <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                  {post.category}
                </Badge>
              )}
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <FaEllipsisH className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <CardContent className="p-3 pt-2">
          <p className="text-sm text-foreground mb-2">
            {post.content}
          </p>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Image */}
          {post.imageUrl && (
            <div className="rounded overflow-hidden mt-2">
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-auto max-h-[350px] object-cover"
              />
            </div>
          )}
        </CardContent>

        {/* Engagement Stats and Actions */}
        <CardFooter className="p-3 pt-2 border-t">
          <div className="w-full">
            {/* Stats Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaHeart className="h-2.5 w-2.5 text-blue-600" />
                  </span>
                  <span>{post.likes}</span>
                </div>
                <div 
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary cursor-pointer"
                >
                  <span>{post.comments} comments</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={`h-8 text-xs gap-1.5 ${isLiked ? 'text-red-600' : 'text-muted-foreground'}`}
              >
                {isLiked ? (
                  <FaHeart className="h-3.5 w-3.5" />
                ) : (
                  <FaRegHeart className="h-3.5 w-3.5" />
                )}
                Like
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs gap-1.5 text-muted-foreground"
              >
                <FaComment className="h-3.5 w-3.5" />
                Comment
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs gap-1.5 text-muted-foreground"
              >
                <FiShare2 className="h-3.5 w-3.5" />
                Share
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSave(post.id)}
                className={`h-8 text-xs gap-1.5 ${isSaved ? 'text-blue-600' : 'text-muted-foreground'}`}
              >
                {isSaved ? (
                  <FaBookmark className="h-3.5 w-3.5" />
                ) : (
                  <FaRegBookmark className="h-3.5 w-3.5" />
                )}
                Save
              </Button>
            </div>

            {/* Quick Comment Input */}
            {/* <div className="mt-3 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
                <AvatarFallback className="text-xs">Y</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center gap-1">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => handleCommentInput(post.id, e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 px-3 py-1.5 text-xs border border-input rounded-full focus:outline-none focus:ring-1 focus:ring-ring"
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                />
                <button
                  onClick={() => handleCommentSubmit(post.id)}
                  disabled={!commentInput.trim()}
                  className="text-xs text-blue-600 hover:text-blue-700 disabled:text-muted-foreground disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div> */}
          </div>
        </CardFooter>
      </Card>
    );
  };

  // Create Post Card (Minimal)
  const CreatePostCard = () => (
    <Card className="mb-2">
      <div className="px-2">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" />
            <AvatarFallback className="text-xs">Y</AvatarFallback>
          </Avatar>
          <button
            className="flex-1 text-left px-3 py-2 text-sm text-muted-foreground bg-muted hover:bg-muted/80 rounded-xl transition-colors"
            onClick={() => console.log("Create post clicked")}
          >
            What's on your mind?
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <button className="flex-1 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
            <div className="flex items-center justify-center gap-1">
              <FaRegHeart className="h-3.5 w-3.5" />
              Feeling
            </div>
          </button>
          <button className="flex-1 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
            <div className="flex items-center justify-center gap-1">
              <FiShare2 className="h-3.5 w-3.5" />
              Photo
            </div>
          </button>
          <button className="flex-1 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors">
            <div className="flex items-center justify-center gap-1">
              <FaRegComment className="h-3.5 w-3.5" />
              Video
            </div>
          </button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Create Post - Minimal */}
      <CreatePostCard />
      
      {/* Posts Feed */}
      <div>
        {dummyPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Load More */}
      <div className="text-center my-6">
        <button className="text-sm text-muted-foreground hover:text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors">
          Show more posts
        </button>
      </div>
    </div>
  );
};

export default FeedSection;