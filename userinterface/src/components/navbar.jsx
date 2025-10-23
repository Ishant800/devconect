import { useState } from "react";
import { 
  FaUserCircle, 
  FaSearch, 
  FaPlus,
  FaCode,
  FaCaretDown
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { LuLogOut } from "react-icons/lu";

export default function Navbar({ onOpenPostForm }) {  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="w-full bg-white shadow-lg border-b border-gray-200 flex justify-between items-center px-4 py-2 fixed top-0 z-50">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-2">
        <FaCode className="text-xl md:text-2xl text-blue-600" />
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          DEVMET
        </h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="relative w-full">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search developers, projects, code snippets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 px-12 py-2 rounded-sm outline-none focus:ring-1 focus:ring-blue-200 focus:bg-white transition-all duration-200 border border-transparent hover:border-gray-300"
            />
          </div>
        </form>
      </div>

      {/* Actions and User Profile */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <button 
          onClick={onOpenPostForm}  
          className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
        >
          <FaPlus className="text-xs md:text-sm" />
          <span className="font-medium">Post</span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-1 p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
              {user.username[0]}
            </div>
            <FaCaretDown className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 md:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
              <div className="px-3 py-2 border-b border-gray-100">
                <div className="font-semibold text-gray-800 text-sm md:text-base">{user.username}</div>
                <div className="text-sm text-gray-500 text-xs md:text-sm">{user.email}</div>
              </div>
              
              <div className="py-1">
                <a href="/profilepage" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-sm">
                  <FaUserCircle className="mr-2 text-gray-400 text-xs md:text-sm" />
                  My Profile
                </a>
                <a href="/my-projects" className="flex items-center px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 text-sm">
                  <FaCode className="mr-2 text-gray-400 text-xs md:text-sm" />
                  My Projects
                </a>
              </div>
              
              <div className="border-t border-gray-100 pt-1">
                <a onClick={handleLogout} className="flex cursor-pointer items-center px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-sm">
                  <LuLogOut className="mr-2 text-gray-400 text-xs md:text-sm" />
                  Logout
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      <div className="md:hidden">
        <button
          onClick={() => setIsDropdownOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-800"
        >
          <FaSearch className="text-xl" />
        </button>
      </div>

      {isDropdownOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex flex-col items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-11/12 max-w-md">
            <form onSubmit={handleSearch} className="relative mb-4">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search developers, projects, code snippets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 px-12 py-2 rounded-sm outline-none focus:ring-1 focus:ring-blue-200 focus:bg-white transition-all duration-200 border border-transparent hover:border-gray-300"
              />
            </form>
            <button
              onClick={onOpenPostForm}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
            >
              <FaPlus />
              <span>Post</span>
            </button>
            <div className="mt-4">
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="w-full text-center text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}