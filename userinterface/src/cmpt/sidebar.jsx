import {
  Home,
  MessageSquare,
  User,
  Settings,
  Bell,
  Users,
  Compass,
  Bookmark,
  Camera,
  Search,
  PlusCircle,
  BarChart3,
  Shield,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Users2,
  Hash,
  Video,
  Calendar,
} from "lucide-react";


import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";


const primaryItems = [
  { key: "home", label: "Feed", icon: Home, color: "text-blue-600", badge: null },
  { key: "explore", label: "Explore", icon: Compass, color: "text-purple-600", badge: null },
  { key: "find-friends", label: "Find Friends", icon: Users2, color: "text-green-600", badge: "New" },
  { key: "create", label: "Create Post", icon: PlusCircle, color: "text-red-600", badge: null },
  { key: "messages", label: "Messages", icon: MessageSquare, color: "text-green-600", badge: "5" },
  { key: "notifications", label: "Notifications", icon: Bell, color: "text-yellow-600", badge: "3" },
];

const secondaryItems = [
  { key: "profile", label: "Profile", icon: User, color: "text-pink-600", badge: null },
  { key: "groups", label: "Groups", icon: Users, color: "text-indigo-600", badge: null },
  { key: "hashtags", label: "Trending", icon: Hash, color: "text-blue-500", badge: null },
  { key: "watch", label: "Watch", icon: Video, color: "text-rose-600", badge: "Live" },
  { key: "events", label: "Events", icon: Calendar, color: "text-orange-600", badge: null },
  { key: "bookmarks", label: "Saved", icon: Bookmark, color: "text-amber-600", badge: null },
];

const toolsItems = [
  { key: "search", label: "Search", icon: Search, color: "text-gray-600", badge: null },
  { key: "analytics", label: "Analytics", icon: BarChart3, color: "text-teal-600", badge: null },
  { key: "settings", label: "Settings", icon: Settings, color: "text-gray-700", badge: null },
  { key: "privacy", label: "Privacy", icon: Shield, color: "text-blue-700", badge: null },
  { key: "help", label: "Help", icon: HelpCircle, color: "text-orange-600", badge: null },
];

export default function Sidebar({ currentPage, setCurrentPage, onOpenPostForm }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

 

  const handleNavClick = (key) => {
    if (key === "create" && onOpenPostForm) {
      onOpenPostForm();
    } else {
      setCurrentPage(key);
    }
    if (isMobile) setIsOpen(false);
  };

  const renderNavButton = (item, isMobileView = false) => {
    const Icon = item.icon;
    const isActive = currentPage === item.key;
    
    return (
      <button
        onClick={() => handleNavClick(item.key)}
        className={cn(
          "flex items-center gap-3 w-full p-3 rounded-lg transition-colors",
          "hover:bg-gray-100 active:bg-gray-200",
          isActive 
            ? "bg-blue-50 text-blue-700 font-medium"
            : "text-black font-medium",
          isMobileView ? "justify-center p-2" : ""
        )}
        title={isMobileView ? item.label : undefined}
      >
        <div className="relative">
          <Icon className={cn("h-5 w-5", item.color)} />
          {item.badge && (
            <span className={cn(
              "absolute -top-1 -right-1 text-[10px] px-1 rounded-full",
              item.key === "find-friends" || item.key === "watch"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            )}>
              {item.badge}
            </span>
          )}
        </div>
        {!isMobileView && (
          <span className="text-sm truncate">{item.label}</span>
        )}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "fixed top-4 left-4 z-50 md:hidden",
            "w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center",
            "border border-gray-200 hover:bg-gray-50"
          )}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed top-12 left-0 h-screen z-30 bg-white border-r",
        "w-64 transition-transform duration-300 ease-in-out",
        isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
      )}>
        {/* Compact User Profile */}
      

        {/* Scrollable Content Area */}
        <div className="h-[calc(100vh-68px)] overflow-y-auto hide-scrollbar">
          <div className="p-2">
            {/* Primary Navigation */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
                Navigation
              </p>
              <div className="space-y-1">
                {primaryItems.map(item => renderNavButton(item))}
              </div>
            </div>

            {/* Secondary Navigation */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
                Discover
              </p>
              <div className="space-y-1">
                {secondaryItems.map(item => renderNavButton(item))}
              </div>
            </div>

            {/* Tools */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
                Tools
              </p>
              <div className="space-y-1">
                {toolsItems.map(item => renderNavButton(item))}
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-2 mt-4 border-t">
            <button
              onClick={() => console.log("Logout")}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation - Icons Only */}
      {isMobile && !isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
          <div className="flex items-center justify-around p-1">
            {primaryItems.slice(0, 5).map(item => (
              <div key={item.key} className="relative">
                <button
                  onClick={() => handleNavClick(item.key)}
                  className={cn(
                    "flex flex-col items-center p-2 rounded-lg transition-colors",
                    currentPage === item.key
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                  title={item.label}
                >
                  <div className="relative">
                    <item.icon className="h-6 w-6" />
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 text-[8px] px-1 rounded-full bg-red-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] mt-0.5 truncate max-w-[60px]">
                    {item.label}
                  </span>
                </button>
              </div>
            ))}
            <button
              onClick={() => setIsOpen(true)}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900"
              title="More"
            >
              <Menu className="h-6 w-6" />
              <span className="text-[10px] mt-0.5">More</span>
            </button>
          </div>
        </div>
      )}

      {/* Add to your global CSS */}
      
    </>
  );
}

