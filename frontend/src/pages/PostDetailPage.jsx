import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPostById, deletePost } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        setPost(data.post);
      } catch (error) {
        toast.error('Failed to load post');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        toast.success('Post deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl text-gray-700">Post not found</h2>
        <Link to="/" className="mt-4 text-blue-600 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">
                By {post.author.name}
              </span>
              <span className="text-gray-600">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>
            
            {isAdmin() && (
              <div className="mt-8 flex justify-end space-x-4">
                <Link
                  to={`/admin/posts/edit/${post._id}`}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Post
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6">
          <Link to="/" className="text-blue-600 hover:underline">
            &larr; Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;