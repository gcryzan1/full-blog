import { Post } from '../../@types/post';
import PostsGrid from '../posts/posts-grid';
import classes from './featured-posts.module.css';

interface Props {
  posts: Post[];
}

const FeaturedPosts = (props: Props) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default FeaturedPosts;
