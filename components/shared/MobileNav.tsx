import Image from 'next/image';
import Link from 'next/link';

const MobileNav = () => {
  return (
    <header className="">
      <Link href={'/'} className="flex items-center gap-2 md:py-2">
        <Image src={'/images/logo.png'} alt="Logo" width={30} height={30} />
      </Link>
    </header>
  );
};

export default MobileNav;
