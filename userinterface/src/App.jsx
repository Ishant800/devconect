
import { BrowserRouter, Route, Routes } from "react-router-dom"

import SignupPage from "./pages/signup"
import LoginPage from "./pages/login"
import { Toaster } from "react-hot-toast"

import AuthLayout from "./layouts/authLayout"
import DashboardLayout from "./layouts/DashboardLayout"
import ProtectedRoute from "./routes/protectedRoute"
import FeedSection from "./pages/feedSection"
import ProfilePage from "./cmpt/profilepage"
import ChatSection from "./cmpt/chatSection"

function App(){
return(
  <>
     
  <BrowserRouter>
  <Routes>
    
       {/* Auth routes */}
       <Route element={<AuthLayout/>}>
       <Route path="/login" element={<LoginPage/>}/>
       <Route path="/signup" element={<SignupPage/>}/>
       </Route>

       {/* Dashbaord routes */}
       <Route element={<ProtectedRoute/>}>
       <Route element={<DashboardLayout/>}>
       <Route path="/" element={<FeedSection/>} />
       <Route path="/profile" element={<ProfilePage/>}/>
       <Route path="/chat" element={<ChatSection/>}/>
       <Route path="/setting" element={<h2>Hello setting page</h2>}/>
       </Route>
       
       </Route>


  </Routes>
 
  </BrowserRouter>
 <Toaster position="top-center"
  toastOptions={{
    style: {
      background: "#333",
      color: "#fff",
      borderRadius: "10px",
    },
  }}/>
  </>
  

)

}

export default App 