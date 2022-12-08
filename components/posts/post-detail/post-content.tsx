import ReactMarkdown, { Components } from 'react-markdown';
import { Post } from '../../../@types/post';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import classes from './post-content.module.css';
import PostHeader from './post-header';

interface Props {
  post: Post;
}

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

const PostContent = (props: Props) => {
  const { image, slug, title, content } = props.post;

  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers: Components = {
    p({ node, children }) {
      if ('tagName' in node.children[0] && node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties!.src}`}
              alt={image.properties!.alt as string}
              width={600}
              height={300}
            />
          </div>
        );
      }
      return <p>{children}</p>;
    },
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const atom = atomDark as any;
      return !inline && match ? (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, '')}
          style={atom}
          language={match[1]}
          PreTag='div'
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <article className={classes.content}>
      <PostHeader image={imagePath} title={title} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
