import toast from "react-hot-toast";
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  InformationCircleIcon,
  ClockIcon
} from "@heroicons/react/24/solid";

// Modern design tokens
const designTokens = {
  colors: {
    success: {
      bg: "bg-emerald-50 dark:bg-emerald-950",
      border: "border-emerald-400",
      text: "text-emerald-800 dark:text-emerald-200",
      icon: "text-emerald-500"
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950",
      border: "border-amber-400",
      text: "text-amber-800 dark:text-amber-200",
      icon: "text-amber-500"
    },
    error: {
      bg: "bg-rose-50 dark:bg-rose-950",
      border: "border-rose-400",
      text: "text-rose-800 dark:text-rose-200",
      icon: "text-rose-500"
    },
    info: {
      bg: "bg-blue-50 dark:bg-blue-950",
      border: "border-blue-400",
      text: "text-blue-800 dark:text-blue-200",
      icon: "text-blue-500"
    },
    loading: {
      bg: "bg-gray-50 dark:bg-gray-900",
      border: "border-gray-300 dark:border-gray-600",
      text: "text-gray-700 dark:text-gray-300",
      icon: "text-gray-500 animate-spin"
    }
  },
  typography: {
    font: "font-sans",
    weight: "font-medium",
    size: "text-sm"
  },
  layout: {
    base: "flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-l-4 backdrop-blur-sm",
    animation: {
      enter: "animate-enter",
      leave: "animate-leave"
    }
  }
};

const ToastContainer = ({ t, children, type }) => (
  <div
    className={`
      ${designTokens.layout.base}
      ${designTokens.colors[type].bg}
      ${designTokens.colors[type].border}
      ${designTokens.typography.font}
      ${t.visible ? designTokens.layout.animation.enter : designTokens.layout.animation.leave}
    `}
  >
    {children}
  </div>
);

const ToastContent = ({ icon: Icon, message, type }) => (
  <>
    <Icon className={`w-5 h-5 flex-shrink-0 ${designTokens.colors[type].icon}`} />
    <p className={`${designTokens.typography.size} ${designTokens.typography.weight} ${designTokens.colors[type].text}`}>
      {message}
    </p>
  </>
);

// ✅ SUCCESS
export const showSuccess = (message) => {
  toast.custom(
    (t) => (
      <ToastContainer t={t} type="success">
        <ToastContent 
          icon={CheckCircleIcon} 
          message={message} 
          type="success" 
        />
      </ToastContainer>
    ),
    { 
      duration: 3000,
      position: "top-right"
    }
  );
};

// ⚠️ WARNING
export const showWarning = (message) => {
  toast.custom(
    (t) => (
      <ToastContainer t={t} type="warning">
        <ToastContent 
          icon={ExclamationTriangleIcon} 
          message={message} 
          type="warning" 
        />
      </ToastContainer>
    ),
    { 
      duration: 4000,
      position: "top-right"
    }
  );
};

// ❌ ERROR
export const showError = (message) => {
  toast.custom(
    (t) => (
      <ToastContainer t={t} type="error">
        <ToastContent 
          icon={XCircleIcon} 
          message={message} 
          type="error" 
        />
      </ToastContainer>
    ),
    { 
      duration: 5000,
      position: "top-right"
    }
  );
};

// ℹ️ INFO
export const showInfo = (message) => {
  toast.custom(
    (t) => (
      <ToastContainer t={t} type="info">
        <ToastContent 
          icon={InformationCircleIcon} 
          message={message} 
          type="info" 
        />
      </ToastContainer>
    ),
    { 
      duration: 3000,
      position: "top-right"
    }
  );
};

// ⏳ LOADING
export const showLoading = (message) => {
  const id = toast.custom(
    (t) => (
      <ToastContainer t={t} type="loading">
        <div className="flex items-center gap-3">
          <ClockIcon className={`w-5 h-5 ${designTokens.colors.loading.icon}`} />
          <p className={`${designTokens.typography.size} ${designTokens.typography.weight} ${designTokens.colors.loading.text}`}>
            {message}
          </p>
        </div>
      </ToastContainer>
    ),
    { 
      duration: Infinity,
      position: "top-right"
    }
  );
  return id;
};

// 🎯 PROMISE (Auto-loading states)
export const showPromise = (promise, messages) => {
  return toast.promise(
    promise,
    {
      loading: (
        <ToastContent 
          icon={ClockIcon} 
          message={messages.loading} 
          type="loading" 
        />
      ),
      success: (
        <ToastContent 
          icon={CheckCircleIcon} 
          message={messages.success} 
          type="success" 
        />
      ),
      error: (
        <ToastContent 
          icon={XCircleIcon} 
          message={messages.error} 
          type="error" 
        />
      ),
    },
    {
      position: "top-right",
      success: { duration: 3000 },
      error: { duration: 5000 },
    }
  );
};

// ✨ SUCCESS WITH ACTION
export const showSuccessWithAction = (message, action) => {
  toast.custom(
    (t) => (
      <ToastContainer t={t} type="success">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <CheckCircleIcon className={`w-5 h-5 ${designTokens.colors.success.icon}`} />
            <p className={`${designTokens.typography.size} ${designTokens.typography.weight} ${designTokens.colors.success.text}`}>
              {message}
            </p>
          </div>
          <button
            onClick={() => {
              action.onClick();
              toast.dismiss(t.id);
            }}
            className="ml-4 px-3 py-1 text-xs font-medium bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
          >
            {action.label}
          </button>
        </div>
      </ToastContainer>
    ),
    { duration: 5000 }
  );
};

// ✅ Dismiss Toast
export const dismissToast = (id) => toast.dismiss(id);

// 🗑️ Dismiss All Toasts
export const dismissAllToasts = () => toast.dismiss();