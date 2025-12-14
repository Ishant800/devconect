// import Navbar from "@/cmpt/navbar";
// import RightSidebar from "@/cmpt/rightSidebar";
// import Sidebar from "@/cmpt/sidebar";
// import { Outlet } from "react-router-dom";

// export default function DashboardLayout(){
//     return (

//         <>
//         <Navbar/>

//         <div className="pt-16 flex">
//          <aside className="hidden md:block w-64 fixed left-0 top-16 h-[calc(100vh-4rem)]">
//             <Sidebar/>
//          </aside>

//         <main className="flex-1 md:ml-64 px-4 py-6 max-w-3xl m-auto">
//             <Outlet/>
//         </main>


//         <aside className="hidden lg:block w-72 fixed right-0 top-16 h-[calc(100vh-4rem)]">
//             <RightSidebar/>
//         </aside>


//         </div>
        
//         </>
//     )
// }

import { Outlet } from "react-router-dom";
import Navbar from "../cmpt/navbar";
import Sidebar from "../cmpt/sidebar";
import RightSidebar from "../cmpt/rightSidebar";
import { useState } from "react";

export default function DashboardLayout() {
  const [currentPage, setCurrentPage] = useState("home");
  const [showPostForm, setShowPostForm] = useState(false);

  return (
    <>
      <Navbar onOpenPostForm={() => setShowPostForm(true)} />
      
      <div className="pt-16 flex">
        {/* Left Sidebar - Fixed for desktop, hidden by default on mobile */}
        <div className="hidden md:block fixed left-0 top-16 h-[calc(100vh-4rem)] z-30">
          <Sidebar 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onOpenPostForm={() => setShowPostForm(true)}
          />
        </div>

        {/* Mobile Sidebar (handled by Sidebar component itself) */}
        <div className="md:hidden">
          <Sidebar 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onOpenPostForm={() => setShowPostForm(true)}
          />
        </div>

        {/* Main Content */}
        <main className={cn(
          "flex-1 px-4 py-6",
          "md:ml-64", // Margin for desktop sidebar
          "max-w-3xl mx-auto", // Centered content
          "lg:max-w-2xl lg:mx-auto" // Adjust for when right sidebar shows
        )}>
          <Outlet />
        </main>

        {/* Right Sidebar - Only on desktop */}
        <div className="hidden lg:block fixed right-0 top-16 h-[calc(100vh-4rem)] z-30">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}

// Helper function for conditional classes
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}