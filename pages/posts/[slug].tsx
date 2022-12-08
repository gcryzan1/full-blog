import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { getPostData, getPostsFiles } from '../../lib/posts-util';
import PostContent from '../../components/posts/post-detail/post-content';
import { Post } from '../../@types/post';

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface Props {
  post: Post;
}

const PostDetailPage = (props: Props) => {
  const { post } = props;

  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name='description' content={props.post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const postFilesNames = getPostsFiles();

  const formattedSlugs = postFilesNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, '') }
  }));

  return {
    paths: formattedSlugs,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = (context) => {
  const { params } = context;
  const { slug } = params as IParams;

  const post = getPostData(slug);

  return {
    props: {
      post
    },
    revalidate: 600
  };
};

export default PostDetailPage;
