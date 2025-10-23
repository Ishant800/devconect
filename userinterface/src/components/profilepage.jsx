import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { userinfo } from "../features/auth/auth";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ProfileUpdateForm from "./profileUpdateform";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { userdetails } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("posts");
  const [likedPosts, setLikedPosts] = useState({});
  const [comments, setComments] = useState({});
const [showUpdateForm, setShowUpdateForm] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const tokendata = jwtDecode(token);
    if (!userdetails) {
      dispatch(userinfo(tokendata.sub))
        .unwrap()
        .then((data) => setUser(data))
        .catch((error) => alert(error));
    } else {
      setUser(userdetails);
    }
  }, [dispatch, userdetails]);

  // Mock data for posts and projects
  const userPosts = [
    {
      id: 1,
      content: "Just finished building a REST API with Spring Boot and MongoDB 💪🚀",
      image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      likes: 24,
      comments: 5,
      createdAt: "2024-01-15T10:30:00.000Z"
    },
    {
      id: 2,
      content: "Working on a new React component library. Can't wait to share it with the community!",
      likes: 42,
      comments: 12,
      createdAt: "2024-01-14T15:20:00.000Z"
    }
  ];

  const userProjects = [
    {
      id: 1,
      title: "E-Commerce API",
      description: "A complete e-commerce backend with Spring Boot, JWT authentication, and payment integration.",
      tech: ["Java", "Spring Boot", "MongoDB", "JWT"],
      githubUrl: "https://github.com/user/ecommerce-api",
      liveUrl: "https://ecommerce-demo.com",
      stars: 45,
      forks: 12
    },
    {
      id: 2,
      title: "Task Management App",
      description: "React-based task management application with drag-and-drop functionality.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/user/task-app",
      liveUrl: "https://taskapp-demo.com",
      stars: 32,
      forks: 8
    }
  ];

  const handleLike = (postId) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleComment = (postId, comment) => {
    if (!comment.trim()) return;
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), { text: comment, timestamp: new Date() }]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
     <div className="bg-white shadow-sm border-b border-gray-200">
  <div className="max-w-6xl mx-auto px-4 py-6">
    <div className="flex items-center justify-between gap-6">
      {/* Profile Photo */}
      <div className="flex-shrink-0">
        <img
          src={user.profileImage || "https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg"}
          alt="Profile"
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>

      {/* User Info */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{user.username}</h1>
        <p className="text-gray-600 mt-1">{user.bio || "No bio yet"}</p>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span className="items-center justify-center text-center">Joined {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          <span>•</span>
          <span className="text-center">{user.followers?.length || 0} followers</span>
          <span>•</span>
          <span className="text-center">{user.following?.length || 0} following</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-medium">
          Connect
        </button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-200 text-sm font-medium">
          Message
        </button>
        <button 
          onClick={() => setShowUpdateForm(true)}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-200 text-sm font-medium"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </div>
</div>


{showUpdateForm && (
  <ProfileUpdateForm
    onClose={() => setShowUpdateForm(false)} 
    user={user} 
  />
)}

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {["posts", "projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {activeTab === "posts" && (
            <div className="space-y-6">
             
              {/* Posts List */}
              {userPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Post Header */}
                  <div className="p-6 pb-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.profileImage || "https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg"}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.username}</h3>
                        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-6 pb-4">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Post Image */}
                  {post.image && (
                    <div className="px-6 pb-4">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full rounded-lg object-cover max-h-96"
                      />
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="px-6 py-3 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments</span>
                  </div>

                  {/* Post Actions */}
                  <div className="px-6 py-3 border-t border-gray-100 flex justify-between">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                        likedPosts[post.id]
                          ? "text-red-600 bg-red-50"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {likedPosts[post.id] ? <FaHeart /> : <FaRegHeart />}
                      <span>Like</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                      <FaComment />
                      <span>Comment</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                      <FaShare />
                      <span>Share</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="space-y-3 mb-4">
                      {(comments[post.id] || []).map((comment, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <img
                            src={user.profileImage || "https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg"}
                            alt="avatar"
                            className="w-6 h-6 rounded-full object-cover mt-1"
                          />
                          <div className="bg-white rounded-lg px-3 py-2 flex-1">
                            <p className="text-sm text-gray-800">{comment.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(comment.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(post.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-200">
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "projects" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <div className="flex gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-900 transition duration-200"
                        >
                          <FaGithub size={20} />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition duration-200"
                        >
                          <FaExternalLinkAlt size={18} />
                        </a>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-600 mb-4">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex gap-4">
                        <span>⭐ {project.stars} stars</span>
                        <span>🍴 {project.forks} forks</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Actions */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between">
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
                      <FaRegHeart />
                      <span>Like</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition">
                      <FaExternalLinkAlt />
                      <span>View Project</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}