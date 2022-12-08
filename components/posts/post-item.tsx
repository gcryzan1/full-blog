import Image from 'next/image';
import Link from 'next/link';

import classes from './post-item.module.css';
import { Post } from '../../@types/post';

interface Props {
  post: Post;
}

const PostItem = (props: Props) => {
  const { date, excerpt, image, slug, title } = props.post;

  const formattedDated = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.image}>
          <Image src={imagePath} alt={title} sizes='100%' priority fill />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDated}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
