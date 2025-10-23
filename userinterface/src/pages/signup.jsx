import { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaCode, FaGithub, FaLinkedin, FaTwitter, FaUsers, FaProjectDiagram, FaHandshake } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signup } from "../features/auth/auth";
import { useNavigate } from "react-router-dom";
import { showError } from "../utility/toast";

export default function SignupPage() {
  const dispatch = useDispatch()
  const[username ,setusername] = useState("")
  const[email,setemail] = useState("")
  const[password,setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const[loading,setloading] = useState(false)


  const navigate = useNavigate()
  const handleSignup = async(e) => {
    e.preventDefault();
    setloading(true)
    const res = await dispatch(signup({username,email,password}))
    switch(res.meta.requestStatus){
      case "fulfilled":
        setloading(false)
        localStorage.setItem("token",res.payload.accessToken)
        navigate("/home")
        break;

      case "rejected":
        setloading(false)
        showError("failed to Signu up!")
        break;
    }
    
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left Section - Brand & Image */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center mb-8">
            <FaCode className="text-4xl mr-3" />
            <h1 className="text-3xl font-bold">DevConnect</h1>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">
            Where Code Meets Community
          </h2>
          
          <p className="text-blue-100 text-sm mb-8 leading-relaxed">
            Join our thriving ecosystem of developers. Share your projects, 
            collaborate on open-source, get code reviews, and grow together 
            with like-minded programmers.
          </p>

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/male-coder-doing-code-coverage-illustration-svg-download-png-9590653.png"
            alt="Developer Community"
            className="w-full max-w-sm mx-auto mb-8"
          />

          
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSignup}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Start Your Dev Journey
            </h1>
            <p className="text-gray-600">
              Connect, code, and create with developers worldwide
            </p>
          </div>

          {/* Social Signup Options */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              type="button"
              className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FaGithub className="text-xl" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FaLinkedin className="text-xl text-blue-600" />
            </button>
            <button
              type="button"
              className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <FaTwitter className="text-xl text-blue-400" />
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or join with email
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e)=> setusername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                required
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e)=> setemail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

         
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200">
                Privacy Policy
              </a>
            </label>
          </div>

         
         
          <button
        type="submit"
        disabled={loading}
        className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"
        } flex items-center justify-center group`}
      >
        {loading ? (<div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>) : (<>Join Developer Community</>)}
            
          </button>

          
          <p className="text-center text-gray-600 mt-6">
            Already part of our coding community?{" "}
            <a 
              href="/login" 
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors duration-200"
            >
              Sign in here
            </a>
          </p>

         
        </form>
      </div>
    </div>
  );
}