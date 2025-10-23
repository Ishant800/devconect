import toast from "react-hot-toast";
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

const baseStyle = "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white font-medium";


export const showSuccess = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`${baseStyle} bg-green-600 border-l-4  ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <CheckCircleIcon className="w-6 h-6 text-white" />
        <p>{message}</p>
      </div>
    ),
    { duration: 2500 }
  );
};

// ⚠️ WARNING
export const showWarning = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`${baseStyle} bg-yellow-500 border-l-4 border-yellow-300 ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <ExclamationTriangleIcon className="w-6 h-6 text-white" />
        <p>{message}</p>
      </div>
    ),
    { duration: 3000 }
  );
};

// ❌ ERROR
export const showError = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`${baseStyle} bg-red-600 border-l-4 border-red-400 ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <XCircleIcon className="w-6 h-6 text-white" />
        <p>{message}</p>
      </div>
    ),
    { duration: 3000 }
  );
};

// ℹ️ INFO
export const showInfo = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`${baseStyle} bg-blue-600 border-l-4 border-blue-400 ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <InformationCircleIcon className="w-6 h-6 text-white" />
        <p>{message}</p>
      </div>
    ),
    { duration: 2500 }
  );
};

// ⏳ LOADING
export const showLoading = (message) => {
  const id = toast.loading(message, {
    style: {
      background: "#1f2937", // gray-800
      color: "#fff",
      padding: "12px 20px",
      borderRadius: "8px",
    },
  });
  return id;
};

// ✅ Dismiss Loading
export const dismissToast = (id) => toast.dismiss(id);