// import {
//   Home,
//   MessageSquare,
//   User,
//   Settings,
//   Bell,
//   Users,
//   Compass,
//   Bookmark,
//   Camera,
//   Search,
//   PlusCircle,
//   BarChart3,
//   Shield,
//   HelpCircle,
//   LogOut,
//   Menu,
//   X,
//   Users2,
//   Hash,
//   Video,
//   Calendar,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useState, useEffect } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const primaryItems = [
//   { key: "home", label: "Feed", icon: Home, color: "text-blue-600", badge: null },
//   { key: "explore", label: "Explore", icon: Compass, color: "text-purple-600", badge: null },
//   { key: "find-friends", label: "Find Friends", icon: Users2, color: "text-green-600", badge: "New" },
//   { key: "create", label: "Create Post", icon: PlusCircle, color: "text-red-600", badge: null },
//   { key: "messages", label: "Messages", icon: MessageSquare, color: "text-green-600", badge: "5" },
//   { key: "notifications", label: "Notifications", icon: Bell, color: "text-yellow-600", badge: "3" },
// ];

// const secondaryItems = [
//   { key: "profile", label: "Profile", icon: User, color: "text-pink-600", badge: null },
//   { key: "groups", label: "Groups", icon: Users, color: "text-indigo-600", badge: null },
//   { key: "hashtags", label: "Trending", icon: Hash, color: "text-blue-500", badge: null },
//   { key: "watch", label: "Watch", icon: Video, color: "text-rose-600", badge: "Live" },
//   { key: "events", label: "Events", icon: Calendar, color: "text-orange-600", badge: null },
//   { key: "bookmarks", label: "Saved", icon: Bookmark, color: "text-amber-600", badge: null },
// ];

// const toolsItems = [
//   { key: "search", label: "Search", icon: Search, color: "text-gray-600", badge: null },
//   { key: "analytics", label: "Analytics", icon: BarChart3, color: "text-teal-600", badge: null },
//   { key: "settings", label: "Settings", icon: Settings, color: "text-gray-700", badge: null },
//   { key: "privacy", label: "Privacy", icon: Shield, color: "text-blue-700", badge: null },
//   { key: "help", label: "Help", icon: HelpCircle, color: "text-orange-600", badge: null },
// ];

// export default function Sidebar({ currentPage, setCurrentPage, onOpenPostForm }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setIsOpen(true);
//       } else {
//         setIsOpen(false);
//       }
//     };

//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const userData = {
//     name: "John Doe",
//     username: "@johndoe",
//     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//   };

//   const handleNavClick = (key) => {
//     if (key === "create" && onOpenPostForm) {
//       onOpenPostForm();
//     } else {
//       setCurrentPage(key);
//     }
//     if (isMobile) setIsOpen(false);
//   };

//   const renderNavButton = (item, isMobileView = false) => {
//     const Icon = item.icon;
//     const isActive = currentPage === item.key;
    
