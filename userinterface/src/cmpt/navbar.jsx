import { useState } from "react";
import {
  Search,
  Plus,
  Code2
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar({ onOpenPostForm }) {
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-10 md:px-8">
        
        <div className="flex px-10 items-center gap-2">
          <Code2 className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold tracking-tight">
            DevConnect
          </span>
        </div>

       
        <form
          onSubmit={handleSearch}
          className="hidden md:flex w-full max-w-xl items-center"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search developers, projects, posts..."
              className="pl-9"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onOpenPostForm}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </Button>

         
        </div>
      </div>
    </header>
  );
}
