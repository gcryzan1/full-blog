import Head from 'next/head';

import { GetStaticProps } from 'next';
import { Post } from '../@types/post';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';

interface Props {
  posts: Post[];
}

const HomePage = (props: Props) => {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Grimberg's Blog</title>
        <meta
          name='description'
          content='I post about programming and web development.'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    }
  };
};

export default HomePage;
