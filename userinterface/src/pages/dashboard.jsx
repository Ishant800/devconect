import {
  showSuccess,
  showError,
  showWarning,
  showInfo,
  showLoading,
  dismissToast,
} from "../utility/toast";

export default function Dashboard() {
  const handleActions = async () => {
    const id = showLoading("Saving data...");
    await new Promise((res) => setTimeout(res, 2000));
    dismissToast(id);
    showSuccess("Data saved successfully! 🎉");
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <button onClick={() => showSuccess("Operation successful ✅")} className="px-6 py-2 bg-green-600 text-white rounded-lg">
        Success
      </button>

      <button onClick={() => showError("Something went wrong ❌")} className="px-6 py-2 bg-red-600 text-white rounded-lg">
        Error
      </button>

      <button onClick={() => showWarning("Check your inputs ⚠️")} className="px-6 py-2 bg-yellow-500 text-white rounded-lg">
        Warning
      </button>

      <button onClick={() => showInfo("Profile updated ℹ️")} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
        Info
      </button>

      <button onClick={handleActions} className="px-6 py-2 bg-gray-800 text-white rounded-lg">
        Loading → Success
      </button>
    </div>
  );
}
