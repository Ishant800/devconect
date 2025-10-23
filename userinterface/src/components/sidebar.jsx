// sidebar.jsx
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { key: "home", icon: FaHome, label: "Home" },
    { key: "messages", icon: IoChatbubbleEllipsesOutline, label: "Messages" },
    { key: "profile", icon: FaUserCircle, label: "Profile" },
    { key: "settings", icon: IoSettingsOutline, label: "Settings" },
  ];

  return (
    <div className="w-1/5 p-5 space-y-5 fixed top-20 left-0 h-screen justify-center bg-white shadow-sm">
      {menuItems.map((item) => (
        <button 
          key={item.key}
          onClick={() => setCurrentPage(item.key)}
          className={`flex hover:bg-blue-200 px-3 py-2 rounded-md items-center text-lg gap-2 w-full text-left font-medium hover:text-blue-600 ${
            currentPage === item.key ? 'text-blue-600' : 'text-gray-700'
          }`}
        >
          <item.icon size={24}/>
          {item.label}
        </button>
      ))}
    </div>
  );
}