
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/homepage"
import SignupPage from "./pages/signup"
import LoginPage from "./pages/login"
import ProtectedRoute from "./components/protectedRoute"
import CreatePostForm from "./components/showcreatePost"
import ProfilePage from "./components/profilepage"
import { Toaster } from "react-hot-toast"
import Dashboard from "./pages/dashboard"

function App(){
return(
  <BrowserRouter>
  <Routes>
    <Route path="/home" element={<ProtectedRoute>
      <HomePage/>
      </ProtectedRoute>} />
    <Route path="/auth/signup" element={<SignupPage/>} />
    <Route path="/auth/login" element={<LoginPage/>} />
 <Route path="/createpost" element={<CreatePostForm/>} />
 <Route path="/profilepage" element={<ProfilePage/>} />
    <Route path="*" element={<LoginPage/>} />
     <Route path="/dashboard" element={<Dashboard/>} />
  </Routes>
  <Toaster position="top-right"
  toastOptions={{
    style: {
      background: "#333",
      color: "#fff",
      borderRadius: "10px",
    },
  }}/>
  </BrowserRouter>


)

}

export default App 