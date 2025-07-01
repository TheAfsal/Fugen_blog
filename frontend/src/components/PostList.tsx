// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { RootState } from '../store';
// import { getPosts, deletePost as deletePostApi } from '../services/api';
// import { setPosts, deletePost, setLoading, setError } from '../store/slices/postSlice';
// import { AxiosError } from 'axios';

// export const PostList = () => {
//   const { posts, loading, error } = useSelector((state: RootState) => state.posts);
//   const { user } = useSelector((state: RootState) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       dispatch(setLoading());
//       try {
//         const data = await getPosts();
//         dispatch(setPosts(data));
//       } catch (err) {
//         const error = err as AxiosError<{ message?: string }>;
//         dispatch(setError(error.response?.data?.message ||'Failed to fetch posts'));
//       }
//     };
//     fetchPosts();
//   }, [dispatch]);

//   const handleDelete = async (id: string) => {
//     try {
//       await deletePostApi(id);
//       dispatch(deletePost(id));
//     } catch (err) {
//         const error = err as AxiosError<{ message?: string }>;
//         dispatch(setError(error.response?.data?.message ||'Failed to delete post'));
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h2 className="text-2xl mb-4">Blog Posts</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {posts.length === 0 && !loading && !error && <p>No posts available</p>}
//       <div className="grid gap-4">
//         {posts.map((post) => (
//           <div key={post.id} className="p-4 bg-white rounded shadow">
//             <h3 className="text-xl font-bold">{post.title}</h3>
//             <p className="text-gray-600">{post.content}</p>
//             <p className="text-sm text-gray-500">
//               Posted on {new Date(post.createdAt).toLocaleDateString()}
//             </p>
//             {user?.id === post.authorId && (
//               <div className="mt-2">
//                 <button
//                   onClick={() => navigate(`/edit/${post.id}`)}
//                   className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(post.id)}
//                   className="bg-red-500 text-white px-4 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };