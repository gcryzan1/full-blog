import Head from 'next/head';
import { GetStaticProps } from 'next';

import { Post } from '../../@types/post';
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';

interface Props {
  posts: Post[];
}

const AllPostsPage = (props: Props) => {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related posts.'
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    }
  };
};

export default AllPostsPage;