//     return (
//       <button
//         onClick={() => handleNavClick(item.key)}
//         className={cn(
//           "flex items-center gap-3 w-full p-3 rounded-lg transition-colors",
//           "hover:bg-gray-100 active:bg-gray-200",
//           isActive 
//             ? "bg-blue-50 text-blue-700 font-medium"
//             : "text-gray-700",
//           isMobileView ? "justify-center p-2" : ""
//         )}
//         title={isMobileView ? item.label : undefined}
//       >
//         <div className="relative">
//           <Icon className={cn("h-5 w-5", item.color)} />
//           {item.badge && (
//             <span className={cn(
//               "absolute -top-1 -right-1 text-[10px] px-1 rounded-full",
//               item.key === "find-friends" || item.key === "watch"
//                 ? "bg-green-500 text-white"
//                 : "bg-red-500 text-white"
//             )}>
//               {item.badge}
//             </span>
//           )}
//         </div>
//         {!isMobileView && (
//           <span className="text-sm truncate">{item.label}</span>
//         )}
//       </button>
//     );
//   };

//   // If not mobile and not open, return nothing (for layout consistency)
//   if (!isMobile && !isOpen) return null;

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       {isMobile && (
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className={cn(
//             "fixed top-4 left-4 z-50 md:hidden",
//             "w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center",
//             "border border-gray-200 hover:bg-gray-50"
//           )}
//         >
//           {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//         </button>
//       )}

//       {/* Overlay for mobile */}
//       {isOpen && isMobile && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Desktop/Mobile Sidebar */}
//       <aside className={cn(
//         "fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 bg-white border-r",
//         "w-64 transition-transform duration-300 ease-in-out",
//         isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
//         !isMobile && "block" // Always show on desktop
//       )}>
//         {/* Compact User Profile */}
//         <div className="p-4 border-b">
//           <div className="flex items-center gap-3">
//             <Avatar className="h-8 w-8">
//               <AvatarImage src={userData.avatar} />
//               <AvatarFallback>JD</AvatarFallback>
//             </Avatar>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-semibold truncate">{userData.name}</p>
//               <p className="text-xs text-gray-500 truncate">{userData.username}</p>
//             </div>
//           </div>
//         </div>

//         {/* Scrollable Content Area */}
//         <div className="h-[calc(100vh-10rem)] overflow-y-auto hide-scrollbar">
//           <div className="p-2">
//             {/* Primary Navigation */}
//             <div className="mb-4">
//               <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
//                 Navigation
//               </p>
//               <div className="space-y-1">
//                 {primaryItems.map(item => renderNavButton(item))}
//               </div>
//             </div>

//             {/* Secondary Navigation */}
//             <div className="mb-4">
//               <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
//                 Discover
//               </p>
//               <div className="space-y-1">
//                 {secondaryItems.map(item => renderNavButton(item))}
//               </div>
//             </div>

//             {/* Tools */}
//             <div className="mb-4">
//               <p className="text-xs font-semibold text-gray-500 uppercase px-3 py-2">
//                 Tools
//               </p>
//               <div className="space-y-1">
//                 {toolsItems.map(item => renderNavButton(item))}
//               </div>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <div className="p-2 mt-4 border-t">
//             <button
//               onClick={() => console.log("Logout")}
//               className="flex items-center gap-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
//             >
//               <LogOut className="h-5 w-5" />
//               <span className="text-sm">Logout</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Mobile Bottom Navigation - Icons Only */}
//       {isMobile && !isOpen && (
//         <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
//           <div className="flex items-center justify-around p-1">
//             {primaryItems.slice(0, 5).map(item => (
//               <div key={item.key} className="relative">
//                 <button
//                   onClick={() => handleNavClick(item.key)}
//                   className={cn(
//                     "flex flex-col items-center p-2 rounded-lg transition-colors",
//                     currentPage === item.key
//                       ? "text-blue-600"
//                       : "text-gray-600 hover:text-gray-900"
//                   )}
//                   title={item.label}
//                 >
//                   <div className="relative">
//                     <item.icon className="h-6 w-6" />
//                     {item.badge && (
//                       <span className="absolute -top-1 -right-1 text-[8px] px-1 rounded-full bg-red-500 text-white">
//                         {item.badge}
//                       </span>
//                     )}
//                   </div>
//                   <span className="text-[10px] mt-0.5 truncate max-w-[60px]">
//                     {item.label}
//                   </span>
//                 </button>
//               </div>
//             ))}
//             <button
//               onClick={() => setIsOpen(true)}
//               className="flex flex-col items-center p-2 text-gray-600 hover:text-gray-900"
//               title="More"
//             >
//               <Menu className="h-6 w-6" />
//               <span className="text-[10px] mt-0.5">More</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// // Add to your global CSS
// const styles = `
// .hide-scrollbar {
//   -ms-overflow-style: none;
//   scrollbar-width: none;
// }
// .hide-scrollbar::-webkit-scrollbar {
//   display: none;
// }
// `;