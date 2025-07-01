import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store';
import { EditPost } from '../components/EditPost';

export const EditPostPage = () => {
  const { id } = useParams();
  const { posts } = useSelector((state: RootState) => state.posts);
  const post = posts.find((p) => p.id === id);

  return <EditPost post={post || null} />;
};