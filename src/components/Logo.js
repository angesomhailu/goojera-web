import Image from 'next/image';

const Logo = ({ style }) => {
  return (
    <Image
      src="/gologo.png"
      alt="Goojera"
      width={100}
      height={50}
      className={style}
      priority
    />
  );
};

export default Logo;