// homepage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import RightSidebar from "../components/rightSidebar";
import CreatePostForm from "../components/showcreatePost";
import { fetchPosts } from "../features/posts/postsSlice";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaBookmark, FaRegBookmark, FaEllipsisH } from "react-icons/fa";
import ProfilePage from "../components/profilepage";
import { token } from "../utility/tokendeocde";

export default function HomePage() {
  const dispatch = useDispatch();
  const { posts, status } = useSelector((state) => state.posts);
  const [showPostForm, setShowPostForm] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [likedPosts, setLikedPosts] = useState({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState({});
  const [comments, setComments] = useState({}); // State to store comments per post
  const [likesPerPost, setLikesPerPost] = useState({}); // State to store likes (userIds) per post
  const [newComment, setNewComment] = useState({}); // State for new comment input per post
  const [showComments, setShowComments] = useState({}); // State to toggle comment section per post



  // Fetch posts when the page loads
  useEffect(() => {
    if (status === "idle" && currentPage === "home") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status, currentPage]);

  // Handle like toggle
  const handleLike = (postId) => {
    const userId = 3; // Example userId, can be dynamic
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));

    setLikesPerPost((prev) => {
      const currentLikes = prev[postId] ? [...prev[postId]] : [];
      if (currentLikes.includes(userId)) {
        // Unlike: remove userId
        return { ...prev, [postId]: currentLikes.filter((id) => id !== userId) };
      } else {
        // Like: add userId
        const likeData = {
          userId: userId,
          postId: postId
        };
        // Placeholder for sending JSON data (e.g., to server)
        // console.log("Sending like data:", likeData);
        return { ...prev, [postId]: [...currentLikes, userId] };
      }
    });
  };

  const handleBookmark = (id) => {
    setBookmarkedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle comment toggle
  const handleCommentToggle = (postId) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Handle new comment change
  const handleNewCommentChange = (postId, value) => {
    setNewComment((prev) => ({ ...prev, [postId]: value }));
  };

  // Handle comment submission
  const handleCommentSubmit = (postId) => {

    const tokendata = token()
    const userId = tokendata.sub;


    const commentText = newComment[postId] || "";
    if (commentText.trim()) {
      const commentData = {
        text: commentText,
        userId: userId, // Example userId, can be dynamic
        postId: postId // Using postId
      };
      console.log(commentData)
      setComments((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), commentData]
      }));
      setNewComment((prev) => ({ ...prev, [postId]: "" })); // Clear input
      // Placeholder for real-time API/WebSocket call
      // e.g., sendCommentToServer(commentData);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="w-2/5 mx-6 my-2 space-y-6">
            {/* Posts List */}
            {status === "pending" && (
              <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {status === "rejected" && (
              <p className="text-center text-red-500">Failed to load posts.</p>
            )}
            {posts.length === 0 && status === "succeeded" && (
              <p className="text-center text-gray-500">No posts yet. Be the first to post!</p>
            )}

            {posts.map((post) => {
              const postId = post.id;
              const likeCount = likesPerPost[postId]?.length || 0;
              const commentCount = comments[postId]?.length || 0;

              return (
                <div
                  key={postId}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* User Info */}
                  <div className="p-6 pb-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.user?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{post.user?.username || "Unknown User"}</h3>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <FaEllipsisH />
                    </button>
                  </div>

                  <div className="px-6 pb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  </div>

                  {post.imageUrl && (
                    <div className="px-6 pb-4">
                      <img
                        src={post.imageUrl}
                        alt="Post"
                        className="w-full rounded-xl object-cover max-h-[500px]"
                      />
                    </div>
                  )}

                  <div className="px-6 py-3 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => handleLike(postId)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                        likedPosts[postId]
                          ? "text-red-600 bg-red-50"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {likedPosts[postId] ? <FaHeart /> : <FaRegHeart />}
                      <span>Like ({likeCount})</span>
                    </button>

                    <button
                      onClick={() => handleCommentToggle(postId)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                    >
                      <FaComment />
                      <span>Comment ({commentCount})</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                      <FaShare />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => handleBookmark(postId)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                        bookmarkedPosts[postId]
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {bookmarkedPosts[postId] ? <FaBookmark /> : <FaRegBookmark />}
                      <span>Save</span>
                    </button>
                  </div>

                  {/* Comment Section - Toggle visibility */}
                  {showComments[postId] && (
                    <div className="px-6 py-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={newComment[postId] || ""}
                          onChange={(e) => handleNewCommentChange(postId, e.target.value)}
                          placeholder="Write a comment..."
                          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleCommentSubmit(postId)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Post
                        </button>
                      </div>
                      <div className="space-y-2">
                        {comments[postId]?.map((comment, index) => (
                          <div key={index} className="text-gray-700">
                            <span className="font-semibold">User {comment.userId}:</span> {comment.text}
                          </div>
                        )) || <p className="text-gray-500">No comments yet.</p>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">Messages</h2>
              <p className="text-gray-500">Your messages will appear here.</p>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="w-3/5 mx-6 my-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-500">Account settings will appear here.</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-3/5 mx-6 my-2">
            <p>Page not found</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar onOpenPostForm={() => setShowPostForm(true)} />

      <div className="flex justify-center pt-20 px-6">
        {/* Sidebar - Pass the current page and setter */}
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

        {/* Main Content - Changes based on currentPage */}
        {renderContent()}

        {/* RightSidebar - Only show on home page */}
        {currentPage === "home" && <RightSidebar />}
      </div>

      {/* Post Modal */}
      {showPostForm && (
        <CreatePostForm
          onClose={() => setShowPostForm(false)}
        />
      )}
    </div>
  );
}