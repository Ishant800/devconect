import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaCode, FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/auth";
import { useNavigate } from "react-router-dom";
import { showError, showLoading, showSuccess } from "../utility/toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const[loading,setloading] = useState(false)
 const navigate = useNavigate()
 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home"); 
    }
  }, [navigate]);


  const dispatch = useDispatch()
  const handleLogin =async (e) => {
    e.preventDefault();
    setloading(true)
    const res = await dispatch(login({email,password}))
  
    switch(res.meta.requestStatus){
      case "fulfilled":
        localStorage.setItem("token", res.payload.accessToken);
        navigate("/home"); 
        showSuccess(`${res.payload.user.username} wellcome back!`)
        setloading(false)
        break;
    
      case "rejected":
        showError("failed to login!")
        showLoading(false)
        break;
     
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
     
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center mb-8">
            <FaCode className="text-4xl mr-3" />
            <h1 className="text-4xl font-bold">DevConnect</h1>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">
            Welcome Back, Developer!
          </h2>
          
          <p className="text-blue-100 italic mb-4 leading-relaxed">
            Ready to dive back into your coding community? Your projects, 
            collaborations, and developer network are waiting for you.
          </p>

          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/male-coder-doing-code-coverage-illustration-svg-download-png-9590653.png"
            alt="Developer Login"
            className="w-full max-w-sm mx-auto mb-8"
          />

          
        </div>
      </div>

    
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100"
        >
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to continue your coding journey
            </p>
          </div>

          
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
                Or continue with email
              </span>
            </div>
          </div>

         
          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                required
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

         
          <div className="flex items-center justify-between mb-6 mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a 
              href="/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
            >
              Forgot password?
            </a>
          </div>

          
         <button
        type="submit"
        disabled={loading}
        className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform ${
          loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-0.5"
        } flex items-center justify-center group`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        ) : (
          <>
            Continue Coding Journey
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </button>

          
          <p className="text-center text-gray-600 mt-6">
            New to our developer community?{" "}
            <a 
              href="/auth/signup" 
              className="text-blue-600 font-semibold hover:text-blue-500 transition-colors duration-200"
            >
              Join us now
            </a>
          </p>

          
         
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <FaLock className="inline mr-1" />
              Your code and data are securely protected
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}