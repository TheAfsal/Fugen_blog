// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { CreatePost } from '../components/CreatePost';
// import { PostList } from '../components/PostList';
// import { Link } from 'react-router-dom';

// export const Home = () => {
//   const { user } = useSelector((state: RootState) => state.auth);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Blog App</h1>
//       {user ? (
//         <CreatePost />
//       ) : (
//         <p>
//           Please <Link to="/login" className="text-blue-500">login</Link> or{' '}
//           <Link to="/register" className="text-blue-500">register</Link> to create posts.
//         </p>
//       )}
//       <PostList />
//     </div>
//   );
// };