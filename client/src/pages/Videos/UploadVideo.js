import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UploadVideo = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    tags: '',
    products: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error('Please select a video file');
      return;
    }

    setLoading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('video', videoFile);
    uploadFormData.append('title', formData.title);
    uploadFormData.append('description', formData.description);
    uploadFormData.append('category', formData.category);
    uploadFormData.append('tags', formData.tags);
    uploadFormData.append('products', formData.products);

    try {
      const response = await axios.post('/api/videos/upload', uploadFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Video uploaded successfully!');
        setFormData({ title: '', description: '', category: 'other', tags: '', products: '' });
        setVideoFile(null);
        setPreview(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Upload Video</h1>

      <form onSubmit={handleUpload} className="bg-white rounded-lg shadow-md p-8 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Video Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
            placeholder="e.g., Summer Dress Try-On"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 h-24"
            placeholder="Describe your video..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
          >
            <option value="other">Other</option>
            <option value="dress">Dress</option>
            <option value="shirt">Shirt</option>
            <option value="jacket">Jacket</option>
            <option value="shoes">Shoes</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
            placeholder="e.g., fashion, summer, dress"
          />
        </div>

        {/* Video File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Video
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600"
            required
          />
          <p className="text-gray-500 text-sm mt-2">Max file size: 500MB</p>
        </div>

        {/* Preview */}
        {preview && (
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
            <video src={preview} controls className="w-full rounded-lg" />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 font-semibold disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
