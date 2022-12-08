import Image from 'next/image';

import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={'/images/site/me.png'}
          alt='An image showing Grimberg'
          width={297}
          height={297}
        />
      </div>
      <h1>Hi, I'm Grimberg</h1>
      <p>I blog about front-end frameworks.</p>
    </section>
  );
};

export default Hero;
