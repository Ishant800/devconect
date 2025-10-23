import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { updateProfile, userinfo} from "../features/auth/auth";
import { FaCamera, FaSave, FaTimes, FaUpload, FaUser, FaEdit } from "react-icons/fa";
import { showError, showSuccess } from "../utility/toast";

export default function ProfileUpdateForm({ onClose, user }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [userId, setUserId] = useState("");

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    profileImage: user?.profileImage || "",
    skills: user?.skills || "", // Now a string instead of array
    userId: "" // Add userId field
  });

  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");
  const [isLoading, setIsLoading] = useState(false);

  // Extract userId from token on component mount
  useEffect(() => {
    const extractUserIdFromToken = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.sub || decodedToken.userId || decodedToken.id;
          
          if (userId) {
            setUserId(userId);
            setFormData(prev => ({
              ...prev,
              userId: userId
            }));
          }
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    extractUserIdFromToken();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      
      // For actual implementation, you would upload to cloud storage
      // For now, we'll just store the file
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setFormData(prev => ({
      ...prev,
      profileImage: ""
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare form data for submission
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'profileImage' && formData[key] instanceof File) {
          submitData.append(key, formData[key]);
        } else {
          submitData.append(key, formData[key]);
        }
      });

      // Log the data being sent for debugging
      console.log("Submitting form data:", {
        userId: formData.userId,
        username: formData.username,
        email: formData.email,
        skills: formData.skills
      });

     
      await dispatch(updateProfile(submitData)).unwrap();
      
      // Refresh user data
      const token = localStorage.getItem("token");
      if (token) {
        const tokendata = jwtDecode(token);
        await dispatch(userinfo(tokendata.sub)).unwrap();
      }
       showSuccess("profile update sucessfully")
      onClose(); // Close the form on success
    } catch (error) {
      console.error("Profile update failed:", error);
      showError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const skillSuggestions = [
    "JavaScript", "React", "Node.js", "Python", "Java", "Spring Boot",
    "TypeScript", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes",
    "GraphQL", "Redis", "Next.js", "Vue.js", "Angular", "Express.js"
  ];

  const addSkill = (skill) => {
    const currentSkills = formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(s => s) : [];
    if (!currentSkills.includes(skill)) {
      const newSkills = [...currentSkills, skill].join(', ');
      setFormData(prev => ({ ...prev, skills: newSkills }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition duration-200"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={previewImage || "https://cdn.vectorstock.com/i/500p/29/52/faceless-male-avatar-in-hoodie-vector-56412952.jpg"}
                  alt="Profile preview"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Image Overlay Actions */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition duration-200"
                  >
                    <FaCamera className="text-gray-700" size={16} />
                  </button>
                  {previewImage && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition duration-200"
                    >
                      <FaTimes className="text-red-600" size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            
            <button
              type="button"
              onClick={handleImageClick}
              className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <FaUpload size={14} />
              Upload New Photo
            </button>
          </div>

          {/* Debug info (optional - remove in production) */}
          {userId && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                User ID: <span className="font-mono">{userId}</span>
              </p>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2" size={14} />
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaEdit className="inline mr-2" size={14} />
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 resize-none"
              placeholder="Tell us about yourself..."
              maxLength="160"
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {formData.bio.length}/160
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills & Technologies
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              placeholder="e.g., JavaScript, React, Node.js (comma separated)"
            />
            
            {/* Skill Suggestions */}
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition duration-200"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !userId}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <FaSave size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>

          {/* Debug info for form data */}
          {/* <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded">
            <p>Form Data Preview:</p>
            <pre>{JSON.stringify({
              userId: formData.userId,
              username: formData.username,
              email: formData.email,
              skills: formData.skills,
              bio: formData.bio
            }, null, 2)}</pre>
          </div> */}
        </form>
      </div>
    </div>
  );
}