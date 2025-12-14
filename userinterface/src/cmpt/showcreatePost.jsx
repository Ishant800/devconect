import { useState, useRef } from 'react';
import { FaTimes, FaImage } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../features/posts/postsSlice';
import { showError, showSuccess } from '../utility/toast';

export default function CreatePostForm({ onClose, onPostCreated }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const[loading ,setloading] = useState(false)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setloading(true);

   try {
    const resultAction = await dispatch(addPost({ content, image }));

    if (resultAction.meta.requestStatus === "fulfilled") {
      showSuccess("Post added successfully");
      setContent('');
      setImage(null);
      onClose();
    } else {
      showError("Failed to post");
    }
  } catch (error) {
    showError("Something went wrong");
  } finally {
    setloading(false);
  }

    // if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black opacity-100 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-gray-800">Create Post</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center p-4 border-b">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
            JD
          </div>
          <div>
            <div className="font-medium text-gray-800">John Developer</div>
          </div>
        </div>

        {/* Content Area */}
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border-none resize-none focus:ring-0 text-gray-800 placeholder-gray-500 min-h-[100px] outline-none"
              rows="3"
            />
            
            
            {image && (
              <div className="relative mt-3">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full rounded-lg max-h-60 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-70"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between p-4 border-t">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center text-gray-600 hover:text-blue-600"
            >
              <FaImage size={20} className="mr-2" />
              <span>Photo</span>
            </button>

            <button
              type="submit"
              disabled={!content.trim() && !image}
              className="bg-blue-500 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? ( <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>) : <> Post</>}
             
            </button>
          </div>
        </form>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}