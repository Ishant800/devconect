// homepage.jsx
import { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../cmpt/navbar";
import Sidebar from "../cmpt/sidebar";
import RightSidebar from "../cmpt/rightSidebar";
import CreatePostForm from "../cmpt/showcreatePost";
import { fetchPosts, fetchPostDetails, addComment} from "../features/posts/postsSlice";
import { 
  FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, 
  FaRegBookmark, FaEllipsisH, FaTimes, FaPaperPlane,
  FaSmile, FaImage, FaVideo, FaCalendar, FaThumbsUp
} from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import ProfilePage from "../cmpt/profilepage";
import { token } from "../utility/tokendeocde";

export default function HomePage() {
  const dispatch = useDispatch();
  const { posts, postsStatus, postDetails, detailsStatus } = useSelector((state) => state.posts);
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [comments, setComments] = useState({});
  const [likesPerPost, setLikesPerPost] = useState({});
  const [newComment, setNewComment] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentPopupOpen, setCommentPopupOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // For feed filtering

  // Fetch posts when the page loads
  useEffect(() => {
    if (postsStatus === "idle" && currentPage === "home") {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus, currentPage]);

  // Handle like toggle with API integration
  const handleLike = useCallback(async (postId) => {
    const userId = 3; // Example userId, can be dynamic
    const isCurrentlyLiked = likedPosts[postId];
    
    // Optimistic update
    setLikedPosts(prev => ({ ...prev, [postId]: !isCurrentlyLiked }));
    setLikesPerPost(prev => {
      const currentLikes = prev[postId] ? [...prev[postId]] : [];
      if (isCurrentlyLiked) {
        return { ...prev, [postId]: currentLikes.filter(id => id !== userId) };
      } else {
        return { ...prev, [postId]: [...currentLikes, userId] };
      }
    });

    try {
      // Dispatch like action to API
      await dispatch(likePost({ postId, userId })).unwrap();
    } catch (error) {
      // Revert on error
      setLikedPosts(prev => ({ ...prev, [postId]: isCurrentlyLiked }));
      console.error("Failed to like post:", error);
    }
  }, [dispatch, likedPosts]);

  // Handle comment popup open
  const handleCommentPopup = useCallback(async (postId) => {
    setSelectedPostId(postId);
    setCommentPopupOpen(true);
    
    try {
      await dispatch(fetchPostDetails(postId)).unwrap();
    } catch (error) {
      console.error("Failed to fetch post details:", error);
    }
  }, [dispatch]);

  // Close comment popup
  const closeCommentPopup = useCallback(() => {
    setCommentPopupOpen(false);
    setSelectedPostId(null);
  }, []);

  // Handle bookmark toggle
  const handleBookmark = useCallback((id) => {
    setBookmarkedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Handle comment submission
  const handleCommentSubmit = useCallback(async (postId) => {
    const tokendata = token();
    const userId = tokendata.sub;
    const commentText = newComment[postId]?.trim() || "";

    if (commentText) {
      try {
        await dispatch(addComment({
          userId,
          text: commentText,
          projectId: postId
        })).unwrap();

        // Clear input after successful submission
        setNewComment(prev => ({ ...prev, [postId]: "" }));
        
        // Refresh post details
        dispatch(fetchPostDetails(postId));
        
        // Show success feedback
        if (commentPopupOpen) {
          // You could add a toast notification here
        }
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }
  }, [dispatch, newComment, commentPopupOpen]);

  // Filter posts based on active tab
  const filteredPosts = useMemo(() => {
    if (activeTab === "following") {
      return posts.filter(post => post.user?.following); // Assuming post has following property
    }
    if (activeTab === "popular") {
      return [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    return posts;
  }, [posts, activeTab]);

  // Post Card Component
  const PostCard = ({ post, isPopup = false, compact = false }) => {
    if (!post) return null;
    
    const postId = post.id;
    const likeCount = likesPerPost[postId]?.length || post.likes || 0;
    const commentCount = post.comments?.length || comments[postId]?.length || 0;
    const isLiked = likedPosts[postId];
    const isBookmarked = bookmarkedPosts[postId];

    return (
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md ${
        isPopup ? '' : compact ? 'mb-4' : 'mb-6'
      }`}>
        {/* User Info */}
        <div className="p-5 pb-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={post.user?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              {post.user?.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                  {post.user?.username || "Unknown User"}
                </h3>
                {post.user?.isVerified && (
                  <span className="text-blue-500" title="Verified">
                    ✓
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                  {post.category || "General"}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
              <FaEllipsisH />
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-5 pb-3">
          <p className="text-gray-800 leading-relaxed whitespace-pre-line">
            {post.content}
            {post.tags?.map(tag => (
              <span key={tag} className="text-blue-500 hover:text-blue-600 cursor-pointer ml-1">
                #{tag}
              </span>
            ))}
          </p>
        </div>

        {/* Post Media */}
        {post.imageUrl && (
          <div className="px-5 pb-4">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={post.imageUrl}
                alt="Post"
                className="w-full h-auto max-h-[500px] object-cover hover:scale-105 transition-transform duration-300"
              />
              {post.videoUrl && (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 p-4 rounded-full hover:bg-opacity-100 transition">
                    ▶
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Engagement Stats */}
        <div className="px-5 py-3 border-t border-b border-gray-100 flex justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-gray-600">
              <FaThumbsUp className="text-blue-500" />
              <span>{likeCount.toLocaleString()}</span>
            </span>
            <span 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => handleCommentPopup(postId)}
            >
              <FaComment />
              <span>{commentCount.toLocaleString()}</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-600">
              <FiShare2 />
              <span>{post.shares || 0}</span>
            </span>
          </div>
          <div className="text-gray-500">
            {post.readTime && `${post.readTime} min read`}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-5 py-3 flex justify-around">
          <button
            onClick={() => handleLike(postId)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
              isLiked
                ? "text-red-600 bg-red-50 hover:bg-red-100"
                : "text-gray-600 hover:text-red-600 hover:bg-gray-100"
            }`}
          >
            <div className="relative">
              {isLiked ? (
                <FaHeart className="w-5 h-5" />
              ) : (
                <FaRegHeart className="w-5 h-5" />
              )}
            </div>
            <span className="font-medium">Like</span>
          </button>

          <button
            onClick={() => handleCommentPopup(postId)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <FaComment className="w-5 h-5" />
            <span className="font-medium">Comment</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200">
            <FaShare className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </button>

          <button
            onClick={() => handleBookmark(postId)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
              isBookmarked
                ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            }`}
          >
            {isBookmarked ? (
              <FaBookmark className="w-5 h-5" />
            ) : (
              <FaRegBookmark className="w-5 h-5" />
            )}
            <span className="font-medium">Save</span>
          </button>
        </div>

        {/* Quick Comment Input (for compact view) */}
        {!compact && !isPopup && (
          <div className="px-5 pb-4 pt-2">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                alt="Your avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newComment[postId] || ""}
                  onChange={(e) => setNewComment(prev => ({ ...prev, [postId]: e.target.value }))}
                  placeholder="Write a comment..."
                  className="w-full p-3 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition"
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(postId)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <button className="text-gray-400 hover:text-blue-500">
                    <HiOutlineEmojiHappy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleCommentSubmit(postId)}
                    disabled={!newComment[postId]?.trim()}
                    className="text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FaPaperPlane className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Comments List Component
  const CommentsList = ({ postId }) => {
    const postComments = postDetails?.comments || comments[postId] || [];

    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {postComments.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <FaComment className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          postComments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 group hover:bg-gray-50 p-2 rounded-xl transition">
              <div className="relative">
                <img
                  src={comment.user?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">
                        {comment.user?.username || "Unknown User"}
                      </h4>
                      {comment.user?.isVerified && (
                        <span className="text-blue-500 text-xs">✓</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm">{comment.text}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Like</button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Reply</button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Share</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  // Comment Input Component for popup
  const CommentInput = ({ postId }) => {
    return (
      <div className="border-t border-gray-200 bg-white">
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 relative">
              <input
                type="text"
                value={newComment[postId] || ""}
                onChange={(e) => setNewComment(prev => ({ ...prev, [postId]: e.target.value }))}
                placeholder="Write a comment..."
                className="w-full p-3 pl-4 pr-12 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition"
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(postId)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-3">
                <button className="text-gray-400 hover:text-yellow-500">
                  <FaSmile className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-green-500">
                  <FaImage className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleCommentSubmit(postId)}
                  disabled={!newComment[postId]?.trim()}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading Skeleton
  const PostSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-5 pb-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
          <div>
            <div className="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="w-24 h-3 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="px-5 pb-4">
        <div className="w-full h-64 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="w-2/4 mx-6 my-2">
            {/* Create Post Button */}
            <div className="mb-4">
  <div className="rounded-2xl border bg-background p-5 shadow-sm">
    {/* Top input row */}
    <div className="flex items-center gap-4">
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
        alt="Your avatar"
        className="h-11 w-11 rounded-full object-cover"
      />

      <button
        onClick={() => setShowPostForm(true)}
        className="flex-1 flex justify-between items-center rounded-full border bg-muted px-4 py-2 text-left text-sm text-muted-foreground hover:bg-muted/80 transition"
      >
        What’s on your mind?
        <div className="grid grid-cols-3 gap-2">
        <FaImage />
        <FaVideo/>
        <FaCalendar/>
        </div>
        
      </button>
    </div>

    
  </div>
</div>
            {/* Feed Tabs */}
            <div className="mb-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
                <div className="flex space-x-1">
                  {["all", "following", "popular"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                        activeTab === tab
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Posts List */}
            {postsStatus === "pending" && (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <PostSkeleton key={i} />
                ))}
              </div>
            )}
            
            {postsStatus === "rejected" && (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <FaTimes className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load posts</h3>
                <p className="text-gray-500 mb-4">Please check your connection and try again.</p>
                <button 
                  onClick={() => dispatch(fetchPosts())}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-medium"
                >
                  Retry
                </button>
              </div>
            )}

            {filteredPosts.length === 0 && postsStatus === "succeeded" && (
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaRegHeart className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500 mb-4">Be the first to share something amazing!</p>
                <button 
                  onClick={() => setShowPostForm(true)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition font-medium"
                >
                  Create Post
                </button>
              </div>
            )}

            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        );

      case "profile":
        return (
          <div className="w-3/5 mx-6 my-2">
            <ProfilePage />
          </div>
        );

      case "messages":
        return (
          <div className="w-3/5 mx-6 my-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaPaperPlane className="w-10 h-10 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your Messages</h2>
                <p className="text-gray-500 mb-6">Connect with your community and start conversations</p>
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition font-medium">
                  Start New Chat
                </button>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="w-3/5 mx-6 my-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                <div className="space-y-4">
                  {["Account", "Notifications", "Privacy", "Security"].map((item) => (
                    <button
                      key={item}
                      className="w-full p-4 text-left rounded-xl hover:bg-gray-50 border border-gray-100 hover:border-gray-200 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item}</span>
                        <span className="text-gray-400">→</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar onOpenPostForm={() => setShowPostForm(true)} />

      {/* Background blur overlay */}
      {(commentPopupOpen || showPostForm) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300" />
      )}

      <div className={`flex justify-center pt-20 px-4 ${commentPopupOpen || showPostForm ? 'blur-sm' : ''}`}>
        {/* Sidebar */}
        <div className="w-1/6">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        {/* Main Content */}
        {renderContent()}

        {/* RightSidebar - Only show on home page */}
        {currentPage === "home" && (
          <div className="w-1/4">
            <RightSidebar />
          </div>
        )}
      </div>

      {/* Post Modal */}
      {showPostForm && (
        <CreatePostForm
          onClose={() => setShowPostForm(false)}
        />
      )}

      {/* Comment Popup Modal */}
      {commentPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 flex-shrink-0 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-900">Post Details</h2>
              </div>
              <button
                onClick={closeCommentPopup}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {detailsStatus === "loading" ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-500">Loading comments...</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {/* Post Card in Popup */}
                  {postDetails && (
                    <div className="p-6">
                      <PostCard post={postDetails} isPopup={true} compact={true} />
                    </div>
                  )}
                  
                  {/* Comments Section */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 text-lg">Comments</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {postDetails?.comments?.length || 0} total
                      </span>
                    </div>
                    <CommentsList postId={selectedPostId} />
                  </div>
                </div>
              )}
            </div>

            {/* Comment Input */}
            <CommentInput postId={selectedPostId} />
          </div>
        </div>
      )}
    </div>
  );
}

// Add this to your global CSS or create a utility class
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
`;